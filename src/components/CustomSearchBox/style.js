import {StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  conatienr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: hp(2.95),
    width: '100%',
    height: hp(8.86),
    padding: 12,
    backgroundColor: WHITE,
    marginTop: hp(1.97),
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 23,
    // paddingHorizontal: 25,
    width: '15%',
  },
  input: {
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    width: '80%',
    color: BLACK,
  },
});

export default style;
