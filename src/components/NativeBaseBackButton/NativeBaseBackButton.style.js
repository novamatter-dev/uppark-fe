import {StyleSheet} from 'react-native';
import {PLATINUM} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const nativeBaseBackButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: PLATINUM,
    borderRadius: hp(2.95),
    justifyContent: 'center',
    width: hp(7.38),
    height: hp(7.38),
  },

  icon: {
    margin: 4,
    color: '#3356FF',
  },
});

export default nativeBaseBackButtonStyle;
