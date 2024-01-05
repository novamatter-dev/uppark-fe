import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
//style && assets
import style from './style';
//components
import CustomInput from '../CustomInput';
import ButtonComponent from '../ButtonComponent';
import NativeBaseBackButton from '../NativeBaseBackButton';
import Title from '../Title';
import BaseInput from '../BaseInput';
//libraires
import PropTypes from 'prop-types';
import {SvgXml} from 'react-native-svg';
import {t} from 'i18next';

//redux
import {useDispatch} from 'react-redux';
import {useGetCarsMutation, useAddCarMutation} from '../../services/cars';
import svgs from '../../assets/svgs';
import {useTranslation} from 'react-i18next';

const CreateCar = props => {
  const {handleClose = () => {}} = props;
  const {t} = useTranslation();
  const [addCar, {isLoading}] = useAddCarMutation();
  const [getCars, {isLoading: isLoadingGetCars}] = useGetCarsMutation();

  const [data, setData] = useState('');

  const handleChange = val => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(val)) {
      setData(val);
    } else if (val === '') {
      setData(val);
    }
  };

  const handleGetCars = async () => {
    await getCars();
  };

  const handleCreateCar = async () => {
    await addCar({licensePlateNumber: data})
      .then(() => {
        handleGetCars();
        handleClose();
        // setShowCreateCar(false);
      })
      .catch(err => {
        console.log('Add car err: ', err);
      });
  };

  return (
    <View style={style.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={style.body}>
          {/* <NativeBaseBackButton
            iconType={"exit"}
            style={style.closeButton}
            handleOnPress={handleClose}
          /> */}
          <View style={style.titleWrapper}>
            <Title label={t('license_plate_number')} />
          </View>

          <View style={style.inputWrapper}>
            {/* <CustomInput
            placeholder="License plate number"
            onChange={handleChange}
            keyboardType="default"
            leftIcon="car"
            // rightIcon=""
            maxLength={10}
            value={data}
          /> */}

            <BaseInput
              icon={<SvgXml xml={svgs.car} width={22} height={24} />}
              name={'email'}
              placeHolder={t('license_plate_number')}
              keyboardType={'email-address'}
              onChangeText={handleChange}
              value={data}
              maxLength={12}
              capitalize={'characters'}
            />
          </View>
          <View style={style.buttonsWrapper}>
            <ButtonComponent
              text={t('confirm').toUpperCase()}
              onPress={handleCreateCar}
              isDisabled={data.length < 3 ? true : false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

CreateCar.prototype = {
  handleClose: PropTypes.func,
};

export default CreateCar;
