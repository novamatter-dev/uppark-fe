import {Platform, StyleSheet} from 'react-native';
import {
  AQUA,
  BLACK,
  BLUE,
  GREY,
  PLATINUM,
  RED,
  WHITE,
} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    height: '100%',
    display: 'flex',
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    position: 'relative',
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: 90,
    paddingVertical: 15,
  },
  search: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  searchWrapper: {
    display: 'flex',
    justifyContent: 'center',
    height: hp(7.38),
    zIndex: 100,
    marginBottom: hp(1.4),
  },
  searchInput: {
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    paddingVertical: 3,
    elevation: 0,
  },
  searchInactive: {
    tintColor: BLUE,
    backgroundColor: WHITE,
  },
  searchText: {
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Azo Sans',
    fontSize: 18,
    fontWeight: 'normal',
    backgroundColor: WHITE,
    width: '100%',
  },
  closeSearchIconStyle: {
    // height: 60,
    width: wp(10.25),
    marginLeft: '5%',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSearchIconStyle: {
    height: 20,
    width: 28,
    backgroundColor: WHITE,
    position: 'relative',
    right: 20,
  },
  mapSmall: {
    marginVertical: hp(1.4),
    flex: 1,
    // marginBottom: 20,
    // paddingHorizontal: 20,
  },
  mapLarge: {
    // height: hp(57.48),
    maxHeight: hp(57.48),
    textAlign: 'center',
    marginVertical: hp(1.4),
    marginBottom: 20,
    // paddingHorizontal: 20,
    borderRadius: hp(2.95),
    position: 'relative',
  },
  mapText: {
    fontSize: 24,
    textAlign: 'center',
  },
  placeDetailsLarge: {
    display: 'flex',
    marginBottom: hp(4.92),
    minHeight: hp(10),
    paddingTop: hp(1.4),
  },
  placeDetailsSmall: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  absoluteBottom: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
    // justifyContent: "flex-end",
    // marginTop: 25,
    // position: 'absolute',
  },

  parkSubmit: {
    // position: "absolute",
    // bottom: 100,
    // backgroundColor: "red",
    width: '100%',
  },

  confirmPin: {
    position: 'absolute',
    bottom: 100,
  },

  rightNav: {
    backgroundColor: WHITE,
    borderRadius: 25,
    borderColor: WHITE,
    paddingLeft: '3%',
  },

  menu: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: "100%",
    backgroundColor: BLUE,
    paddingHorizontal: 18,
    borderRadius: hp(2.95),
    height: hp(7.38),
  },

  currentCarButton: {
    backgroundColor: WHITE,
    padding: 5,
    borderRadius: hp(2.95),
    borderWidth: 1,
    borderColor: WHITE,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },

  currentCarButtonLabel: {
    fontSize: hp(1.47),
    color: GREY,
    fontFamily: 'AzoSans-Medium',
    marginBottom: 5,
    // letterSpacing: 2,
  },
  declineTextContainer: {
    position: 'absolute',
    bottom: 85,
    left: '10%',
    right: '10%',
    width: '80%',
  },
  declineBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  declineText: {
    color: GREY,
    fontSize: 20,
    fontFamily: 'AzoSans-Medium',
  },
  licensePlateNumber: {
    fontFamily: 'AzoSans-Medium',
    fontSize: hp(2.21),
    letterSpacing: 0.72,
    color: BLACK,
  },
  reservedPakingDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GREY,
    marginHorizontal: 0,
  },

  placeDetailsSubtitle: {
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(1.97),
  },

  showMoreBtn: {
    width: '100%',
    display: 'flex',
    height: hp(3),
  },
  showMoreContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  showMoreContentText: {
    color: BLUE,
    letterSpacing: 0.24,
    fontSize: hp(1.47),
  },
  dummyFill: {
    width: 50,
    height: 10,
  },
  //price text
  priceText: {
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
  },
  parkingTitle: {},
  //TOAST STYLE
  toastContaier: {
    backgroundColor: '#FF4D4D',
    padding: 16,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 25,
    shadowColor: 'red',
  },
  toastText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontFamily: 'AzoSans-Medium',
  },

  //minipark modal
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBody: {
    width: '80%',
    height: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'AzoSans-Bold',
  },
  modalBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE,
    width: '45%',
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnLabel: {
    fontSize: hp(1.97),
    color: WHITE,
    fontFamily: 'AzoSans-Bold',
  },
  // multiple reservations button
  multipleBtn: {
    display: 'flex',
    position: 'relative',
    height: hp(4.92),
    backgroundColor: BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(1.97),
    paddingHorizontal: wp(4.1),
  },
  multipleTxtWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '-30%',
    right: '-5%',
    borderRadius: 20,
    backgroundColor: AQUA,
    width: 24,
    height: 24,
  },
  noParkingSelected: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: hp(1.97),
    marginBottom: -50,
  },
  redInfoText: {
    color: BLACK,
    fontFamily: 'AzoSans-Bold',
    fontSize: hp(1.72),
    width: '100%',
    flex: 1,
  },
  bodyWrapper: {
    position: 'relative',
    width: '100%',
    height: hp(75.36),
  },
  warningImage: {
    height: hp(4.31),
    width: wp(10.25),
    marginRight: 10,
  },
  infoTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: hp(1.97),
    fontFamily: 'AzoSans-Medium',
    color: RED,
  },
  leftButton: {
    position: 'absolute',
    bottom: hp(1.97),
    left: hp(1.97),
  },
});

export default HomeStyle;
