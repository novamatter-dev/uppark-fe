import {Platform, StyleSheet} from 'react-native';
import {
  GREY,
  PLATINUM,
  BLUE,
  WHITE,
  BLACK,
} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ParkFromScreenStyle = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: PLATINUM,
    height: '100%',
    display: 'flex',
    // justifyContent: 'space-between',
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  title: {
    textAlign: 'left',
    width: '80%',
    marginVertical: hp(2.95),
    // paddingHorizontal: '10%',
    // fontSize: 26,
  },
  listContainer: {
    backgroundColor: PLATINUM,
    // paddingHorizontal: '10%',
    width: '100%',
  },
  priceContainer: {
    backgroundColor: WHITE,
    position: 'absolute',
    // marginTop: '10%',
    // marginTop: "auto",
    borderRadius: hp(2.95),
    bottom: 0,
    width: wp(100),
  },
  sliderContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: BLUE,
    borderTopRightRadius: hp(2.95),
    borderTopLeftRadius: hp(2.95),
    alignContent: 'center',
    marginTop: hp(4.92),
    paddingHorizontal: wp(8.2),
    paddingBottom: hp(4.92),
    paddingTop: hp(7.88),
  },
  backButton: {
    // marginTop: Platform.OS === 'ios' ? '10%' : '5%',
    // marginLeft: '10%',
    // marginTop: '5%',
    backgroundColor: WHITE,
  },

  text: {
    color: GREY,
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Medium',
    marginTop: hp(2.95),
  },
  confirmButton: {
    backgroundColor: WHITE,
  },
  confrimButtonLabel: {
    color: BLACK,
    fontWeight: 'bold',
  },
  timeSlotText: {
    color: GREY,
    fontWeight: 'normal',
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Medium',
    // marginLeft: '8%',
    marginTop: '10%',
  },
  availableZones: {
    color: GREY,
    fontWeight: 'normal',
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Medium',
    // marginLeft: '8%',
  },
  timeText: {
    color: BLACK,
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    // marginLeft: '8%',
    paddingTop: 15,
    width: 120,
  },
  equalsText: {
    color: GREY,
    fontSize: hp(2.95),
    fontFamily: 'AzoSans-Medium',
    marginLeft: '8%',
    marginTop: '4%',
    marginRight: '7%',
  },
  toBePaidText: {
    color: GREY,
    fontWeight: 'normal',
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Medium',
    marginTop: '10%',
    marginLeft: '40%',
  },
  ammountText: {
    color: BLACK,
    fontSize: 26,
    fontFamily: 'AzoSans-Bold',
    paddingTop: 15,
  },
  textBox: {
    flexDirection: 'row',
    paddingHorizontal: wp(8.2),
  },
  ownTimeText: {
    color: WHITE,
    fontWeight: 'normal',
    fontSize: hp(1.47),
    fontFamily: 'Azo Sans',
    marginTop: '5%',
    alignSelf: 'center',
  },
  timeBtn: {
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    width: wp(25.64),
    // height: hp(12.31),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  timeTitle: {
    fontSize: hp(1.97),
    fontFamily: 'AzoSans-Bold',
  },

  flatList: {
    // marginTop: '5%',
  },

  confirmBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    // padding: 35,
  },
  productsWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    height: hp(12.31),
    marginTop: hp(1.97),
  },
});

export default ParkFromScreenStyle;
