import {StyleSheet} from 'react-native';
import {BLUE, WHITE} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE,
    width: '100%',
    height: hp(7.38),
    borderRadius: hp(2.95),
    // paddingVertical: 20,
  },
  btnlabel: {
    color: WHITE,
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(1.97),
  },
});
export default style;
