import {StyleSheet, Dimensions, Platform} from 'react-native';
import {WHITE, BLACK, BLUE} from '../../../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CarDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },

  boxContainer: {
    height: hp(66),
    overflow: 'hidden',
    // backgroundColor: "red",
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: hp(2.95),
    // margin: 30,
  },

  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: WHITE,
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  carContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: WHITE,
    // borderRadius: 24,
    // height: 64,
    // // marginVertical: Dimensions.get("window").height * 0.05,
    // marginVertical: 8,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 24,
    height: 64,
  },
  carInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  carText: {
    fontFamily: 'AzoSans-Medium',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: BLACK,
    fontSize: hp(2.21),
    paddingHorizontal: 10,
    // width: 250,
  },

  optionsText: {
    fontFamily: 'AzoSans-Medium',
    letterSpacing: 1,
    textAlign: 'left',
    color: BLACK,
    fontSize: hp(2.21),
    height: 64,
    width: 250,
    paddingLeft: Dimensions.get('window').width * 0.07,
  },

  binIcon: {
    width: 25,
    height: 25,
  },

  saveButton: {
    backgroundColor: BLUE,
    marginTop: Dimensions.get('window').height * 0.12,
    height: 65,
    borderRadius: 30,
  },

  baseInput: {
    paddingTop: 10,
    marginBottom: 10,
  },

  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
    borderRadius: hp(2.95),
    padding: 20,
    marginVertical: 8,
    height: hp(7.88),
    width: wp(100),
  },
  itemName: {
    color: BLACK,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    width: '35%',
    height: hp(10),
  },
  itemShortName: {
    color: BLACK,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    width: '40%',
    textAlign: 'center',
    // marginLeft: 16,
  },
});

export default CarDetailsStyle;
