import {StyleSheet} from 'react-native';
import {BLACK, GREY, WHITE} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PaymentConfirmationStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(8.2),
    paddingTop: hp(4.92),
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    marginBottom: hp(20),
  },
  icon: {
    paddingTop: hp(5),
    marginBottom: hp(3),
    width: hp(10),
    height: hp(10),
  },
  title: {
    color: BLACK,
    fontSize: 24,
    fontFamily: 'AzoSans-Bold',
    width: '100%',
    textAlign: 'center',
    lineHeight: 33,
    marginBottom: hp(3),
  },
  content: {
    color: GREY,
    fontSize: 14,
    fontFamily: 'AzoSans-Bold',
    width: '100%',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    bottom: hp(4.92),
  },
});

export default PaymentConfirmationStyle;
