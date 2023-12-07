import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
//style
import style from './style';
import svgs from '../../assets/svgs';
//components
import {
  Header,
  ScreenLayout,
  ButtonComponent,
  Title,
  NativeBaseBackButton,
} from '../../components';
//libs
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import PropTypes from 'prop-types';
//redux
import {setActiveCar} from '../../redux/features/cars/carsSlice';
import {useSelector, useDispatch} from 'react-redux';
import {BLACK, BLUE, WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SelectCar = props => {
  const {inModal = false, closeModal = () => {}} = props;
  const navigation = useNavigation();

  const {cars, activeCarId, activeCar} = useSelector(state => state.cars);

  const dispatch = useDispatch();

  const handleSelectCar = data => {
    const body = {
      carId: data.carId,
      licensePlateNumber: data.licensePlateNumber,
      rcaExpirationDate: data.rcaExpirationDate,
      itpExpirationDate: data.itpExpirationDate,
      rovinietaExpirationDate: data.rovinietaExpirationDate,
      cascoExpirationDate: data.cascoExpirationDate,
      medicalKitExpirationDate: data.medicalKitExpirationDate,
      fireExtinguisherExpirationDate: data.fireExtinguisherExpirationDate,
    };
    dispatch(setActiveCar(body));
  };

  const handleNav = () => {
    if (inModal) {
      closeModal();
      navigation.navigate('AddCar');
    } else {
      navigation.navigate('ParkFromScreen');
    }
  };

  return (
    <>
      <View style={style.container}>
        {!inModal && (
          <View style={style.headerWrapper}>
            <NativeBaseBackButton
              isLoading={false}
              style={style.backButton}
              handleOnPress={() => navigation.navigate('HomePage')}
            />
            <Text style={style.headerTitle}>{t('parking_sessions')}</Text>
          </View>
          // <Header
          //   isLoading={false}
          //   title={'Select car'}
          //   navScreen={'ParkingsList'}
          // />
        )}

        {inModal && (
          <>
            <NativeBaseBackButton
              handleOnPress={closeModal}
              // style={ProfileStyle.exitButton}
              style={{backgroundColor: WHITE, alignSelf: 'flex-end'}}
              iconType={'exit'}
            />
            <Title label={t('select_car')} style={style.titleWrapper} />
          </>
        )}

        <View style={style.listContainer}>
          {cars?.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...style.item,
                  borderWidth: 2,
                  borderColor:
                    item.carId === activeCar.carId ? BLUE : 'transparent',
                }}
                key={`car-${index}--${item.carId}`}
                onPress={() => handleSelectCar(item)}>
                <View style={style.iconContainer}>
                  <SvgXml xml={svgs.car} width={hp(2.95)} height={hp(2.95)} />
                </View>
                <Text style={style.itemLabel}>{item.licensePlateNumber}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          position: 'absolute',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: wp(8.2),
          bottom: hp(4.92),
        }}>
        <ButtonComponent
          text={inModal ? t('add_a_new_car') : t('confirm').toUpperCase()}
          onPress={handleNav}
          isDisabled={false}
        />
      </View>
    </>
  );
};

SelectCar.propTypes = {
  inModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default SelectCar;
