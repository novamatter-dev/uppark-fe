import React, {useRef, useState, useEffect} from 'react';
import {Box} from 'native-base';
import {TouchableOpacity, Text} from 'react-native';
import {
  Modal,
  AddPersonal,
  AddLicense,
  AddPhone,
  AddBusiness,
} from '../../../../components';
import ProfileStyle from '../../Profile.style';

import AddCarStyle from '../../../AddCar/AddCar.style';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector, useDispatch} from 'react-redux';
import {
  setBusiness,
  setLicense,
} from '../../../../redux/features/users/userSlice';
import {SvgXml} from 'react-native-svg';
import svgs from '../../../../assets/svgs';
import Toast from 'react-native-toast-notifications';
import {useGetCardsMutation} from '../../../../services/wallets';
import {
  useUpdateUserMutation,
  useGetUserMutation,
  useUpdateDrivingLincenseMutation,
} from '../../../../services/users';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

const DetailsTab = () => {
  const dispatch = useDispatch();
  const {expirationDateDrivingLicense} = useSelector(state => state.users);
  const {phoneNumber} = useSelector(state => state.auth);
  const toastRef = useRef();
  const {t} = useTranslation();

  const [getCards] = useGetCardsMutation();
  // const [updateUser] = useUpdateUserMutation();
  const [getUserDetails] = useGetUserMutation();
  const [updateDrivingLicense] = useUpdateDrivingLincenseMutation();

  const [personalModalVisible, setPersonalModalVisible] = useState(false);
  const [businessModalVisible, setBusinessModalVisible] = useState(false);
  const [licenseModalVisible, setLicenseModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);

  const handleGetUserDetails = async () => {
    await getUserDetails().then(answer => {
      const date = answer?.data?.drivingLicenseExpirationDate
        ? moment(answer?.data?.drivingLicenseExpirationDate).format(
            'DD.MM.yyyy',
          )
        : t('add_driving_license_expiration_date');
      dispatch(setLicense(date));
    });
  };

  useEffect(() => {
    handleGetUserDetails();
  }, []);

  const handleOnPressPersonal = () => {
    setPersonalModalVisible(!personalModalVisible);
  };

  const handleOnPressBusiness = () => {
    setBusinessModalVisible(!businessModalVisible);
  };

  const handleOnPressLicense = () => {
    setLicenseModalVisible(!licenseModalVisible);
  };

  const handleOnPressPhone = () => {
    setPhoneModalVisible(!phoneModalVisible);
  };

  const handleChangeBusiness = personalFormState => {
    dispatch(setBusiness({business: {...personalFormState}}));
    setBusinessModalVisible(false);
  };

  const handleChangeLicenseDate = async value => {
    const val = value.split('/');
    // const arr = val.reverse();
    const date = val.join('.');

    const body = {
      drivingLicenseDate: date,
    };

    const newDate = new Date(date);

    await updateDrivingLicense(body)
      .then(() => {
        handleGetUserDetails();
      })
      .catch(err => {
        console.log('update license plate err: ', err);
      });

    // dispatch(setLicense({ expirationDateDrivingLicense: date }));
  };

  const handleGetCards = async () => {
    await getCards();
  };

  return (
    <Box style={ProfileStyle.screenContainer}>
      {/* <KeyboardAwareScrollView> */}
      <Box style={AddCarStyle.inputContainer}>
        <TouchableOpacity
          onPress={() => setPersonalModalVisible(true)}
          style={AddCarStyle.detailsBtn}>
          <SvgXml xml={svgs.profile} width={22} height={24} />
          <Text style={AddCarStyle.btnLabel}>{t('personal')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setBusinessModalVisible(true)}
          style={AddCarStyle.detailsBtn}>
          <SvgXml xml={svgs.mail} width={22} height={24} />
          <Text style={AddCarStyle.btnLabel}>{t('business')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPhoneModalVisible(true)}
          style={AddCarStyle.detailsBtn}>
          <SvgXml xml={svgs.phone} width={22} height={24} />
          <Text style={AddCarStyle.btnLabel}>
            {phoneNumber !== '' ? phoneNumber : t('add_phone')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setLicenseModalVisible(true)}
          style={AddCarStyle.detailsBtn}>
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text
            style={{
              ...AddCarStyle.btnLabel,
              color: expirationDateDrivingLicense ? 'black' : '#d3d3d3',
            }}>
            {expirationDateDrivingLicense === null
              ? t('add_driving_license_expiration_date')
              : expirationDateDrivingLicense.split('.').join('/')}
          </Text>
        </TouchableOpacity>
      </Box>

      <Modal modalVisible={phoneModalVisible} isFullScreen={true}>
        <AddPhone
          onClosePress={handleOnPressPhone}
          onConfirmPress={handleOnPressPhone}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>

      <Modal modalVisible={personalModalVisible} isFullScreen={true}>
        <AddPersonal
          onClosePress={handleOnPressPersonal}
          handleGetCards={handleGetCards}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>

      <Modal modalVisible={businessModalVisible} isFullScreen={true}>
        <AddBusiness
          onClosePress={handleOnPressBusiness}
          handleGetCards={handleGetCards}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>

      <Modal modalVisible={licenseModalVisible} isFullScreen={true}>
        <AddLicense
          onClosePress={() => handleOnPressLicense()}
          onConfirmPress={() => handleOnPressLicense()}
          handleChangeLicenseDate={handleChangeLicenseDate}
          handleGetUserDetails={handleGetUserDetails}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>
      {/* </KeyboardAwareScrollView> */}
    </Box>
  );
};

export default DetailsTab;
