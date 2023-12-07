import {Platform, StyleSheet} from 'react-native';
import {PLATINUM, WHITE, BLACK} from '../../../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PaymentOptionsStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },

  exitButton: {
    backgroundColor: WHITE,
    alignSelf: 'flex-end',
  },

  icon: {
    width: 24,
    height: 24,
  },

  nativeButtonStyle: {
    backgroundColor: PLATINUM,
    height: 64,
    marginTop: 5,
  },

  nativeBaseLabelStyle: {
    fontSize: 16,
    color: BLACK,
    width: 320,
    textAlign: 'left',
    paddingHorizontal: 10,
  },

  title: {
    // marginTop: 24,
  },
});

export default PaymentOptionsStyle;
