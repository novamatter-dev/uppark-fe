import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useCheckForUpdatesMutation} from '../services/notifications';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const useMaintenanceMode = () => {
  const [checkForUpates] = useCheckForUpdatesMutation();

  const {jwt} = useSelector(state => state.auth);

  const navigation = useNavigation();

  const checkMaintenanceMode = async () => {
    const appVer = DeviceInfo.getVersion();
    const body = {
      platform: Platform.OS.toUpperCase(),
      clientVersion: appVer,
      // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
      source: 'UPPARK', // 'UPPARK'
    };

    await checkForUpates(body)
      .then(answer => {
        // TODO: Maintenance mode
        if (answer?.data?.maintenanceMode) {
          console.log('check for updates go to maintenance');
          navigation.navigate('Maintenance');
        } else {
          console.log('check for updates else');
          if (jwt) {
            navigation.navigate('HomeDrawer');
          } else {
            navigation.navigate('Login');
          }
        }
      })
      .catch(err => {
        console.log('checkForUpates err: ', err);
      });
  };

  return {
    checkMaintenanceMode,
  };
};
