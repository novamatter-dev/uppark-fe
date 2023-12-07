import {StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    height: hp(7.88),
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    width: '100%',
    justifyContent: 'space-between',
  },
  leftIconContainer: {
    // width: "10%",
  },
  customInput: {
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    marginLeft: 16,
    color: BLACK,
    width: '80%',
  },
});

export default style;
