import {Platform, StyleSheet} from 'react-native';
import {
  PLATINUM,
  BLUE,
  WHITE,
  BLACK,
  GREY,
} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: PLATINUM,
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: hp(4.92),
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.95),
  },

  //header container
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '15%',
    // paddingVertical: 16,

    alignItems: 'center',
  },
  headerTitle: {
    color: 'black',
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    marginVertical: 8,
  },
  backButton: {
    backgroundColor: WHITE,
  },
  //tab container
  tabContaienr: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  tabBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    paddingVertical: 12,
  },
  tabLabel: {
    color: BLACK,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
  },
  // reservations list
  reservationsContainer: {
    display: 'flex',
    marginTop: '5%',
    // height: "100%",
    borderRadius: 25,
  },

  reservationItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 20,
    backgroundColor: WHITE,
    marginVertical: 8,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    paddingLeft: 10,
    // paddingVertical: 16,
  },
  detailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '70%',
    paddingVertical: 16,
  },
  reservationDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
  },
  extendBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE,
    width: '30%',
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
  },
  reservationTime: {
    color: BLACK,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Bold',
  },
  reservationName: {
    color: BLACK,
    fontSize: hp(1.97),
    fontFamily: 'AzoSans-Bold',
    marginHorizontal: 10,
  },
  reservationAddress: {
    color: GREY,
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Bold',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  expLabel: {
    color: GREY,
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Bold',
    marginHorizontal: 10,
    width: '100%',
  },
  expTime: {
    color: BLUE,
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Bold',
    marginHorizontal: 10,
  },
  extendLabel: {
    fontSize: hp(1.97),
    color: WHITE,
    fontFamily: 'AzoSans-Bold',
    width: '100%',
    textAlign: 'center',
  },
  startEndTime: {
    display: 'flex',
    backgroundColor: 'yellow',
  },
  timeLbale: {
    color: 'gray',
    fontFamily: 'AzoSans-Bold',
    textAlign: 'center',
    fontSize: hp(1.72),
  },
  listLabel: {
    fontSize: hp(1.97),
    fontFamily: 'AzoSans-Bold',
    color: GREY,
  },
});

export default style;
