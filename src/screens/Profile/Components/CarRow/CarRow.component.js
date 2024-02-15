import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
//style
import {SvgXml} from 'react-native-svg';
import svgs from '../../../../assets/svgs';
import carRowStyle from './CarRow.style';
import ProfileStyle from '../../Profile.style';
//libraies & components
import PropTypes from 'prop-types';
import {Box, useToast} from 'native-base';
import blueCar from '../../../../assets/icons/blueCar.png';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveCarId,
  setActiveCar,
  setSelectingCar,
} from '../../../../redux/features/cars/carsSlice';
import {BLUE, RED} from '../../../../helpers/style/constants';
import {Alert} from 'react-native';
import {
  useDeleteCarMutation,
  useGetCarsMutation,
} from '../../../../services/cars';
import {t} from 'i18next';

const CarRow = props => {
  const {
    icon,
    handleOnPress,
    item,
    style,
    isSelected,
    isDisabled,
    handleChangeCarModal,
    handleGetCars = () => {},
  } = props;

  const dispatch = useDispatch();
  const {activeCarId} = useSelector(state => state.cars);

  const [getCars] = useGetCarsMutation();
  const [deleteCar] = useDeleteCarMutation();

  const toast = useToast();

  const handleActiveCar = data => {
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

  const handleOnDeletePress = () => {
    console.log({item});
    Alert.alert(
      t('delete_car'),
      `${t(
        'delete_car_confirmation',
      )} ${item.licensePlateNumber.toUpperCase()}`,
      [
        {
          text: t('yes'),
          onPress: () => {
            handleDeleteCarById(item.carId);
          },
        },
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
      await deleteCar({id: carId})
        .then(answer => {
          handleGetCars();
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (err) {
      console.log(err);
    }
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

  return (
    <TouchableOpacity
      style={{
        ...carRowStyle.container,
        borderWidth: 3,
        borderColor: activeCarId === item.carId ? BLUE : 'transparent',
      }}
      onPress={() => {
        dispatch(setActiveCarId({activeCarId: item.carId}));
        handleActiveCar(item);
        dispatch(setSelectingCar(false));
        handleChangeCarModal();
      }}>
      <View style={carRowStyle.carDetails}>
        <SvgXml xml={svgs.car} width={24} height={18} />
        <Text style={carRowStyle.buttonText}>{item.licensePlateNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleOnDeletePress();
        }}
        style={carRowStyle.deleteBtn}>
        <SvgXml xml={svgs.deleteIcon} width={22} height={22} fill={RED} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          right: 18,
          width: 40,
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => handleOnPress()}>
        <SvgXml xml={svgs.edit} width={24} height={18} />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
};

CarRow.propTypes = {
  icon: PropTypes.element,
  handleOnPress: PropTypes.func,
  carPlate: PropTypes.string,
  style: PropTypes.object,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default CarRow;
