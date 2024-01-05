import React, {useEffect, useRef, useState} from 'react';
import MainStackNavigation from './src/navigation/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NativeBaseProvider} from 'native-base';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
//push notifications
// import {
//   requestUserPermission,
//   NotificationListener,
// } from "./src/utils/pushNotificationsHelper";
import {
  requestUserPermission,
  NotificationListener,
} from './src/utils/pushNotificationsHelper';
import messaging from '@react-native-firebase/messaging';
import {NotificationPopup, Toast as ToastComponent} from './src/components';
import {useDispatch, useSelector} from 'react-redux';
import {setModaltitle} from './src/redux/features/notifications/notificationSlice';
import usePrevious from './src/hooks/usePrevious.hook';
import './i18n.config';
import * as Sentry from '@sentry/react-native';

import {Actionsheet} from 'native-base';
import {View, ActivityIndicator} from 'react-native';
import {BLUE} from './src/helpers/style/constants';
import {t} from 'i18next';

import {LogBox} from 'react-native';

let persistor = persistStore(store);

const AppWrapper = () => {
  const dispatch = useDispatch();

  const {modalTitle, modalBody, activeLoadingScreen, messageId} = useSelector(
    state => state.notification,
  );
  const {hasInternetConnection} = useSelector(state => state.users);

  const prevSentTime = usePrevious(messageId);
  const [isVisible, setIsVisible] = useState(false);

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

    LogBox.ignoreLogs([
      'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
    ]);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
      console.log('Message handlel in the foreground: ', remoteMessage);
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
      <MainStackNavigation />
      {!hasInternetConnection && (
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
          <View
            style={{
              display: 'flex',
              top: '10%',
              position: 'absolute',
              top: '10%',
            }}>
            <ToastComponent
              message={t('internet_connection')}
              type={'danger'}
            />
          </View>
          <ActivityIndicator size="large" color={BLUE} />
        </View>
      )}
      {/* <Actionsheet
          isOpen={isVisible}
          style={{ height: "45%", position: "absolute", bottom: 0 }}
        >
          <NotificationPopup setIsVisible={setIsVisible} />
        </Actionsheet> */}
    </>
  );
};

Sentry.init({
  dsn: 'https://94ef0e90d2d8e954a0bc88cbb84e8d5a@o4505866309992448.ingest.sentry.io/4506001735024640',
  // debug: true,
  // environment: "development",
  tracesSampleRate: 1.0,
  // enableNative: false,
  integrations: [
    new Sentry.ReactNativeTracing({
      idleTimeoutMs: 5000,
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
    }),
  ],

  // tracesSampler: 1.0,
});

const App = () => {
  const navigationRef = useNavigationContainerRef();
  useReduxDevToolsExtension(navigationRef);

  const isReadyRef = useRef(false);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      detachInactiveScreens>
      <ToastProvider
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NativeBaseProvider>
              <AppWrapper />
            </NativeBaseProvider>
          </PersistGate>
        </Provider>
      </ToastProvider>
    </NavigationContainer>
  );
};

// export default App;
export default Sentry.wrap(App);
