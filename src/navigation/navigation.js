import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Linking,
  NativeModules,
  PermissionsAndroid,
  Platform,
  Text,
  View,
} from 'react-native';
import {setError} from '../redux/features/auth/authSlice';
import {
  ActiveParking,
  AddCar,
  HelpScreen,
  Login,
  ParkFromScreen,
  PaymentDetails,
  PrivacyScreen,
  ReservartionDetailsScreen,
  SmsConfirmCode,
  Splash,
  TermsScreen,
} from '../screens';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import {LoginPhone} from '../screens/Login/Components';
import Register from '../screens/Login/Register';
import MainDrawerNavigation from './drawerNavigation';
import style from './updateStyle';
//libraries
import NetInfo from '@react-native-community/netinfo';
import {useToast} from 'native-base';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
//components
import {useNavigation} from '@react-navigation/native';
import {t} from 'i18next';
import {ButtonComponent, Toast} from '../components';
import LoginEmail from '../screens/Login/LoginEmail';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {BLACK, PLATINUM, RED} from '../helpers/style/constants';
import {
  setInternetConnection,
  setLanguage,
} from '../redux/features/users/userSlice';
import Maintenance from '../screens/Maintenance/Maintenance.screen';
import PaymentConfirmation from '../screens/PaymentConfirmation/PaymentConfirmation.screen';
import {useCheckForUpdatesMutation} from '../services/notifications';

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {error} = useSelector(state => state.auth);
  const {language} = useSelector(state => state.users);
  const {i18n} = useTranslation();

  const navigation = useNavigation();

  const [checkForUpates] = useCheckForUpdatesMutation();

  const [update, setUpdate] = useState({
    showNotification: false,
    link: '',
  });

  const [showStore, setShowStore] = useState(false);

  const screenListeners = {
    focus: () => {
      // do something when screen opens & is focused
      dispatch(setError({status: null, message: null}));
    },
    blur: () => {
      // do something when scree is closed OR dismissed (in iOS)
      dispatch(setError({status: null, message: null}));
    },
  };

  const handleCheckForUpates = async () => {
    const appVer = DeviceInfo.getVersion();

    const body = {
      platform: Platform.OS.toUpperCase(),
      clientVersion: appVer,
      // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
      source: 'UPPARK', // 'UPPARK'
    };

    await checkForUpates(body)
      .then(answer => {
        console.log('>>> checkMaintenanceMode data:', answer.data);
        if (answer?.data?.maintenanceMode) {
          navigation.navigate('Maintenance');
        }

        if (answer?.data?.needsUpdate) {
          // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING: check for constantaparking and uppark app link store UPPARK CONSTANTA PARK
          setUpdate({
            showNotification: true,
            link: 'https://play.google.com/store/apps/details?id=com.uppark',
          });
        }
      })
      .catch(err => {
        console.log('checkForUpates err: ', err);
      });
  };

  const handleOpenLink = async () => {
    await Linking.openURL(update?.link);
    // setShowStore(true);
  };

  useEffect(() => {
    if (error?.message) {
      toast.show(error.message, {
        type: error?.type || 'normal',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    }
  }, [error]);

  const id = 'internet-toast';

  const languages = [
    {
      name: 'en',
      label: 'English',
    },
    {
      name: 'ro',
      label: 'Română',
    },
    {
      name: 'fr',
      label: 'French',
    },
    {
      name: 'de',
      label: 'Deutsch',
    },
    {
      name: 'hu',
      label: 'Magyar',
    },
  ];

  const handleLanguage = () => {
    const nativeLocale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    const locale = nativeLocale.split('_');
    const fallBack = locale[0];

    const lang = languages?.find(el => el.name === fallBack);
    dispatch(setLanguage(lang));
  };

  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkApplicationPermission();
    if (language) {
      i18n.changeLanguage(language?.name);
    } else {
      handleLanguage();
    }
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        if (!toast.isActive(id)) {
          toast.show({
            id: id,
            placement: 'top',
            duration: null,
            render: () => {
              return (
                <Toast message={t('internet_connection')} type={'danger'} />
              );
            },
          });
        }
        dispatch(setInternetConnection(false));
      } else {
        dispatch(setInternetConnection(true));
        toast.closeAll();
      }
    });
    handleCheckForUpates();
  }, []);

  useEffect(() => {
    checkApplicationPermission();
    // if (error?.message) {
    //   toast.show(error.message, {
    //     type: error?.type || "normal",
    //     placement: "bottom",
    //     duration: 4000,
    //     offset: 30,
    //     animationType: "slide-in",
    //   });
    // }
    if (error.status === 401) {
      toast.show({
        id: id,
        placement: 'top',
        duration: null,
        render: () => {
          return <Toast message={'Unauthorized!'} type={'danger'} />;
        },
      });
      navigation.navigate('Login');
    }
  }, [error]);

  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          options={{headerShown: false, orientation: 'portrait'}}
          component={Splash}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="Maintenance"
          options={{headerShown: false, orientation: 'portrait'}}
          component={Maintenance}
          listeners={screenListeners}
        />

        <Stack.Screen
          name={'HomeDrawer'}
          options={{
            headerShown: false,
            gestureEnabled: false,
            orientation: 'portrait',
          }}
          component={MainDrawerNavigation}
        />

        <Stack.Screen
          name="Login"
          options={{headerShown: false, orientation: 'portrait'}}
          component={Login}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="LoginPhone"
          options={{headerShown: false, orientation: 'portrait'}}
          component={LoginPhone}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="LoginEmail"
          options={{headerShown: false, orientation: 'portrait'}}
          component={LoginEmail}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="Register"
          options={{headerShown: false, orientation: 'portrait'}}
          component={Register}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="ForgotPassword"
          options={{headerShown: false, orientation: 'portrait'}}
          component={ForgotPassword}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="SmsConfirmCode"
          options={{headerShown: false, orientation: 'portrait'}}
          component={SmsConfirmCode}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="ParkFromScreen"
          options={({route}) => ({headerShown: false, orientation: 'portrait'})}
          component={ParkFromScreen}
        />

        <Stack.Screen
          name="PaymentDetails"
          options={{headerShown: false, orientation: 'portrait'}}
          component={PaymentDetails}
        />

        <Stack.Screen
          name="PaymentConfirmation"
          options={{headerShown: false, orientation: 'portrait'}}
          component={PaymentConfirmation}
        />

        <Stack.Screen
          name="ActiveParking"
          options={{headerShown: false, orientation: 'portrait'}}
          component={ActiveParking}
        />

        <Stack.Screen
          name="AddCar"
          options={{headerShown: false, orientation: 'portrait'}}
          component={AddCar}
        />
        {/* <Stack.Screen
          name="QrScanner"
          options={{ headerShown: false }}
          component={QrScanner}
        /> */}
        <Stack.Screen
          name="HelpScreen"
          options={{headerShown: false, orientation: 'portrait'}}
          component={HelpScreen}
        />
        <Stack.Screen
          name="ReservartionDetailsScreen"
          options={{headerShown: false, orientation: 'portrait'}}
          component={ReservartionDetailsScreen}
        />
        <Stack.Screen
          name="TermsScreen"
          options={{headerShown: false, orientation: 'portrait'}}
          component={TermsScreen}
        />
        <Stack.Screen
          name="PrivacyScreen"
          options={{headerShown: false, orientation: 'portrait'}}
          component={PrivacyScreen}
        />
      </Stack.Navigator>

      {update?.showNotification && (
        <View style={style.updateNotificationContainer}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 18,
            }}>
            <Text style={style.title}>{t('update_available')}</Text>
            <Text style={style.text}>{t('update_text')}</Text>
          </View>
          <View style={style.btnContainer}>
            <ButtonComponent
              text={t('later').toUpperCase()}
              onPress={() => setUpdate({showNotification: false})}
              color={'transparent'}
              labelColor={RED}
            />
            <ButtonComponent
              text={t('update_now').toUpperCase()}
              onPress={handleOpenLink}
              color={PLATINUM}
              labelColor={BLACK}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default MainStackNavigation;
