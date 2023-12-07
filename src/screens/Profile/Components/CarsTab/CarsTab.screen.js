import React, {useEffect, useRef, useState} from 'react';
import {Alert, View} from 'react-native';
//style
import ProfileStyle from '../../Profile.style';

import {Box, Text} from 'native-base';
//components
import {
  Modal,
  NativeBaseBackButton,
  Toast as ToastComponent,
} from '../../../../components';
import ButtonComponent from '../../../../components/ButtonComponent/ButtonComponent';
import {CarRow} from '../index';
import CarDetails from '../CarDetails';
//libraires
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import PropTypes from 'prop-types';
import Toast from 'react-native-toast-notifications';
import {setActiveCar} from '../../../../redux/features/cars/carsSlice';
import {useToast} from 'native-base';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  useGetCarsMutation,
  useDeleteCarMutation,
} from '../../../../services/cars';

const CarsTab = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {cars, activeCarId, activeCar} = useSelector(state => state.cars);
  const toast = useToast();

  const {
    inModal = false,
    handleAddCar = () => {},
    step = 1,
    setStep = () => {},
  } = props;

  const [getCars] = useGetCarsMutation();
  const [deleteCar] = useDeleteCarMutation();
  const [carDetailsModalVisible, setCarDetailsModalVisible] = useState(false);
  const [activeCarItem, setActiveCarItem] = useState({
    licensePlateNumber: null,
    rcaExpirationDate: null,
    itpExpirationDate: null,
    rovinietaExpirationDate: null,
    cascoExpirationDate: null,
    medicalKitExpirationDate: null,
    fireExtinguisherExpirationDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const toastRef = useRef();

  const handleGetCars = async () => {
    try {
      setIsLoading(true);
      await getCars()
        .then(answer => {
          if (answer?.userCars?.length < 1) {
            dispatch(setActiveCar(null));
          }

          if (answer?.userCars > 0 && activeCar === null) {
            dispatch(setActiveCar(answer?.userCars[0]));
          }
          setIsLoading(false);
        })
        .catch(err => {
          console.log('Get cars error: ', err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnDeletePress = ({carId, licensePlateNumber}) => {
    Alert.alert(
      t('delete_car'),
      `${t('delete_car_confirmation')} ${licensePlateNumber.toUpperCase()}`,
      [
        {text: t('yes'), onPress: () => handleDeleteCarById(carId)},
        {
          text: t('no'),
          onPress: () => {
            // console.log("NO Pressed");
          },
        },
      ],
    );
  };

  const handleDeleteCarById = async carId => {
    try {
      if (cars.length > 1) {
        await deleteCar({id: carId})
          .then(answer => {
            setCarDetailsModalVisible(false);
            handleGetCars();
            dispatch(setActiveCar(cars[0]));
          })
          .catch(err => {
            console.log('err', err);
          });
      } else {
        setCarDetailsModalVisible(false);
        handleToast(t('delete_restriction'));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);

  const handleNavigateToAddCar = () => {
    if (inModal && step === 1) {
      // setAddCarModal(false);
      setStep(2);
    } else {
      navigation.navigate('AddCar');
    }
  };

  const handleChangeCarModal = () => {
    if (inModal) {
      handleAddCar();
    }
  };

  const handleUpdate = () => {
    setCarDetailsModalVisible();
    handleGetCars();
  };

  const handleToast = message => {
    toast.show({
      placement: 'top',
      duration: 1500,
      render: () => {
        return <ToastComponent message={message} type={'danger'} />;
      },
    });
  };

  if (isLoading) {
    return (
      <Box style={ProfileStyle.screenContainer}>
        <Text
          style={{fontSize: 14, fontFamily: 'AzoSans-Bold', color: 'black'}}>
          {t('loading')} ...
        </Text>
      </Box>
    );
  }

  return (
    <View
      style={{
        width: '100%',
        height: '65%',
      }}>
      {inModal && (
        <View style={{margin: 30}}>
          <NativeBaseBackButton
            handleOnPress={handleAddCar}
            style={ProfileStyle.exitButton}
            iconType={'exit'}
          />
        </View>
      )}
      <View style={ProfileStyle.screenContainer}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            // paddingHorizontal: "7%",
            paddingTop: 0,
          }}>
          {cars?.map((item, index) => {
            return (
              <CarRow
                key={`car-${index}--${item.carId}`}
                handleOnPress={() => {
                  setCarDetailsModalVisible(true);
                  setActiveCarItem(item);
                  handleChangeCarModal();
                }}
                handleChangeCarModal={handleChangeCarModal}
                style={ProfileStyle.carEntry}
                item={item}
                isSelected={activeCarId === item.carId}
                // marginBottom={5}
              />
            );
          })}
        </View>
      </View>
      <View style={ProfileStyle.addCarBtnBox}>
        <ButtonComponent
          text={t('add_a_new_car')}
          isDisabled={false}
          onPress={handleNavigateToAddCar}
        />
      </View>

      <Modal isFullScreen={true} modalVisible={carDetailsModalVisible}>
        <CarDetails
          item={activeCarItem}
          onClosePress={() => setCarDetailsModalVisible(false)}
          onConfirmPress={() => setCarDetailsModalVisible(false)}
          onDeletePress={handleOnDeletePress}
          onConfirm={handleUpdate}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>
    </View>
  );
};

CarsTab.propTypes = {
  inModal: PropTypes.bool,
  handleAddCar: PropTypes.func,
  setStep: PropTypes.func,
  step: PropTypes.number,
};

export default CarsTab;
