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
    };

    await checkForUpates(body)
      .then(answer => {
        // TODO: Maintenance mode
        if (answer?.data?.maintenanceMode) {
          navigation.navigate('Maintenance');
        } else {
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
