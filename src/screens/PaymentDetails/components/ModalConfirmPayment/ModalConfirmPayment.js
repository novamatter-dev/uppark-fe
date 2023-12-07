import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
//style & assets
import style from './style';
//components
import {Modal} from '../../../../components';
//redux
import {useSelector} from 'react-redux';
import {parkingsState} from '../../../../redux/features/parkings/parkingsSlice';
import {RED} from '../../../../helpers/style/constants';
import {t} from 'i18next';

const ModalConfirmPayment = props => {
  const {isVisible, closeModal, handleYesButton, profileType, selectedCard} =
    props;
  const parkingsData = useSelector(parkingsState);
  const {activeCar} = useSelector(state => state.cars);

  return (
    <Modal
      modalVisible={isVisible}
      isFullScreen={false}
      isForNotification={true}>
      <View style={style.container}>
        <Text style={style.title}>{t('confirm_payment')}</Text>

        <View style={style.bodyContainer}>
          <View style={style.item}>
            <Text style={style.body}>{t('duration')}:</Text>
            <Text style={style.body}>
              {parkingsData.parkingForm.minutes < 60
                ? `${parkingsData.parkingForm.minutes} min`
                : `${Math.floor(parkingsData.parkingForm.minutes / 60)} H`}
            </Text>
          </View>

          <View style={style.item}>
            <Text style={style.body}>{t('price')}:</Text>
            <Text style={style.body}>
              {parkingsData.parkingForm.totalAmounts}{' '}
              {parkingsData.parkingDetails.currencyType}
            </Text>
          </View>

          <View style={style.item}>
            <Text style={style.body}>{t('vehicle')}:</Text>
            <Text style={style.body}>{activeCar?.licensePlateNumber}</Text>
          </View>

          <View style={style.item}>
            <Text style={style.body}>{t('address')}:</Text>
            <Text style={style.body}>
              {parkingsData?.parkingDetails?.parkingShortTitle}
            </Text>
          </View>

          {parkingsData.parkingDetails.currencyType === 'RON' && (
            <View style={style.item}>
              <Text style={style.body}>{t('selected_card')}:</Text>
              <Text style={style.body}>{selectedCard}</Text>
            </View>
          )}

          <View style={style.item}>
            <Text style={style.body}>{t('profile_type')}:</Text>
            <Text style={style.body}>{profileType}</Text>
          </View>
        </View>

        <View style={style.btnContainer}>
          <TouchableOpacity onPress={closeModal} style={style.cancelBtn}>
            <Text style={{...style.btnlabel, color: RED}}>{t('cancel')}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleYesButton} style={style.btn}>
            <Text style={style.btnlabel}>{t('pay')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfirmPayment;
