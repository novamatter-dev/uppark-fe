import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, Platform} from 'react-native';
import {BLACK, BLUE, WHITE} from '../../helpers/style/constants';
//style && assets
import style from './style';
//components
import Tabs from './Components/Tabs';
import Reservation from './Components/Reservation';
import {ButtonComponent, NativeBaseBackButton, Header} from '../../components';
//libraries
import {useNavigation} from '@react-navigation/native';
//redux
import {useGetCurrentReservationsMutation} from '../../redux/features/parkings';
import {useSelector, useDispatch} from 'react-redux';
import {t} from 'i18next';
import {ScrollView} from 'native-base';

const ReservationsList = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('parkings');

  const {language} = useSelector(state => state.users);
  const [isLoading, setIsLoading] = useState(false);

  const handleNav = () => {
    navigation.navigate('ParkingsList');
  };

  return (
    <View
      style={{
        ...style.container,
      }}>
      <View style={style.headerWrapper}>
        <NativeBaseBackButton
          isLoading={false}
          style={style.backButton}
          handleOnPress={() => navigation.navigate('HomePage')}
        />
      </View>

      <Text style={style.headerTitle}>{t('parking_sessions')}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Reservation
          activeTab={activeTab}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </ScrollView>

      <View style={style.buttonWrapper}>
        <ButtonComponent
          text={t('new_parking').toUpperCase()}
          onPress={handleNav}
          isDisabled={false}
        />
      </View>
      {isLoading && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '120%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color={BLUE} />
        </View>
      )}
    </View>
  );
};

export default ReservationsList;
