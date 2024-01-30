import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {
  Home,
  Profile,
  SettingsScreen,
  Invite,
  Wallet,
  SetYourParkPin,
  HelpScreen,
  Login,
  QrScanner,
  ReservationsList,
  CreateCard,
  ParkingsList,
  SelectCar,
} from '../screens';
import {BLACK, WHITE} from '../helpers/style/constants';
import profile from '../assets/icons/profile.png';
import settings from '../assets/icons/settings.png';
import wallet from '../assets/icons/wallet.png';
import star from '../assets/icons/star.png';
import help from '../assets/icons/question.png';
import home from '../assets/icons/home.png';
import logout from '../assets/icons/logout.png';
import NavigationStyle from './Navigation.style';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {clearToken, resetAuthState} from '../redux/features/auth/authSlice';
import {resetCarsState} from '../redux/features/cars/carsSlice';
import {resetNotificationsState} from '../redux/features/notifications/notificationSlice';
import {resetParkingState} from '../redux/features/parkings/parkingsSlice';
import {resetUserState} from '../redux/features/users/userSlice';
import {useUpdateFcmTokenMutation} from '../services/notifications';
import DeviceInfo from 'react-native-device-info';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  requestUserPermission,
  NotificationListener,
} from '../utils/pushNotificationsHelper';
import usePrevious from '../hooks/usePrevious.hook';
import {Toast, NotificationPopup, CustomDrawer} from '../components';

import {useToast, Actionsheet} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import {setModaltitle} from '../redux/features/notifications/notificationSlice';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {t} from 'i18next';
import {setCurrentReservations} from '../redux/features/parkings/parkingsSlice';
import {useGetCurrentReservationsMutation} from '../services/parkings';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {modalTitle, modalBody, activeLoadingScreen, messageId} = useSelector(
    state => state.notification,
  );
  const {currentReservations, parkingDetails} = useSelector(
    state => state.parkings.parkingsState,
  );

  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const prevSentTime = usePrevious(messageId);
  const [isVisible, setIsVisible] = useState(false);

  const [updateToken] = useUpdateFcmTokenMutation();

  const updateFcmToken = async () => {
    const id = await DeviceInfo.getUniqueId();
    const body = {
      newFirbaseToken: '',
      deviceId: id,
    };
    await updateToken(body);
  };

  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut().then(() => {
        console.log('ggl sign out ');
        updateFcmToken();
      });
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }

    dispatch(clearToken());
    dispatch(resetAuthState());
    dispatch(resetCarsState());
    dispatch(resetNotificationsState());
    dispatch(resetParkingState());
    dispatch(resetUserState());
    navigation.navigate('Login', {paramPropKey: 'paramPropValue'});
  };

  const handleBackButton = screen => {
    if (screen === 'HomePage') {
      Alert.alert('Are you sure you want to exit ?', '', [
        {
          text: 'NO',
          onPress: () => {
            // console.log("Cancel Pressed");
          },
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      navigation.navigate('HomePage');
      return true;
    }
  };

  const handleNotification = ({
    modalTitle,
    modalBody,
    sentTime,
    messageId,
    parkingId,
    type,
  }) => {
    dispatch(
      setModaltitle({
        modalTitle,
        modalBody,
        sentTime,
        messageId,
        parkingId,
        type,
      }),
    );
  };

  useEffect(() => {
    requestUserPermission();
    NotificationListener(handleNotification);

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handlel in the background: ', remoteMessage);
    });
  }, []);

  const handleRemoveExpiredreservation = async reservationId => {
    const newList = currentReservations?.filter(
      reservation => reservation.parkingReservationId !== reservationId,
    );
    await getCurrentReservations();
    setCurrentReservations(newList);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      console.log('Message handlel in the foreground: ', remoteMessage);
      handleRemoveExpiredreservation(remoteMessage?.data?.parkingReservationId);
      setIsVisible(true);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (prevSentTime !== messageId && modalTitle) {
      setIsVisible(true);
    }
  }, [messageId]);

  return (
    <>
      <>
        <Drawer.Navigator
          screenOptions={{
            drawerStyle: {
              backgroundColor: BLACK,
              // paddingVertical: 100,
              width: 250,
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
            },
            drawerInactiveTintColor: WHITE,
            drawerActiveTintColor: WHITE,
            drawerPosition: 'right',
            drawerType: 'front',
          }}
          drawerContent={() => <CustomDrawer />}>
          <Drawer.Screen
            name="HomePage"
            component={Home}
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              headerShown: false,
              inactiveTintColor: 'white',
              activeTintColor: 'pink',
              gestureEnabled: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={home} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>HOME</Text>
                </View>
              ),
            }}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('HomePage'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('HomePage'),
                ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            options={{
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={profile} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('profile').toUpperCase()}
                  </Text>
                </View>
              ),
            }}
            component={Profile}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('Profile'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('Profile'),
                ),
            }}
          />
          <Drawer.Screen
            name="Wallet"
            options={{
              title: '',
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={wallet} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('wallet').toUpperCase()}
                  </Text>
                </View>
              ),
            }}
            component={Wallet}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('Wallet'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('Wallet'),
                ),
            }}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={settings} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('settings').toUpperCase()}
                  </Text>
                </View>
              ),
            }}
            component={SettingsScreen}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('Settings'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('Settings'),
                ),
            }}
          />
          <Drawer.Screen
            name="Invite"
            options={{
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={star} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('invite_friends').toUpperCase()}
                  </Text>
                </View>
              ),
            }}
            component={Invite}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('Invite'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('Invite'),
                ),
            }}
          />
          <Drawer.Screen
            name="Help"
            options={{
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('help').toUpperCase()}
                  </Text>
                </View>
              ),
            }}
            component={HelpScreen}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('Help'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('Help'),
                ),
            }}
          />
          <Drawer.Screen
            name="QrScanner"
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>HELP</Text>
                </View>
              ),
            }}
            component={QrScanner}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('QrScanner'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('QrScanner'),
                ),
            }}
          />
          <Drawer.Screen
            name="CreateCard"
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>CreateCard</Text>
                </View>
              ),
            }}
            component={CreateCard}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('CreateCard'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('CreateCard'),
                ),
            }}
          />
          <Drawer.Screen
            name="ReservetionsList"
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('reservations_list')}
                  </Text>
                </View>
              ),
            }}
            component={ReservationsList}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('ReservetionsList'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('ReservetionsList'),
                ),
            }}
          />
          <Drawer.Screen
            name="ParkingsList"
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>{t('parkings')}</Text>
                </View>
              ),
            }}
            component={ParkingsList}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('ParkingsList'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('ParkingsList'),
                ),
            }}
          />
          <Drawer.Screen
            name="SelectCar"
            options={{
              drawerItemStyle: {
                display: 'none',
              },
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={help} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('select_car')}
                  </Text>
                </View>
              ),
            }}
            component={SelectCar}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('SelectCar'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('SelectCar'),
                ),
            }}
          />
          <Drawer.Screen
            name="LogOut"
            options={{
              title: '',
              gestureEnabled: false,
              headerShown: false,
              drawerIcon: ({color}) => (
                <TouchableOpacity
                  onPress={handleLogout}
                  style={NavigationStyle.logOutContainer}>
                  <Image source={logout} style={NavigationStyle.logOutImg} />
                  <View>
                    <Text style={NavigationStyle.linkText}>{t('log_out')}</Text>
                  </View>
                </TouchableOpacity>
              ),
            }}
            component={Login}
          />
          <Drawer.Screen
            name="SetYourParkPin"
            options={{
              title: '',
              gestureEnabled: false,
              drawerItemStyle: {
                display: 'none',
              },
              headerShown: false,
              drawerIcon: ({color}) => (
                <View style={NavigationStyle.linkContainer}>
                  <Image source={star} style={NavigationStyle.linkImg} />
                  <Text style={NavigationStyle.linkText}>
                    {t('set_park_pin')}
                  </Text>
                </View>
              ),
            }}
            component={SetYourParkPin}
            listeners={{
              focus: () =>
                BackHandler.addEventListener('hardwareBackPress', () =>
                  handleBackButton('SetYourParkPin'),
                ),
              blur: () =>
                BackHandler.removeEventListener('hardwareBackPress', () =>
                  handleBackButton('SetYourParkPin'),
                ),
            }}
          />
        </Drawer.Navigator>
      </>
      <Actionsheet
        isOpen={isVisible}
        style={{height: '45%', position: 'absolute', bottom: 0}}>
        <NotificationPopup setIsVisible={setIsVisible} />
      </Actionsheet>
    </>
  );
};

export default MainDrawerNavigation;
