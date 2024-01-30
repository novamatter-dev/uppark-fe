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
    console.log(appVer)
    const body = {
      platform: Platform.OS.toUpperCase(),
      clientVersion: appVer,
      // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
      source: 'UPPARK', // 'UPPARK'
    };

    console.log(body)

    await checkForUpates(body)
      .then(answer => {
        // TODO: Maintenance mode
        // TOOD: SOLVE IN THE NEXT UPDATE, IN THE 1.2.1 VERSION THE MAINTENANCE MODE IS NEGATED
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
