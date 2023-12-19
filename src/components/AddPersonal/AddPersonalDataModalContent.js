import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
//assets & style
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import {AQUA} from '../../helpers/style/constants';
import AddPersonalStyle from './AddPersonal.style';
//libraries
import {ScrollView, useToast} from 'native-base';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//components
import {PaymentOptions} from '../../screens/PaymentDetails/components';
import BaseInput from '../BaseInput';
import {ButtonComponent, Modal, NativeBaseBackButton, Title} from '../index';
//redux
import {t} from 'i18next';
import Toast from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {setPersonalEntry} from '../../redux/features/users/userSlice';
import {
  useGetPersonalProfileMutation,
  useGetUserMutation,
  useUpdatePersonalProfileMutation,
  useUpdateUserMutation,
  useUpdateUserPhoneNumberMutation,
} from '../../services/users';
import {useSetPersonalDefaultPaymentMutation} from '../../services/wallets';

const AddPersonalDataModalContent = props => {
  const {onClosePress, isDisabled, handleGetCards} = props;

  const personalState = useSelector(state => state.users.personal);
  const dispatch = useDispatch();
  const toastRef = useRef();
  const toast = useToast();

  const [updatePersonalDetails] = useUpdatePersonalProfileMutation();
  const [getPersonalProfile] = useGetPersonalProfileMutation();
  const [setPersonalDefaultPayment] = useSetPersonalDefaultPaymentMutation();
  const [getUserDetails] = useGetUserMutation();
  const [updateUserPhoneNumber] = useUpdateUserPhoneNumberMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  useEffect(() => {
    handleGetPersonalDetails();
    getDetails();
  }, []);

  const getDetails = async () => {
    await getUserDetails().then(answer => {
      setUserPhoneNumber(answer?.data?.phoneNumber);
    });
  };

  const handleGetPersonalDetails = async () => {
    await getPersonalProfile()
      .then(answer => {
        setUserPhoneNumber(answer?.data?.phoneNumber);
      })
      .catch(err => {
        console.log('ERR getPersonalProfile >>> ', err);
      });
  };

  const handleChangeFormState = ({type, label, value}) => {
    dispatch(setPersonalEntry({type, label, value}));
  };

  const handleChooseDefaultPayment = () => {
    handleGetCards();
    setModalVisible(true);
  };

  const handleSubmit = async ({closeModal = false}) => {
    const body = {
      firstName: personalState?.firstName?.value,
      lastName: personalState?.lastName?.value,
      email: personalState?.email?.value,
      address: personalState?.address?.value,
      city: personalState?.city?.value,
      county: personalState?.county?.value,
    };

    await updatePersonalDetails(body)
      .then(() => {
        closeModal && onClosePress();
      })
      .then(() => {
        updateUserPhoneNumber({phoneNumber: userPhoneNumber})
          .then(answer => {
            console.log('>>>UPDATE PHONE NUMBER:', answer);
            handleSuccessToast();
          })
          .catch(err => {
            console.log('>>>UPDATE PHONE NUMBER ERR:', err);
          });
      })
      .catch(err => {
        console.log('ERR updatePersonalDetails >>> ', err);
      });
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hadleSetPersonalCard = async id => {
    await handleSubmit({closeModal: false}).then(async () => {
      await setPersonalDefaultPayment({cardId: id})
        .then(answer => {
          setModalVisible(false);
          handleGetPersonalDetails();
        })
        .catch(err => {
          console.log('ERR setPersonalDefaultPayment >>> ', err);
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
              {t('personal_profile_saved')}
            </Text>
          </View>
        );
      },
    });
  };

  const handlePlaceholder = name => {
    switch (name) {
      case 'First Name':
        return t('first_name');

      case 'Last Name':
        return t('last_name');

      case 'Address':
        return t('address');

      case 'City':
        return t('city');

      case 'County':
        return t('county');

      case 'Email for receipt':
        return t('email_for_receipt');
    }
  };

  return (
    <View style={AddPersonalStyle.safeAreaContainer}>
      <NativeBaseBackButton
        isLoading={false}
        iconType={'exit'}
        handleOnPress={onClosePress}
        isDisabled={false}
        style={{backgroundColor: '#F5F5F5'}}
      />
      <Title
        label={t('billing_information_required')}
        style={AddPersonalStyle.title}
      />
      <Text style={AddPersonalStyle.subtitle}>
        {t('billing_information_required_content')}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AddPersonalStyle.container}>
        <KeyboardAwareScrollView>
          {Object.keys(personalState).map((item, index) => {
            console.log({item});
            if (
              item !== 'cardNumber' &&
              item !== 'city' &&
              item !== 'county' &&
              item !== 'phoneNumber'
            ) {
              return (
                <BaseInput
                  onPress={
                    item === 'cardNumber' ? handleChooseDefaultPayment() : null
                  }
                  isDisabled={personalState[item].isDisabled}
                  style={AddPersonalStyle.baseInput}
                  icon={
                    <SvgXml
                      xml={personalState[item].svg}
                      width={22}
                      height={22}
                    />
                  }
                  name={item}
                  // placeHolder={personalState[item].label}
                  placeHolder={t(personalState[item].placeholder)}
                  onChangeText={value =>
                    handleChangeFormState({
                      type: item,
                      value,
                      label: personalState[item].label,
                    })
                  }
                  value={personalState[item].value}
                  key={`personal-inputs-${String(index)}`}
                  capitalize={'sentences'}
                />
              );
            }
          })}
          <BaseInput
            onPress={null}
            isDisabled={false}
            style={AddPersonalStyle.baseInput}
            icon={<SvgXml xml={svgs.drivingLicense} width={22} height={22} />}
            name={'userPhoneNumber'}
            placeHolder={t('phone_number_placeholder')}
            onChangeText={value => setUserPhoneNumber(value)}
            value={userPhoneNumber}
            key={`personal-inputs-phone`}
            capitalize={'sentences'}
          />
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* </KeyboardView> */}

      <View style={AddPersonalStyle.floatingContainer}>
        <ButtonComponent
          text={t('confirm').toUpperCase()}
          onPress={() => handleSubmit({closeModal: true})}
          isDisabled={isDisabled}
        />
      </View>
      <Modal isFullScreen={true} modalVisible={modalVisible}>
        <PaymentOptions
          onCardPress={hadleSetPersonalCard}
          onExitPress={handleModal}
          onSmsPress={handleModal}
          isFromPaymentDetails={false}
          profileType={'Personal'}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>
      <Toast
        ref={toastRef}
        style={{
          zIndex: 3,
          elevation: 3,
        }}
      />
    </View>
  );
};

AddPersonalDataModalContent.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddPersonalDataModalContent;
