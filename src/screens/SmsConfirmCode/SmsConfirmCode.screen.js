import React, {useState, useEffect, useRef} from 'react';
import {
  ImageBackground,
  Platform,
  Text,
  View,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Box} from 'native-base';
import {
  ButtonComponent,
  KeyboardView,
  Modal,
  NativeBaseButton,
  Title,
  NativeBaseBackButton,
} from '../../components';
import {SmsConfirmCodeInputs} from './Components';
import codeSmsStyle from './SmsConfirmCode.style';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {setPhoneNumber, setToken} from '../../redux/features/auth/authSlice';
import {
  usePostCreatePhoneNumberMutation,
  usePutConfirmPhoneNumberMutation,
} from '../../services/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-notifications';
import {BLUE, WHITE} from '../../helpers/style/constants';
import {t} from 'i18next';
import OTPScreen from './Components/SmsConfirmCodeInputs/OTPScreen';
//helpers
import {useFcmTokenUpdater} from '../../helpers/useFcmTokenUpdater';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {phoneNumber, error} = useSelector(state => state.auth);
  const [putConfirmPhoneNumber] = usePutConfirmPhoneNumberMutation();
  const [postCreatePhoneNumber, {isLoading: isLoadingResend}] =
    usePostCreatePhoneNumberMutation();
  const {updateFcmToken} = useFcmTokenUpdater();

  const toastRef = useRef();

  const [disableScreen, setDisableScreen] = useState(false);
  const [codeDigitValues, setCodeDigitValues] = useState({
    ref1: '',
    ref2: '',
    ref3: '',
    ref4: '',
  });
  const [otp, setOTP] = useState(['', '', '', '']);
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const [resend, setResend] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //TODO: loading upt to 1 min & after 5 requests -> block account for 1 hour
  const handleResend = async () => {
    try {
      await postCreatePhoneNumber({
        phoneNumber: phoneNumber,
      })
        .unwrap()
        .then(answer => {
          return answer;
        })
        .catch(err => {
          console.log('ERR >>>', err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setResend(false);
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    const deviceId = await DeviceInfo.getUniqueId();
    const model = await DeviceInfo.getModel();
    const brand = await DeviceInfo.getBrand();

    try {
      await putConfirmPhoneNumber({
        phoneNumber,
        code: `${otp[0]}${otp[1]}${otp[2]}${otp[3]}`,
        device: {
          deviceType: Platform.OS,
          deviceId: deviceId,
          firebaseToken: fcmtoken,
          brand: brand,
          model: model,
          resolutionWidth: 0,
          resolutionHeight: 0,
        },
      })
        .unwrap()
        .then(answer => {
          if (!error.message) {
            if (answer.isSucceeded) {
              setIsModalVisible(false);
              dispatch(setToken({jwt: answer.jwt}));
              setDisableScreen(true);
              setIsLoading(false);
              // setTimeout(() => {
              // setDisableScreen(false);
              updateFcmToken();
              navigation.navigate('HomeDrawer');
              // }, 3000);
            } else {
              if (
                answer?.needRegenerateCode ||
                answer?.data?.needRegenerateCode
              ) {
                setResend(true);
              }
            }
          } else {
            setIsLoading(false);
            if (
              answer?.needRegenerateCode ||
              answer?.data?.needRegenerateCode
            ) {
              setResend(true);
            }
          }
          return answer;
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (
      codeDigitValues.ref1 &&
      codeDigitValues.ref2 &&
      codeDigitValues.ref3 &&
      codeDigitValues.ref4
    ) {
      setBtnIsDisabled(false);
    }
  }, [codeDigitValues]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <Box style={codeSmsStyle.imgContainer}>
        <ImageBackground
          source={require('../../assets/images/splash.png')}
          resizeMode="cover"
          style={codeSmsStyle.image}>
          <Modal modalVisible={isModalVisible} style={codeSmsStyle.modalBg}>
            {disableScreen ? (
              <>
                <Text>{t('loading')}...</Text>
              </>
            ) : (
              <>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View style={{position: 'absolute', left: 0}}>
                    <NativeBaseBackButton
                      // style={PaymentDetailsStyle.backButton}
                      handleOnPress={() => navigation.goBack()}
                      style={{backgroundColor: WHITE}}
                    />
                  </View>
                  <Title label={t('enter_code')} />
                </View>
                {/* <KeyboardView> */}
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '80%',
                    paddingTop: '16%',
                    paddingHorizontal: '10%',
                  }}
                  onStartShouldSetResponder={dismissKeyboard}>
                  {/* <SmsConfirmCodeInputs
                    totalDigits={4}
                    setCodeDigitValues={setCodeDigitValues}
                    isResend={resend}
                    handleOnSubmit={handleOnSubmit}
                    handleResend={handleResend}
                    codeDigitValues={codeDigitValues}
                  /> */}
                  <OTPScreen
                    handleResend={handleResend}
                    setOTP={setOTP}
                    otp={otp}
                  />
                </View>
                {/* </KeyboardView> */}
                <View
                  style={{
                    width: '100%',
                    position: 'absolute',
                    bottom: '10%',
                  }}>
                  <ButtonComponent
                    text={t('confirm').toUpperCase()}
                    onPress={handleOnSubmit}
                    // isDisabled={btnIsDisabled || isLoading || isLoadingResend}
                    isDisabled={!otp.every(str => str !== '')}
                  />
                </View>
              </>
            )}
            <Toast
              ref={toastRef}
              style={{
                zIndex: 3,
                elevation: 3,
              }}
            />
          </Modal>
        </ImageBackground>
      </Box>
      {isLoading && (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color={BLUE} />
        </View>
      )}
    </>
  );
};

export default Home;
