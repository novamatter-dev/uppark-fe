import {StyleSheet, Dimensions, Platform} from 'react-native';
import {
  BLUE,
  BLACK,
  WHITE,
  GREY,
  PLATINUM,
} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ProfileStyle = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: PLATINUM,
  },
  carsListContainer: {
    width: '100%',
    display: 'flex',
    height: hp(50),
    paddingTop: 0,
  },
  buttonsContainer: {
    paddingTop: hp(1.97),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: WHITE,
    borderBottomLeftRadius: hp(2.95),
    borderBottomRightRadius: hp(2.95),
    height: hp(32.06),
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  tabText: {
    fontSize: hp(1.97),
    fontFamily: 'Azo Sans',
    marginTop: '15%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  selectedText: {
    fontSize: hp(1.97),
    fontFamily: 'Azo Sans',
    marginTop: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: WHITE,
  },
  button: {
    backgroundColor: PLATINUM,
    padding: 10,
    marginHorizontal: 10,
    width: hp(11.82),
    height: hp(11.82),
    borderRadius: hp(2.95),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: BLUE,
    padding: 10,
    marginHorizontal: 10,
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: PLATINUM,
    // height: 60,
    // width: 60,
  },
  screenContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PLATINUM,
    paddingHorizontal: '10%',
    paddingTop: hp(2.95),
  },

  addCarBtnBox: {
    flex: 1,
    alignItems: 'center',
    // paddingHorizontal: 100,
    paddingHorizontal: wp(8.2),
    // justifyContent: "flex-end",
    // marginTop: "auto",
    // marginBottom: 36,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingVertical: hp(2.21),
  },

  carEntry: {
    // backgroundColor: WHITE,
    // height: 100,
    // borderRadius: 24,
    // // marginTop: 20,
    // width: "100%",
  },

  iconSpacing: {
    marginHorizontal: 0,
  },

  labelStyle: {
    color: GREY,
    textTransform: 'none',
    textAlign: 'left',
    padding: 0,
    marginRight: 32,
    paddingHorizontal: 10,
  },
  exitButton: {
    backgroundColor: WHITE,
    alignSelf: 'flex-end',
  },

  //history container
  historyContainer: {
    display: 'flex',
    alignItems: 'center',
    height: '70%',
    width: '100%',
    paddingTop: 13,
  },
  historyItem: {
    width: '100%',
    display: 'flex',
  },
  flatList: {
    width: '100%',
    display: 'flex',
  },
});

export default ProfileStyle;
