import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Platform,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Modal,
} from 'react-native';
//style && assets
import LoginStyle from './Login.style';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import AddPhoneStyle from '../../components/AddPhone/AddPhone.style';
import Privacy from '../../assets/Privacy';
import Terms from '../../assets/Terms';
//components
import BaseInput from '../../components/BaseInput';
import {
  ButtonComponent,
  Title,
  NativeBaseBackButton,
  TextModal,
} from '../../components';
//libraries
import Toast from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
//redux
import {
  usePostEmailAndPassMutation,
  usePostLoginWithEmailMutation,
} from '../../services/auth';
import {setToken} from '../../redux/features/auth/authSlice';
import {setLoadingScreen} from '../../redux/features/notifications/notificationSlice';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {BLUE, GREY, RED} from '../../helpers/style/constants';
//helpers
import {useFcmTokenUpdater} from '../../helpers/useFcmTokenUpdater';
import {useTranslation} from 'react-i18next';

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {updateFcmToken} = useFcmTokenUpdater();
  const {t} = useTranslation();

  const {error} = useSelector(state => state.auth);
  const {language} = useSelector(state => state.users);

  const [postEmailAndPass, {isLoading: isLoadingRegister}] =
    usePostEmailAndPassMutation();
  const [postLoginWithEmail] = usePostLoginWithEmailMutation();

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [registerEmail, setRegisterEmail] = useState({
    repeatPassword: null,
    email: null,
    password: null,
    // to: null,
  });
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textModalVisivle, setTextModalVisible] = useState(false);
  const [text, setText] = useState(null);

  const toastRef = useRef();

  const handleChangeRegisterEmail = ({type, text}) => {
    setRegisterEmail(prevState => {
      return {
        ...prevState,
        [type]: text,
      };
    });
  };

  const comparePasswords = () => {
    if (registerEmail.password !== registerEmail.repeatPassword) {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
      handleSubmitEmail();
    }
  };

  const handleSubmitEmail = async () => {
    if (
      registerEmail?.email?.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setIsInvalidEmail(false);

      const deviceId = await DeviceInfo.getUniqueId();
      const body = {
        email: registerEmail?.email,
        password: registerEmail?.password,
        firstName: registerEmail?.firstName,
        lastName: registerEmail?.lastName,
        device: {
          deviceType: Platform.OS,
          deviceId: deviceId,
          firebaseToken: 'string',
          brand: 'string',
          model: 'string',
          resolutionWidth: 0,
          resolutionHeight: 0,
        },
      };
      try {
        await postEmailAndPass(body)
          .then(answer => {
            // if (!error.message) {
            // handleNav("LoginEmail");
            handleLoginWithEmail();
            // navigation.navigate("SmsConfirmCode");
            return;
            // }

            return answer;
          })
          .catch(err => {
            console.log('ERR >>>', err);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsInvalidEmail(true);
    }
  };

  const handleLoginWithEmail = async () => {
    if (
      registerEmail?.email?.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setIsLoading(true);
      setIsInvalidEmail(false);

      const deviceId = await DeviceInfo.getUniqueId();
      const brand = await DeviceInfo.getBrand();
      const model = await DeviceInfo.getModel();
      const body = {
        email: registerEmail?.email,
        password: registerEmail?.password,
        device: {
          deviceType: Platform.OS,
          deviceId: deviceId,
          firebaseToken: 'string',
          brand: brand,
          model: model,
          resolutionWidth: 0,
          resolutionHeight: 0,
        },
      };

      await postLoginWithEmail(body)
        .then(answer => {
          if (answer?.error?.data) {
            setIsInvalidEmail(true);
          }
          if (answer?.data?.jwt) {
            dispatch(setToken({jwt: answer?.data?.jwt}));
            updateFcmToken();
            navigation.navigate('HomeDrawer');
          }
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          console.log('login err: ', err);
        });
    } else {
      setIsInvalidEmail(true);
      setIsLoading(false);
    }
  };

  const handleNav = screen => {
    setRegisterEmail({
      repeatPassword: null,
      email: null,
      password: null,
    });
    navigation.navigate(screen);
  };

  const handleText = item => {
    switch (language?.name) {
      case 'ro':
        setText(item.ro);
        break;
      case 'en':
        setText(item.en);
        break;
      case 'fr':
        setText(item.fr);
        break;
      case 'de':
        setText(item.de);
        break;
      case 'hu':
        setText(item.hu);
        break;
      default:
        setText(item.en);
    }

    setTextModalVisible(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/splash.png')}
      resizeMode="cover"
      style={LoginStyle.image}>
      <View style={{position: 'absolute', top: '5%', left: 35}}>
        <NativeBaseBackButton
          // style={PaymentDetailsStyle.backButton}
          handleOnPress={() => navigation.goBack()}
        />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={LoginStyle.modalContainer}>
          <Title label={t('register')} />
          <View style={LoginStyle.bodyContainer}>
            <View>
              {isInvalidEmail && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    fontFamily: 'AzoSans-Bold',
                  }}>
                  {t('invalid_email')}
                </Text>
              )}
              <BaseInput
                style={AddPhoneStyle.baseInput}
                icon={
                  <SvgXml
                    xml={
                      registerEmail?.email?.length > 0
                        ? svgs.mail
                        : svgs.mailDisabled
                    }
                    width={22}
                    height={24}
                  />
                }
                name={'email'}
                placeHolder={t('mail_placeholder')}
                keyboardType={'email-address'}
                onChangeText={text =>
                  handleChangeRegisterEmail({
                    type: 'email',
                    text,
                  })
                }
                value={registerEmail?.email}
              />

              <BaseInput
                style={AddPhoneStyle.baseInput}
                rightIcon={true}
                icon={
                  <SvgXml
                    xml={
                      registerEmail?.password?.length > 0
                        ? invalidPassword
                          ? svgs.pwIconDanger
                          : svgs.pwIcon
                        : svgs.pwIconDisabled
                    }
                    width={22}
                    height={24}
                  />
                }
                name={'password'}
                placeHolder={t('insert_password')}
                onChangeText={text =>
                  handleChangeRegisterEmail({
                    type: 'password',
                    text,
                  })
                }
                value={registerEmail?.password}
                secureTextEntry={true}
              />
              <BaseInput
                style={AddPhoneStyle.baseInput}
                icon={
                  <SvgXml
                    xml={
                      registerEmail?.repeatPassword?.length > 0
                        ? invalidPassword
                          ? svgs.pwIconDanger
                          : svgs.pwIcon
                        : svgs.pwIconDisabled
                    }
                    width={22}
                    height={24}
                  />
                }
                rightIcon={true}
                name={'repeatPassword'}
                placeHolder={t('insert_password_again')}
                onChangeText={text =>
                  handleChangeRegisterEmail({
                    type: 'repeatPassword',
                    text,
                  })
                }
                value={registerEmail?.repeatPassword}
                secureTextEntry={true}
              />
              {invalidPassword && (
                <Text style={LoginStyle.errText}>{t('password_match')}</Text>
              )}
              <Text style={LoginStyle.disclaimerText}>
                {t('tc_sufix')}{' '}
                <Text
                  style={LoginStyle.highlited}
                  // onPress={() => navigation.navigate("TermsScreen")}
                  onPress={() => handleText(Terms)}>
                  {t('terms_and_conditions')}{' '}
                </Text>
                {t('and')}{' '}
                <Text
                  style={LoginStyle.highlited}
                  // onPress={() => navigation.navigate("PrivacyScreen")}
                  onPress={() => handleText(Privacy)}>
                  {t('privacy_policy')}
                </Text>
              </Text>
            </View>

            <View style={LoginStyle.btnsContainer}></View>
            <ButtonComponent
              text={t('register').toUpperCase()}
              // onPress={handleSubmitEmail}
              onPress={comparePasswords}
              isDisabled={false}
            />
          </View>
          <Toast
            ref={toastRef}
            style={{
              zIndex: 3,
              elevation: 3,
            }}
          />
        </View>
      </TouchableWithoutFeedback>
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
      <Modal visible={textModalVisivle} isFullScreen={true}>
        <TextModal setIsVisible={setTextModalVisible} text={text} />
      </Modal>
    </ImageBackground>
  );
};

export default Register;
