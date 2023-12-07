import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
//style
import style from '../style';
import {BLUE, RED} from '../../../helpers/style/constants';
//components
import CountdownTimer from '../../../components/CountdownTimer/CountdownTimer';
//libraries
import {useNavigation, useIsFocused} from '@react-navigation/native';
import PropTypes from 'prop-types';
import moment from 'moment';
import {ScrollView} from 'native-base';
import {t} from 'i18next';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  parkingsState,
  setIsMiniPark,
  setParkingDetails,
  setIsParkingSelected,
  setWorksWithHub,
  setReservationDetails,
} from '../../../redux/features/parkings/parkingsSlice';
import {
  useGetMiniParkDetailsMutation,
  useGetParkingProductsMutation,
  useGetParkingDetailsMutation,
  useGetCurrentReservationsMutation,
} from '../../../services/parkings';

const Reservation = props => {
  const {activeTab = '', setIsLoading = () => {}, isLoading = false} = props;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {cars, activeCar} = useSelector(state => state.cars);
  const {currentReservations, parkingDetails} = useSelector(
    state => state.parkings.parkingsState,
  );
  const parkingsData = useSelector(parkingsState);

  const [getMiniParkDetails] = useGetMiniParkDetailsMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();
  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const [list, setList] = useState({
    prakings: [],
    sensors: [],
  });

  const handleGetReservations = async () => {
    await getCurrentReservations()
      .then(answer => {
        handleList(answer.data);
      })
      .catch(err => {
        console.log('Error getCurrentReservations: ', err);
      });
  };

  const handleReservationDetails = item => {
    const body = {
      reservationId: item.parkingReservationId,
      start: item.startTime,
      end: item.endTime,
      car: item.plateNumber,
    };
    dispatch(setReservationDetails(body));
  };

  const handleParkingDetails = async item => {
    const id = item.item.parkingId;
    setIsLoading(true);
    handleReservationDetails(item.item);
    const {data, error: apiError} = await getParkingDetails({id: id});

    if (data.externalParkingId != null) {
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
        parkingLongitude: item.item.parkingLatitude,
        parkingLatitude: item.item.parkingLatitude,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroups,
        externalParkingId: data?.externalParkingId,
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(setIsParkingSelected({isParkingSelected: true, parkingId: id}));
      handleGetParkingProducts(id);
    } else {
      console.log('ERR getParkingDetails apiError >>> ', apiError);
    }
  };

  const handleCancelReservation = data => {};

  const handleGetParkingProducts = async parkingId => {
    await getParkingProducts({parkingId}).then(() => {
      handleExtend();
    });
  };

  const handleExtend = () => {
    setIsLoading(false);
    // if (parkingsData.worksWithHub) {
    //   navigation.navigate("QrScanner");
    // } else if (parkingsData.isMiniPark) {
    //   handleMiniparkCheck();
    // } else {
    navigation.navigate('ParkFromScreen');
    // }
  };

  // const handleMiniparkCheck = async () => {
  //   const body = {
  //     plateId: activeCar?.licensePlateNumber,
  //     externalParkingId: parkingDetails?.externalParkingId,
  //   };

  //   await getMiniParkDetails({
  //     plateId: body?.plateId,
  //     externalParkingId: body?.externalParkingId,
  //   })
  //     .then(answer => {
  //       const endTime = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
  //       const body = {
  //         minutes: answer?.data?.minutes,
  //         // totalAmounts: (data.time / 60) * parkingsData.parkingDetails.pricePerHour,
  //         totalAmounts: answer?.data?.amount,
  //         startTime: new Date(answer?.data?.entry_time).toISOString(),
  //         endTime: new Date(endTime).toISOString(),
  //         parkingId: parkingsData.parkingForm.parkingId,
  //         currencyType: 'RON',
  //         productId: answer?.data?.productId,
  //       };
  //       if (answer?.error?.data?.message === 'MINIPARK_NOT_IN_PARK') {
  //         setMiniparkDisclaimer(true);
  //       } else {
  //         setIsLoading(false);
  //         dispatch(setParkingForm(body));
  //         navigation.navigate('PaymentDetails');
  //       }
  //     })
  //     .catch(err => {
  //       console.log('err minipark >>> ', err);
  //     });
  // };

  const handleList = data => {
    const sensorTrueArray = data.filter(
      reservation => reservation.isSensor === true,
    );

    const sensorFalseArray = data.filter(
      reservation => reservation.isSensor === false,
    );
    setList({
      sensors: sensorTrueArray,
      prakings: sensorFalseArray,
    });
  };

  const handleRemoveEntry = (endTime, id) => {
    const now = Date.parse(new Date());
    const end = Date.parse(endTime);
    if (end <= now) {
      let arr = list;

      arr = list?.filter(item => item.parkingReservationId !== id);

      setList(arr);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handleGetReservations();
    }
  }, [isFocused]);

  const ReservationItem = (item, isSensor) => {
    return (
      <View
        style={style.reservationItem}
        key={`${item?.item?.endTime}--${item?.item?.parkingReservationId}`}>
        <View style={style.detailsWrapper}>
          <View style={style.reservationDetails}>
            <Text style={style.reservationName}>{item?.item?.plateNumber}</Text>
            <Text style={style.reservationAddress}>
              {item?.item?.parkingShortTitle}
            </Text>
            <Text style={style.expLabel}>
              {t('expires_on')}:{' '}
              <Text style={style.expTime}>
                {moment(item?.item?.endTime).format('HH:mm - DD.MM.YYYY')}
              </Text>
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            ...style.extendBtn,
            backgroundColor: item?.item?.isSensor ? RED : BLUE,
          }}
          onPress={() => {
            if (item?.item?.isSensor) {
              handleCancelReservation(item);
            } else {
              handleParkingDetails(item);
            }
          }}>
          <Text style={style.extendLabel}>
            {item?.item?.isSensor
              ? t('cancel').toUpperCase()
              : t('extend').toUpperCase()}
          </Text>
          {!item?.item?.isSensor && (
            <Text style={style.extendLabel}>{t('time').toUpperCase()}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{height: '100%'}}>
      <View style={style.reservationsContainer}>
        <View>
          <View>
            <Text style={style.listLabel}>
              {t('parking')}{' '}
              {/* {`(${
                list?.prakings.filter(
                  reservation => new Date() < new Date(reservation?.endTime),
                ).length
              })`} */}
              {/* TODO: add filtering */}
              {`(${list?.prakings.length})`}
            </Text>
            {list?.prakings?.map(item => {
              // TODO: add verify for date
              // if (new Date() < new Date(item?.endTime)) {
              return (
                <ReservationItem
                  item={item}
                  isSensor={false}
                  key={`${item?.endTime}--${item?.parkingReservationId}`}
                />
              );
              // }
            })}
          </View>
          <View style={{marginVertical: 24}}>
            <Text style={style.listLabel}>
              {t('sensor_reservations')}{' '}
              {`(${
                list?.sensors.filter(
                  reservation => new Date() < new Date(reservation?.endTime),
                ).length
              })`}
            </Text>
            {list?.sensors?.map(item => {
              if (new Date() < new Date(item?.endTime)) {
                return (
                  <ReservationItem
                    item={item}
                    isSensor={true}
                    key={`${item?.endTime}--${item?.parkingReservationId}`}
                  />
                );
              }
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
Reservation.propTypes = {
  activeTab: PropTypes.string,
  setIsLoading: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Reservation;
