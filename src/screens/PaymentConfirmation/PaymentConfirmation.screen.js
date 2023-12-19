import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, View} from 'react-native';
import ConfirmedIcon from '../../assets/icons/ConfirmedIcon.png';
import RejectedIcon from '../../assets/icons/RejectedIcon.png';
import PaymentConfirmationStyle from './PaymentConfirmation.style';
import {ButtonComponent} from '../../components';

const PaymentConfirmation = ({route, navigation}) => {
  const {t} = useTranslation();
  const type = route.params?.type;

  const handlePressOk = () => {
    // if (type === 'EXTEND') {
    //   navigation.navigate('SetYourParkPin');
    // } else {
    //   navigation.navigate('HomeDrawer');
    // }

    // TODO: before update check back
    // if (type !== 'CONFIRMED' || type !== 'EXTEND') {
    //   navigation.goBack(-2);
    // } else {
    //   navigation.navigate('HomeDrawer');
    // }

    navigation.navigate('HomeDrawer');
  };

  return (
    <View style={PaymentConfirmationStyle.container}>
      <View style={PaymentConfirmationStyle.textContainer}>
        <Image
          source={
            type === 'CONFIRMED' || type === 'EXTEND'
              ? ConfirmedIcon
              : RejectedIcon
          }
          style={PaymentConfirmationStyle.icon}
        />
        <Text style={PaymentConfirmationStyle.title}>
          {type === 'CONFIRMED' || type === 'EXTEND'
            ? t('payment_confirmed_title')
            : t('payment_rejected_title')}
        </Text>
        <Text style={PaymentConfirmationStyle.content}>
          {type === 'CONFIRMED' || type === 'EXTEND'
            ? t('payment_confirmed_content')
            : t('payment_rejected_content')}
        </Text>
      </View>
      <View style={PaymentConfirmationStyle.buttonContainer}>
        <ButtonComponent text={'OK'} onPress={handlePressOk} />
      </View>
    </View>
  );
};

export default PaymentConfirmation;
