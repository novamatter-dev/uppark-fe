import {useUpdateFcmTokenMutation} from '../services/notifications';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export function useFcmTokenUpdater() {
  const [updateToken] = useUpdateFcmTokenMutation();

  const updateFcmToken = async newToken => {
    try {
      let fcmtoken = await messaging().getToken();

      console.log({fcmtoken});

      if (fcmtoken) {
        await AsyncStorage.setItem('fcmtoken', fcmtoken).then(answer => {
          // console.log('new token ', answer);
        });

        const id = await DeviceInfo.getUniqueId();
        const body = {
          newFirbaseToken: fcmtoken,
          deviceId: id,
        };
        await updateToken(body)
          .then(answer => {
            // console.log('updateToken answer >>> ', answer);
          })
          .catch(err => {
            console.log('Error updateToken: ', err);
          });
      } else {
        console.log('Error while getting fcm token');
      }
    } catch (error) {
      console.log('push notification token error', error);
    }
  };

  return {
    updateFcmToken,
  };
}
