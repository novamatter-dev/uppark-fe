// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {Text, View, Platform, Modal} from 'react-native';
import {Polygon, Callout} from 'react-native-maps';
import {CustomMarker} from '../../components';
import PropTypes from 'prop-types';
//redux
import {
  useGetParkingDetailsMutation,
  useGetParkingProductsMutation,
} from '../../services/parkings';
import {
  setParkingDetails,
  setIsParkingSelected,
  setReservedPolygon,
  setWorksWithHub,
  setGroupId,
  setSelectedSensor,
  setIsMiniPark,
  setSelectedPolygonDetails,
} from '../../redux/features/parkings/parkingsSlice';
import {useDispatch, useSelector} from 'react-redux';
import usePrevious from '../../hooks/usePrevious.hook';

const CustomPolygon = React.forwardRef((props, ref) => {
  const {
    coordinate = [],
    parkingId = 0,
    isDraggable = false,
    isPinClickDisabled = false,
    parkingGroup = 0,
    setModalVisible = () => {},
    setShowExtend = () => {},
  } = props;

  const dispatch = useDispatch();
  const {showCounter} = useSelector(state => state.parkings.parkingsState);

  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();

  const [center, setCenter] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [colors, setColors] = useState({
    fillColor: Platform.OS === 'ios' ? null : 'rgba(235, 235, 235)',
    strokeColor: Platform.OS === 'ios' ? null : 'rgba(235, 235, 235)',
  });

  const getPolygonCenter = () => {
    let x = coordinate?.map(c => c.latitude);
    let y = coordinate?.map(c => c.longitude);

    let minX = Math.min.apply(null, x);
    let maxX = Math.max.apply(null, x);

    let minY = Math.min.apply(null, y);
    let maxY = Math.max.apply(null, y);

    setCenter(data => ({
      ...data,
      latitude: (minX + maxX) / 2,
      longitude: (minY + maxY) / 2,
    }));
  };

  const handleParkingDetails = async (id, lat, lng) => {
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
        noLots: data?.noLots,
        parkingLongitude: lng,
        parkingLatitude: lat,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroups,
        externalParkingId: data?.externalParkingId,
        ShortNumber: data?.shortNumber,
        Code: data?.code,
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(setIsParkingSelected({isParkingSelected: true, parkingId: id}));
      setShowExtend(false);
      dispatch(setGroupId(parkingGroup));
    } else {
      console.log('ERR getParkingDetails apiError >>> ', apiError);
    }
  };

  const handleGetParkingProducts = async parkingId => {
    await getParkingProducts({parkingId}).then(answer => {});
  };

  const handleSavePolygon = polygon => {
    dispatch(setReservedPolygon(polygon));
  };

  useEffect(() => {
    getPolygonCenter();
    setTimeout(() => {
      setColors(state => ({
        ...state,
        fillColor:
          Platform.OS === 'ios'
            ? 'rgba(235, 235, 235)'
            : 'rgba(132,153,255, 0.6)',
        strokeColor:
          Platform.OS === 'ios'
            ? 'rgba(235, 235, 235)'
            : 'rgba(132,153,255, 0.6)',
      }));
    }, 10);
  }, []);

  return (
    <View>
      {coordinate.length > 0 && (
        <Polygon
          coordinates={coordinate}
          strokeColor={colors.strokeColor}
          fillColor={colors.fillColor}
          strokeWidth={2}
          tappable={true}
          onPress={() => {
            // if (!isPinClickDisabled) {
            if (!showCounter) {
              handleParkingDetails(
                parkingId,
                center?.latitude,
                center?.longitude,
              );
              handleGetParkingProducts(parkingId);
              handleSavePolygon(coordinate);
            } else {
              return;
            }
            // }
          }}
        />
      )}
      {/* {!isDraggable && (
        <CustomMarker
          handleClick={() => {
            // if (!isPinClickDisabled) {
            //   handleParkingDetails(
            //     parkingId,
            //     center.latitude,
            //     center.longitude
            //   );
            //   handleGetParkingProducts(parkingId);
            //   handleSavePolygon(coordinate);
            // }
          }}
          isDraggable={isDraggable}
          coordinate={{
            latitude: center?.latitude,
            longitude: center?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      )} */}
    </View>
  );
});

CustomPolygon.prototype = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  parkingId: PropTypes.number,
  isDraggable: PropTypes.bool,
  setSelectedSensor: PropTypes.func,
  setModalVisible: PropTypes.func,
  setShowExtend: PropTypes.func,
};

export default CustomPolygon;
