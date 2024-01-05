import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
//style && asets
import AddBusinessStyle from './AddBusiness.style';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import {AQUA} from '../../helpers/style/constants';
//libraries
import {Box, ScrollView, useToast} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';
//components
import BaseInput from '../BaseInput';
import {NativeBaseBackButton, Title, Modal, ButtonComponent} from '../index';

import {PaymentOptions} from '../../screens/PaymentDetails/components';
//redux
import {
  useUpdateBusinessProfileMutation,
  useGetBusinessProfileMutation,
  useGetUserMutation,
  useUpdateUserPhoneNumberMutation,
} from '../../services/users';
import {useDispatch, useSelector} from 'react-redux';
import {setBusinessEntry} from '../../redux/features/users/userSlice';
import {useSetBusinessDefaultPaymentMutation} from '../../services/wallets';
import Toast from 'react-native-toast-notifications';
import {t} from 'i18next';
import LoginPhoneStyle from '../../screens/Login/Components/LoginPhone/LoginPhone.style';
import Dropdown from '../Dropdown/Dropdown';
import {dialCodes} from '../../constants/dialCodes';
import {TextInput} from 'react-native';
import {Platform} from 'react-native';

const AddBusinessModalComponent = props => {
  const {onClosePress, isDisabled, handleGetCards} = props;

  const businessState = useSelector(state => state.users.business);
  const dispatch = useDispatch();

  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [getBusinessProfile] = useGetBusinessProfileMutation();
  const [setBusinessDefaultPayment] = useSetBusinessDefaultPaymentMutation();
  const [getUserDetails] = useGetUserMutation();
  const [updateUserPhoneNumber] = useUpdateUserPhoneNumberMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [prefix, setPrefix] = useState('+40');

  const toastRef = useRef();
  const toast = useToast();

  useEffect(() => {
    // dispatch(resetUserState());
    handleGetBusinessProfile();
    getDetails();
  }, []);

  const getDetails = async () => {
    await getUserDetails().then(answer => {
      console.log('>>> getUserDetails:', answer.data.phoneNumber);
      if (answer.data.phoneNumber) {
        const phoneNumberWithoutPrefix = answer.data.phoneNumber.substring(3);
        setUserPhoneNumber(answer?.data?.phoneNumber);
        handleChangePhoneNumber(phoneNumberWithoutPrefix);
      }
    });
  };

  const handleGetBusinessProfile = async () => {
    await getBusinessProfile();
  };

  const handleChangeFormState = ({type, label, value}) => {
    dispatch(setBusinessEntry({type, label, value}));
  };

  const handleSubmit = async ({closeModal = false}) => {
    const body = {
      companyName: businessState.companyName.value,
      cui: businessState.cui.value,
      email: businessState.email.value,
      address: businessState.address.value,
      city: businessState.city.value,
      county: businessState.county.value,
      registryCom: businessState.registryCom.value,
      iban: businessState.iban.value,
      bankName: businessState.bankName.value,
    };

    await updateBusinessProfile(body)
      .then(() => {
        updateUserPhoneNumber({phoneNumber: `${prefix}${userPhoneNumber}`})
          .then(answer => {
            console.log('>>>UPDATE PHONE NUMBER:', answer);
            handleSuccessToast();
          })
          .catch(err => {
            console.log('>>>UPDATE PHONE NUMBER ERR:', err);
          });

        closeModal && onClosePress();
        handleSuccessToast();
      })
      .catch(err => {
        console.log('ERR updateBusinessProfile >>> ', err);
      });
  };

  const handleChooseDefaultPayment = () => {
    handleGetCards();
    setModalVisible(true);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hadleSetBusinessCard = async id => {
    await handleSubmit({closeModal: false}).then(async () => {
      await setBusinessDefaultPayment({cardId: id})
        .then(answer => {
          // handleModal();
          setModalVisible(false);
          handleGetBusinessProfile();
        })
        .catch(err => {
          console.log('ERR setBusinessDefaultPayment >>>', err);
        });
    });
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 18,
                fontFamily: 'AzoSans-Medium',
              }}>
              {t('business_profile_saved')}
            </Text>
          </View>
        );
      },
    });
  };

  const handleChangePhoneNumber = value => {
    setUserPhoneNumber(value);
    handleChangeFormState({
      type: 'phoneNumber',
      value: prefix + value,
      label: 'Phone Number',
    });
  };

  const isButtonDisabled =
    businessState.companyName.value?.length > 0 &&
    businessState.address.value?.length > 0 &&
    businessState.cui.value?.length > 0 &&
    businessState.email.value?.length > 0 &&
    businessState.city.value?.length > 0 &&
    businessState.county.value?.length > 0 &&
    businessState.registryCom.value?.length > 0 &&
    businessState.iban.value?.length > 0 &&
    businessState.bankName.value?.length > 0 &&
    userPhoneNumber?.length > 0
      ? true
      : false;

  return (
    <View style={AddBusinessStyle.safeAreaContainer}>
      {/* <KeyboardView boxStyle={AddBusinessStyle.container}> */}

      <NativeBaseBackButton
        isLoading={false}
        handleOnPress={onClosePress}
        isDisabled={false}
        style={{backgroundColor: '#F5F5F5'}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AddBusinessStyle.container}>
        <KeyboardAwareScrollView>
          <Title
            label={t('billing_information_required')}
            style={AddBusinessStyle.title}
          />
          <Text style={AddBusinessStyle.subtitle}>
            {t('billing_information_required_content')}
          </Text>
          {Object.keys(businessState).map((item, index) => {
            if (item !== 'cardNumber' && item !== 'phoneNumber') {
              return (
                <BaseInput
                  onPress={
                    item === 'cardNumber' ? handleChooseDefaultPayment() : null
                  }
                  isDisabled={businessState[item].isDisabled}
                  style={AddBusinessStyle.baseInput}
                  icon={
                    <SvgXml
                      xml={businessState[item].svg}
                      width={22}
                      height={22}
                    />
                  }
                  name={item}
                  placeHolder={t(businessState[item].placeholder)}
                  onChangeText={value =>
                    handleChangeFormState({
                      type: item,
                      value,
                      label: businessState[item].label,
                    })
                  }
                  value={businessState[item].value}
                  key={`personal-inputs-${String(index)}`}
                  capitalize={'sentences'}
                  // onEndEditing={(event) => handleUpdateInfo(event, item)}
                />
              );
            }
          })}

          {/* <BaseInput
            onPress={null}
            isDisabled={false}
            style={AddBusinessStyle.baseInput}
            icon={<SvgXml xml={svgs.drivingLicense} width={22} height={22} />}
            name={'userPhoneNumber'}
            placeHolder={t('phone_number_placeholder')}
            onChangeText={handleChangePhoneNumber}
            value={userPhoneNumber}
            key={`personal-inputs-phone`}
            capitalize={'sentences'}
          /> */}

          <View style={{marginTop: 9}}>
            <Box style={AddBusinessStyle.input}>
              <Dropdown data={dialCodes} setDial={setPrefix} dial={prefix} />
              <TextInput
                onChangeText={event => handleChangePhoneNumber(event)}
                value={userPhoneNumber}
                name={'phoneNumber'}
                placeholder={t('phone_number')}
                placeholderTextColor={'#e3e3e3'}
                keyboardType="numeric"
                style={{
                  ...LoginPhoneStyle.textInput,
                  paddingVertical: 0,
                }}
                maxLength={prefix === '+40' ? 9 : 15}
              />
            </Box>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
      <View style={AddBusinessStyle.floatingContainer}>
        <ButtonComponent
          text={'CONFIRM'}
          onPress={() => handleSubmit({closeModal: true})}
          isDisabled={!isButtonDisabled}
        />
      </View>
      {/* </KeyboardView> */}

      <Modal isFullScreen={true} modalVisible={modalVisible}>
        <PaymentOptions
          onCardPress={hadleSetBusinessCard}
          onExitPress={handleModal}
          onSmsPress={handleModal}
          isFromPaymentDetails={false}
          profileType={'Business'}
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

AddBusinessModalComponent.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddBusinessModalComponent;
