import React, {useRef} from 'react';
import {Text, View} from 'react-native';
//style && assets
//libraries
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-notifications';
import style from './style';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {WHITE} from '../../helpers/style/constants';
import {
  setGroupId,
  setIsParkingSelected,
  setParkingDetails,
  setWorksWithHub,
} from '../../redux/features/parkings/parkingsSlice';
import {
  useGetCurrentReservationsMutation,
  useGetParkingDetailsMutation,
  useGetParkingProductsMutation,
} from '../../services/parkings';
import ButtonComponent from '../ButtonComponent';
import {useTranslation} from 'react-i18next';

const NotificationPopup = props => {
  const {setIsVisible = () => {}} = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {modalTitle, modalBody, sentTime, messageId, parkingId, type} =
    useSelector(state => state.notification);
  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const toastRef = useRef();

  const handleExtend = () => {
    setIsVisible(false);
    // dispatch(
    //   setCurrentReservation({
    //     startTime: null,
    //     endTime: null,
    //     parkingReservationId: null,
    //   })
    // );
    handleGetParkingProducts(parkingId);
    navigation.navigate('ParkFromScreen');

    // handleParkingDetails(parkingId);
  };

  const handleGetReservations = async () => {
    await getCurrentReservations();
  };

  const handleParkingDetails = async (id, lat, lng) => {
    const {data, error: apiError} = await getParkingDetails({id: id});

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
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(setIsParkingSelected({isParkingSelected: true, parkingId: id}));
      dispatch(setGroupId(parkingGroup));
    } else {
      console.log('getParkingDetails apiError: ', apiError);
    }
  };

  const handleGetParkingProducts = async parkingId => {
    await getParkingProducts({parkingId});
  };

  const handleOk = () => {
    handleGetReservations();
    setIsVisible(false);
  };

  return (
    <>
      <View style={style.container}>
        {type === 'YOU_JUST_PARKED' && (
          <Text style={style.title}>{t('YOU_JUST_PARKED')}</Text>
        )}
        {type === 'YOU_JUST_EXTEND_CURRENT_PARKING' && (
          <Text style={style.title}>
            {t('YOU_JUST_EXTEND_CURRENT_PARKING')}
          </Text>
        )}
        {type === 'YOUR_RESERVATION_EXPIRED' && (
          <Text style={style.title}>{t('YOUR_RESERVATION_EXPIRED')}</Text>
        )}
        {type === 'YOUR_RESERVATION_EXPIRED' && (
          <Text style={style.content}>
            {t('YOUR_RESERVATION_EXPIRED_BODY')}
          </Text>
        )}
        {type === 'YOU_JUST_PARKED' ||
          (type === 'YOU_JUST_EXTEND_CURRENT_PARKING' && (
            <Text style={style.content}>
              {t('THANK_YOU_FOR_USING_OUR_APP')}
            </Text>
          ))}

        {type === 'YOUR_RESERVATION_WILL_EXPIRE' && (
          <Text style={style.title}>{t('YOUR_RESERVATION_WILL_EXPIRE')}</Text>
        )}

        <ButtonComponent
          onPress={() => handleOk()}
          text={'OK'}
          isDisabled={false}
          labelColor="black"
          color={WHITE}
        />

        {type === 'YOUR_RESERVATION_EXPIRED' ||
          (type === 'YOUR_RESERVATION_WILL_EXPIRE' && (
            <ButtonComponent
              onPress={handleExtend}
              text={'Extend'}
              isDisabled={false}
              labelColor="black"
              color={WHITE}
            />
          ))}
      </View>
      <Toast
        ref={toastRef}
        style={{
          zIndex: 3,
          elevation: 3,
        }}
      />
    </>
  );
};

NotificationPopup.prototype = {
  setIsVisible: PropTypes.func,
};

export default NotificationPopup;
