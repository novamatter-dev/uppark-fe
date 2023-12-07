import {Platform, StyleSheet} from 'react-native';
import {
  BLACK,
  PLATINUM,
  WHITE,
  GREY,
  BLUE,
} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PaymentDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
    flexDirection: 'column',
    // justifyContent: "space-between",
    paddingHorizontal: wp(8.2),
    paddingTop: hp(4.92),
  },

  title: {
    marginTop: hp(2.95),
  },

  backButton: {
    backgroundColor: WHITE,
  },

  payButton: {
    height: 60,
    marginTop: 24,
  },

  paymentOptionsButton: {
    backgroundColor: WHITE,
    height: 64,
    borderRadius: hp(2.95),
  },

  icon: {
    height: hp(2.5),
    width: hp(2.5),
    marginRight: 10,
  },

  cardText: {
    fontSize: hp(1.97),
    color: BLACK,
    width: 220,
    textAlign: 'left',
  },

  grayText: {
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(1.47),
    color: GREY,
    letterSpacing: 0.24,
    marginBottom: 6,
  },

  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  paymentOptionsContainer: {
    marginTop: 'auto',
    width: wp(39.74),
  },

  mediumBoldText: {
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(2.21),
    color: BLACK,
    letterSpacing: 0.24,
  },

  bigBoldText: {
    textAlign: 'right',
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(3.2),
    color: BLACK,
    letterSpacing: 1,
    // width: 100,
    fontWeight: 'bold',
    zIndex: 1,
  },

  bottomTextContainer: {
    display: 'flex',

    marginVertical: '8%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: hp(2.95),
    width: '100%',
    height: hp(7.88),
  },

  contentText: {
    color: 'black',
    fontSize: hp(1.97),
    fontWeight: 'bold',
  },
  ctaText: {
    color: BLUE,
    fontSize: hp(1.97),
  },

  // card missing modal
  missingCardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: BLUE,
    padding: 20,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  missingCardTitle: {
    color: WHITE,
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    width: '100%',
    textAlign: 'center',
  },
  missingCardBtn: {
    width: '90%',
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
  missingBtnLabel: {
    color: BLUE,
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    width: '100%',
    textAlign: 'center',
  },
  disclaimerTxt: {
    fontSize: hp(1.47),
    color: GREY,
    width: '100%',
    fontFamily: 'AzoSans-Medium',
    textAlign: 'center',
    // marginTop: 8,
  },
  disclaimerTxt: {
    fontSize: hp(1.47),
    color: GREY,
    width: '100%',
    fontFamily: 'AzoSans-Medium',
    height: hp(4.92),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    // backgroundColor: "red",
    paddingTop: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});

export default PaymentDetailsStyle;
