import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    GetFCMToken();
  }
}

export async function GetFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken).then(answer => {
          // console.log("new token ", answer);
        });
      } else {
      }
    } catch (error) {
      console.log('push notification token error', error);
    }
  }

  return fcmtoken;
}

export const NotificationListener = handleNotification => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('remoteMessage *****', remoteMessage);
    console.log(
      'Notification caused app to open from background state: ',
      remoteMessage.notification,
      '   / ',
      remoteMessage.data.content,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state: ',
          remoteMessage.notification,
          '   / ',
          remoteMessage.data.content,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    const {notification, title, sentTime, data} = remoteMessage;
    console.log(
      'remoteMessage',
      remoteMessage,
      '    /   ',
      remoteMessage.notification,
    );
    handleNotification({
      modalTitle: notification.title,
      modalBody: notification.body,
      sentTime,
      parkingId: data.parkingId,
      type: data.type,
    });
  });
};
