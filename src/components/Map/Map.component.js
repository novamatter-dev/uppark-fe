// @ts-nocheck
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BLACK, BLUE, RED, WHITE} from '../../helpers/style/constants';
import svgs from '../../assets/svgs';
import styles from './mapStyle';
//libraries
import {PROVIDER_GOOGLE} from 'react-native-maps';
// TODO: In ConstantaPark this library should be used instead of react-native-map-clustering
// import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// TODO: In UpPark this library should be used instead of react-native-maps
import MapView from 'react-native-map-clustering';
import PropTypes from 'prop-types';
import carPin from '../../assets/icons/pin.png';
import MapViewDirections from 'react-native-maps-directions';
import {SvgXml} from 'react-native-svg';
import {useToast} from 'native-base';
import {t} from 'i18next';
import {Actionsheet} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import * as geolib from 'geolib';

//components
import {CustomPolygon, CustomMarker, Toast} from '../../components';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  parkingsState,
  setIsParkingSelected,
  setReservedPolygon,
  setSelectedSensor,
  setWorksWithHub,
  setParkingDetails,
  setIsMiniPark,
  setUnselectParking,
  setSearchLocation,
  setSensorParking,
  setIsLoading as parkingGroupIsLoading,
} from '../../redux/features/parkings/parkingsSlice';
import {
  useGetSensorsMutation,
  usePostBookSensorMutation,
  useGetParkingProductsMutation,
  useGetParkingDetailsMutation,
  useGetGroupDetailsMutation,
  useNearestMutation,
  useGetCurrentReservationsMutation,
} from '../../services/parkings';
import {useTranslation} from 'react-i18next';
import {customMapStyle} from './customMapStyle';

const Map = props => {
  const {
    isPinDraggable = false,
    location = {
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0,
    },
    polygonGroup = [],
    handleCarLocation = () => {},
    setShowExtend = () => {},
    handleExtendBtn = () => {},
    currentLocation = {},
    handleNearbyParkings = () => {},
    setIsToggled = () => {},
    noParkings = false,
  } = props;

  const navigation = useNavigation();
  const toast = useToast();
  const {t} = useTranslation();

  const polygonRef = useRef();

  const dispatch = useDispatch();
  const parkingsData = useSelector(parkingsState);
  const {selectedSensor, hasSensors, sensors, showCounter} = useSelector(
    state => state.parkings.parkingsState,
  );

  const [getSensors] = useGetSensorsMutation();
  const [postBookSensor] = usePostBookSensorMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();
  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getGroupDetails] = useGetGroupDetailsMutation();
  const [nearestParking] = useNearestMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [showReserver, setShowReserve] = useState(false);
  const [selectedSensorId, setSelectedSensorId] = useState(0);
  const [myLocation, setMyLocation] = useState(null);
  const [isDrag, setIsDrag] = useState(false);
  const [outsideZone, setOutsidezone] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [centerCoords, setCenterCoords] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    dispatch(parkingGroupIsLoading(false));
    // eslint-disable-next-line
  }, [polygonGroup]);

  const handleUnselectParking = () => {
    dispatch(setUnselectParking());
    handleExtendBtn();
    setIsToggled(false);
  };

  const onRegionChange = region => {
    // handleCarLocation(region);
    // debouncedNearby();
    if (!isDrag) {
      setIsDrag(true);
    }
  };

  const handleGetSensors = async () => {
    const body = parkingsData?.nearByParkings?.parkingGroups
      ?.filter(item => item.hasSensors)
      .map(item => item.parkingId);
    await getSensors(body)
      .then(answer => {
        console.log('GET SENSORS ANSW:');
      })
      .catch(err => {
        console.log('getSensors err:', err);
      });
  };

  const handleGetParkingProducts = async parkingId => {
    await getParkingProducts({parkingId})
      .then(() => {})
      .catch(err => {
        console.log('getParkingProducts err ', err);
      });
  };

  const handleBookSensor = async () => {
    const time = new Date();
    const body = {
      parkingLotId: selectedSensor.id,
      duration: 30,
      fromDate: time,
    };

    await postBookSensor(body)
      .then(answer => {
        setModalVisible(false);
        setShowReserve(false);
        handleGetSensors();
        getCurrentReservations();
      })
      .catch(err => {
        console.log('postBookSensor err:', err);
      });
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleReserveSensor = data => {
    // TODO: status in romanian?
    if (data.status === 'Ocupat' || data.status === 'Rezervat') {
      console.log('this parking space is not available! ', data);
    } else {
      dispatch(setSelectedSensor(data));
      openModal();
    }
  };

  const handleParkingDetails = async (id, lat, lng) => {
    dispatch(parkingGroupIsLoading(true));
    const {data, error: apiError} = await getParkingDetails({id: id});

    if (data?.externalParkingId != null) {
      dispatch(setIsMiniPark(true));
    } else {
      dispatch(setIsMiniPark(false));
    }

    if (!apiError) {
      const body = {
        parkingId: id,
        amenities: data?.amenities,
        isOpened: data?.isOpened,
        isAvailable: data?.isAvailable,
        noLots: data?.noLots,
        parkingLongitude: lng,
        parkingLatitude: lat,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroup,
        externalParkingId: data?.externalParkingId,
        ShortNumber: data?.shortNumber,
        Code: data?.code,
      };

      if (data?.hasSensors) {
        handleGetSensors();
      } else {
        const body = {
          sensors: null,
          hasSensors: false,
        };
        dispatch(setSensorParking(body));
      }

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(setIsParkingSelected({isParkingSelected: true, parkingId: id}));
      setShowExtend(false);
      dispatch(parkingGroupIsLoading(false));

      if (data.externalParkingId !== null) {
        // TODO:call api for getting the amount for payment
      }
    } else {
      console.log(
        'map component ERR getParkingDetails apiError >>> ',
        apiError,
      );
      dispatch(parkingGroupIsLoading(false));
    }

    dispatch(parkingGroupIsLoading(false));
  };

  const handleRecenter = () => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.02;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    Geolocation.getCurrentPosition(position => {
      setMyLocation({
        longitude: position?.coords?.longitude,
        latitude: position?.coords?.latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });

      let region = {
        latitude: position?.coords?.latitude,
        longitude: position?.coords?.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      mapRef.current.animateToRegion(region, 1000);
      handleNearbyParkings(region);
    });
  };

  const handleNearestParkings = async (isAutoSearch, isFromCurrentLocation) => {
    const body = {
      latitude: myLocation?.latitude,
      longitude: myLocation?.longitude,
    };
    setIsLoading(true);

    await nearestParking(body)
      .then(answer => {
        if (answer?.data?.errors?.status === 400) {
          toast.show({
            placement: 'top',
            duration: 1500,
            render: () => {
              return (
                <Toast message={t('missing_parking_lots')} type={'danger'} />
              );
            },
          });
        } else {
          handleNearesGroupDetails(answer, isAutoSearch, isFromCurrentLocation);
        }
      })
      .catch(err => {
        console.log('ERR nearestParking >>> ', err);
      });
  };

  const handleNearesGroupDetails = async (
    parkingData,
    isAutoSearch,
    isFromCurrentLocation,
  ) => {
    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.0008;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const {data, error: apiError} = await getGroupDetails({
      groupId: parkingData?.data?.groupId,
      parkingId: parkingData?.data?.parkingId,
    });

    if (isFromCurrentLocation) {
      let region = {
        latitude: data?.entranceLatitude,
        longitude: data?.entranceLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      mapRef.current.animateToRegion(region, 1000);
    }

    if (!apiError) {
      const body = {
        latitude: data.entranceLatitude,
        longitude: data.entranceLongitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };

      setIsLoading(false);

      if (data?.hasSensors) {
        handleGetSensors(parkingData?.data?.parkingId);
      } else {
        const body = {
          sensors: null,
          hasSensors: false,
        };
        dispatch(setSensorParking(body));
      }

      if (isFromCurrentLocation) {
        dispatch(setSearchLocation(body));
      }

      const coords = {
        latitude: data.entranceLatitude,
        longitude: data.entranceLongitude,
      };
      handleNearbyParkings(coords, false);
    } else {
      if (isAutoSearch) {
        dispatch(setUnselectParking());
      }
      setIsLoading(false);

      toast.show({
        placement: 'top',
        duration: 1500,
        render: () => {
          return <Toast message={t('missing_parking_lots')} type={'danger'} />;
        },
      });
      console.log('getGroupDetails apiError: ', apiError);
    }
  };

  const handleSavePolygon = polygon => {
    dispatch(setReservedPolygon(polygon));
  };

  const polygons = [];
  polygonGroup.forEach(element => {
    polygons.push(element.parkings);
  });

  const handleIsInside = center => {
    if (polygons?.length > 0) {
      const isInside = polygons?.some(polygon =>
        geolib.isPointInPolygon(
          {latitude: center?.latitude, longitude: center?.longitude},
          polygon,
        ),
      );

      const polygon = polygons.find(polygon =>
        geolib.isPointInPolygon(
          {latitude: center?.latitude, longitude: center?.longitude},
          polygon,
        ),
      );

      if (isInside) {
        const parking = polygonGroup.find(
          element => element.parkings === polygon,
        );
        handleAutoSelectPolygon(parking);

        setOutsidezone(false);
        setTimeout(() => {
          setOutsidezone(true);
        }, 3000);
      } else {
        setOutsidezone(true);
        handleUnselectParking();
      }

      // setIsLoading(false);
    }
  };

  const handleAutoSelectPolygon = parking => {
    handleParkingDetails(
      parking?.ids,
      parking?.parkings[0].latitude,
      parking?.parkings[0].longitude,
    );
    handleGetParkingProducts(parking?.ids);
    handleSavePolygon(parking);
    setShowExtend(false);
  };

  const autoSearchLocation = data => {
    if (isDrag) {
      const body = {
        latitude: data?.latitude,
        longitude: data?.longitude,
        latitudeDelta: data?.latitudeDelta,
        longitudeDelta: data?.longitudeDelta,
      };
      dispatch(setSearchLocation(body));
    }
    setIsDrag(false);
  };

  useEffect(() => {
    if (centerCoords) {
      handleIsInside(centerCoords);
    }

    // eslint-disable-next-line
  }, [polygonGroup]);

  useEffect(() => {
    handleRecenter();

    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.recenterBtn}>
        <TouchableOpacity onPress={handleRecenter}>
          <SvgXml xml={svgs.aim} width={22} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.findParkingBtn}>
        <TouchableOpacity
          onPress={() => handleNearestParkings(true, true)}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={WHITE} />
          ) : (
            <SvgXml xml={svgs.parkingIcon} width={27} height={27} />
          )}
        </TouchableOpacity>
      </View>
      {!isPinDraggable && (
        <View style={styles.parkPin}>
          <SvgXml xml={svgs.parkPin} width={33} height={48} />
        </View>
      )}
      {!outsideZone &&
        !parkingsData.parkingDetails.isOpened &&
        parkingsData.isParkingSelected && (
          <View style={styles.disclaimerWrapper}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'AzoSans-Medium',
                color: BLACK,
              }}>
              {t('outside_payment_hours')}
            </Text>
          </View>
        )}

      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        region={location}
        customMapStyle={customMapStyle}
        zoomControlEnabled={false}
        showsMyLocationButton={false}
        showsUserLocation
        onPress={handleUnselectParking}
        onRegionChange={onRegionChange}
        onMapReady={() => {}}
        onRegionChangeComplete={data => {
          handleIsInside(data);
          setCenterCoords(data);
        }}
        clusteringEnabled={true}
        clusterColor={'green'}
        spiralEnabled={false}
        minZoom={15}
        minPoints={4}>
        {hasSensors &&
          sensors?.map(item => {
            return (
              <CustomMarker
                key={item.id}
                isSensor={true}
                sensorStatus={item?.status}
                handleClick={() => {
                  handleReserveSensor(item);
                  handleParkingDetails(
                    item.parkingId,
                    item.latitude,
                    item.longitude,
                  );
                  handleGetParkingProducts(item.parkingId);
                }}
                isDraggable={false}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                sensorInfo={item}
                selectedSensorId={selectedSensorId}
              />
            );
          })}

        {!hasSensors && (
          <>
            {polygonGroup?.map((item, index) => {
              return (
                <CustomPolygon
                  ref={polygonRef}
                  coordinate={item?.parkings}
                  key={`${index}--${index * item.ids}`}
                  parkingId={item?.ids}
                  parkingGroup={item?.groupId}
                  isDraggable={isPinDraggable}
                  setModalVisible={openModal}
                  setShowExtend={setShowExtend}
                />
              );
            })}

            {/* {parkingsData?.carLocation?.latitude && showCounter && ( */}
            {/* <> */}
            {/* <MapViewDirections
                  origin={currentLocation}
                  destination={parkingsData?.carLocation}
                  apikey={apikey}
                  strokeWidth={3}
                  strokeColor="hotpink"
                  onReady={(result) => {
                    mapRef.fitToCoordinates(result?.coordinates, {
                      edgePadding: {
                        right: width / 20,
                        bottom: height / 20,
                        left: width / 20,
                        top: height / 20,
                      },
                    });
                  }}
                  optimizeWaypoints={false}
                  timePrecision={"now"}
                  onError={(errorMessage) => {
                    console.log("GOT AN ERROR", errorMessage);
                  }}
                /> */}
            {/* {parkingsData.reservedPolygon.length > 0 && (
                  <CustomPolygon
                    coordinate={parkingsData?.reservedPolygon}
                    // key={`${index}--${index * item.ids}`}
                    isDraggable={isPinDraggable}
                    isPinClickDisabled={
                      parkingsData?.carLocation?.latitude &&
                      currentLocation !== null
                    }
                    setModalVisible={openModal}
                  />
                )} */}
            {/* </>
            )} */}
          </>
        )}
      </MapView>
      {isPinDraggable && (
        <View style={styles.carpinContainer}>
          <Image source={carPin} style={styles.carpin} />
        </View>
      )}

      <Actionsheet
        isOpen={modalVisible}
        style={{height: '45%', position: 'absolute', bottom: 0}}
        transparent={true}>
        {!showReserver && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {t('parking_sensor_selected')}
            </Text>

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.btnCancelLabel}>{t('cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('ParkFromScreen');
                }}>
                <Text style={styles.btnLabel}>{t('pay')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  // setModalVisible(false);
                  setShowReserve(true);
                }}>
                <Text style={styles.btnLabel}>
                  {t('reserve').toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {showReserver && (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {t('reserve_for_30_minutes')} ?
            </Text>

            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setShowReserve(false);
                }}>
                <Text style={styles.btnCancelLabel}>{t('no')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalBtn}
                onPress={handleBookSensor}>
                <Text style={styles.btnLabel}>{t('yes')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Actionsheet>
    </View>
  );
};

Map.propTypes = {
  isPinDraggable: PropTypes.bool,
  parkingGroups: PropTypes.array,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  handleCarLocation: PropTypes.func,
  setShowExtend: PropTypes.func,
  handleExtendBtn: PropTypes.func,
  handleNearbyParkings: PropTypes.func,
  setIsToggled: PropTypes.func,
  noParkings: PropTypes.bool,
};

export default Map;
