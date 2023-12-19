import React from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
//style
import {SvgXml} from 'react-native-svg';
import svgs from '../../../../assets/svgs';
import carRowStyle from './CarRow.style';
import ProfileStyle from '../../Profile.style';
//libraies & components
import PropTypes from 'prop-types';
import {Box} from 'native-base';
import blueCar from '../../../../assets/icons/blueCar.png';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setActiveCarId,
  setActiveCar,
  setSelectingCar,
} from '../../../../redux/features/cars/carsSlice';
import {BLUE} from '../../../../helpers/style/constants';

const CarRow = props => {
  const {
    icon,
    handleOnPress,
    item,
    style,
    isSelected,
    isDisabled,
    handleChangeCarModal,
  } = props;

  const dispatch = useDispatch();
  const {activeCarId} = useSelector(state => state.cars);

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
