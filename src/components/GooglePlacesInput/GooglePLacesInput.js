// @ts-nocheck
import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
//style
import SearchStyle from './SearchStyle.style';
import HomeStyle from '../../screens/Home/Home.style';
import svgs from '../../assets/svgs';
//libraries
import {SvgXml} from 'react-native-svg';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import PropTypes from 'prop-types';
import {useToast} from 'native-base';
import {useTranslation} from 'react-i18next';
//redux
import {
  setSearchLocation,
  setSensorParking,
  setUnselectParking,
  setIsLoading,
  parkingsState,
} from '../../redux/features/parkings/parkingsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {
  useNearestMutation,
  useGetGroupDetailsMutation,
  useGetSensorsMutation,
} from '../../services/parkings';
import Toast from '../Toast';
import {GREY} from '../../helpers/style/constants';

let arr = [];
const GooglePlacesInput = props => {
  const {
    onPlaceSelected = () => {},
    closeSearch = () => {},
    handleNearbyParkings = () => {},
    searchIsActive = true,
  } = props;
  const toast = useToast();
  const {t} = useTranslation();

  const [nearestParking] = useNearestMutation();
  const [getGroupDetails] = useGetGroupDetailsMutation();
  const [getSensors] = useGetSensorsMutation();

  const parkingsData = useSelector(parkingsState);

  const dispatch = useDispatch();

  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const autocompleteRef = useRef();

  const handleClearText = () => {
    autocompleteRef.current?.clear();
    autocompleteRef.current?.setAddressText('');
    setIsResultsVisible(false);
  };

  const handleSearchLocationDispatch = data => {
    dispatch(setIsLoading(true));
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0008;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const body = {
      latitude: data.geometry.location.lat,
      longitude: data.geometry.location.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    dispatch(setSearchLocation(body));
    handleNearestParkings(data);
  };

  const handleNearestParkings = async coords => {
    const body = {
      longitude: coords.geometry.location.lng,
      latitude: coords.geometry.location.lat,
    };

    await nearestParking(body)
      .then(answer => {
        handleNearesGroupDetails(answer);
      })
      .catch(err => {
        console.log('ERR nearestParking >>> ', err);
        dispatch(setIsLoading(false));
      });
  };

  const handleNearesGroupDetails = async parkingData => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0008;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const {data, error: apiError} = await getGroupDetails({
      groupId: parkingData?.data?.groupId,
      parkingId: parkingData?.data?.parkingId,
    });

    if (!apiError) {
      const body = {
        latitude: data.entranceLatitude,
        longitude: data.entranceLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      if (data?.hasSensors) {
        handleGetSensors(parkingData?.data?.parkingId);
      } else {
        const body = {
          sensors: null,
          hasSensors: false,
        };
        dispatch(setSensorParking(body));
      }

      const coords = {
        latitude: data.entranceLatitude,
        longitude: data.entranceLongitude,
      };
      handleNearbyParkings(coords, false);
    } else {
      dispatch(setUnselectParking());

      toast.show({
        placement: 'top',
        duration: 1500,
        render: () => {
          return <Toast message={t('missing_parking_lots')} type={'danger'} />;
        },
      });
      dispatch(setIsLoading(false));
    }
  };

  // get parking sensors
  // const handleGetSensors = async id => {
  //   await getSensors({parkingId: id})
  //     .then(answer => {
  //       console.log('getSensors:', answer.data);
  //     })
  //     .catch(err => {
  //       console.log('ERR getSensors >>> ', err);
  //       dispatch(setIsLoading(false));
  //     });
  // };

  const handleGetSensors = async () => {
    const body = parkingsData?.nearByParkings?.parkingGroups
      ?.filter(item => item.hasSensors)
      .map(item => item.parkingId);
    await getSensors(body);
  };

  const handleCloseSearch = () => {
    closeSearch();
    setIsResultsVisible(false);
  };

  return (
    <GooglePlacesAutocomplete
      ref={autocompleteRef}
      minLength={2}
      isRowScrollable={true}
      fetchDetails
      textInputProps={{selection: {start: 1, end: 1}}}
      styles={{
        container: {
          ...SearchStyle.inputContainer,
          borderBottomLeftRadius: !isResultsVisible ? 24 : 0,
          borderBottomRightRadius: !isResultsVisible ? 24 : 0,
        },
        textInput: SearchStyle.textInput,
        listView: SearchStyle.listView,
        row: {
          ...SearchStyle.row,
          borderBottomLeftRadius: !isResultsVisible ? 24 : 0,
          borderBottomRightRadius: !isResultsVisible ? 24 : 0,
        },
        description: SearchStyle.blackText,
        predefinedPlacesDescription: SearchStyle.blackText,
      }}
      enablePoweredByContainer={false}
      placeholder={t('search')}
      onPress={(data, details = null) => {
        handleSearchLocationDispatch(details);
        setIsResultsVisible(false);
      }}
      onFail={error => console.log('Autocomplete error: ', error)}
      onNotFound={() => {
        setIsResultsVisible(false);
      }}
      // listEmptyComponent={() => {
      //   setNoResults(true);
      //   return (
      //     <View
      //       style={{
      //         ...SearchStyle.inputContainer,
      //         borderTopLeftRadius: 0,
      //         borderTopRightRadius: 0,
      //       }}
      //     >
      //       <View
      //         style={{
      //           ...SearchStyle.resultItem,
      //           borderTopLeftRadius: 25,
      //           borderTopRightRadius: 25,
      //         }}
      //       >
      //         <View
      //           style={{
      //             ...SearchStyle.contentBody,
      //             alignItems: "center",
      //             width: "100%",
      //           }}
      //         >
      //           <Text
      //             style={{
      //               ...SearchStyle.resultText,
      //               textAlign: "center",
      //             }}
      //           >
      //             No results were found
      //           </Text>
      //         </View>
      //       </View>
      //     </View>
      //   );
      // }}
      listEmptyComponent={
        <View
          style={{
            ...SearchStyle.emptyInputContainer,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}>
          <View
            style={{
              ...SearchStyle.resultItem,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}>
            <View
              style={{
                ...SearchStyle.contentBody,
                alignItems: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  ...SearchStyle.resultText,
                  textAlign: 'center',
                }}>
                {t('no_results_found')}
              </Text>
            </View>
          </View>
        </View>
      }
      query={{
        // TODO: modify key
        key: 'AIzaSyCJ1K72c13M2V1gqxL3aJ2dUzJxOusgO_8',
        language: 'ro',
        components: 'country:ro',
      }}
      debounce={400}
      textInputProps={{
        autoCorrect: false,
        placeholderTextColor: GREY,
        onChange: val => {
          if (
            val.nativeEvent.text.length === 1 ||
            val.nativeEvent.text.length === 0
          ) {
            setIsResultsVisible(false);
          } else {
            setIsResultsVisible(true);
          }
        },
      }}
      renderRow={(rowData, index) => {
        const title = rowData.structured_formatting.main_text;
        const address = rowData.structured_formatting.secondary_text;
        const description = rowData.description;

        return (
          <View
            style={{
              ...SearchStyle.resultItem,
              borderBottomLeftRadius: index === 0 ? 25 : 0,
              borderBottomRightRadius: index === 0 ? 25 : 0,
            }}>
            <View style={SearchStyle.contentBody}>
              <Text style={SearchStyle.resultText}>{title}</Text>
              <Text style={SearchStyle.regionText}>{description}</Text>
            </View>
          </View>
        );
      }}
      renderRightButton={() => {
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{...HomeStyle.closeSearchIconStyle}}
              onPress={handleClearText}>
              <SvgXml xml={svgs.discardSearch} />
            </TouchableOpacity>
          </View>
        );
      }}
      renderLeftButton={() => {
        return (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={handleCloseSearch}
              style={{...SearchStyle.backIcon}}>
              <SvgXml xml={svgs.arrowLeft} />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

GooglePlacesInput.prototype = {
  onPlaceSelected: PropTypes.func,
  closeSearch: PropTypes.func,
  searchIsActive: PropTypes.bool,
};
export default GooglePlacesInput;
