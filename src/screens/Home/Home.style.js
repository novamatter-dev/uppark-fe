import { StyleSheet } from "react-native";
import {
  AQUA,
  BLACK,
  BLUE,
  GREY,
  PLATINUM,
  RED,
  WHITE,
} from "../../helpers/style/constants";

const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    // backgroundColor: "red",
    height: "100%",
    display: "flex",
    paddingHorizontal: "8%",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "center",
    height: 90,
    paddingVertical: 15,
  },
  search: {
    height: "100%",
    textAlign: "center",
    // paddingHorizontal: 24,
    zIndex: 3,
    // backgroundColor: "red",
    display: "flex",
    justifyContent: "center",
  },
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    height: 90,
    // paddingVertical: 15,
    zIndex: 100,
  },
  searchInput: {
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    paddingVertical: 3,
    // height: "100%",
    elevation: 0,
  },
  searchInactive: {
    // width: 50,
    // height: 50,
    tintColor: BLUE,
    backgroundColor: WHITE,
    padding: 18,
    borderRadius: 25,
  },
  searchText: {
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    fontFamily: "Azo Sans",
    fontSize: 18,
    fontWeight: "normal",
    backgroundColor: WHITE,
    width: "100%",
  },
  closeSearchIconStyle: {
    height: 30,
    width: 28,
    // backgroundColor: WHITE,
    marginLeft: "5%",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  clearSearchIconStyle: {
    height: 20,
    width: 28,
    backgroundColor: WHITE,
    position: "relative",
    right: 20,
  },
  mapSmall: {
    height: "30%",
    marginBottom: 20,
    // paddingHorizontal: 20,
  },
  mapLarge: {
    height: "55%",
    textAlign: "center",
    marginBottom: 20,
    // paddingHorizontal: 20,
    borderRadius: 24,
  },
  mapText: {
    fontSize: 24,
    textAlign: "center",
  },
  placeDetailsLarge: {
    display: "flex",
    justifyContent: "space-between",
    // height: "30%",
    // paddingHorizontal: 20,
  },
  placeDetailsSmall: {
    display: "flex",
    justifyContent: "flex-start",
    // height: 30,
    // paddingHorizontal: 20,
  },

  absoluteBottom: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    // justifyContent: "flex-end",
    marginTop: 25,
    position: "absolute",
    bottom: "5%",
    paddingHorizontal: "8%",
  },

  parkSubmit: {
    // position: "absolute",
    // bottom: 100,
    // backgroundColor: "red",
    width: "100%",
  },

  confirmPin: {
    position: "absolute",
    bottom: 100,
  },

  rightNav: {
    backgroundColor: WHITE,
    borderRadius: 25,
    borderColor: WHITE,
    paddingLeft: "3%",
  },

  menu: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100%",
    backgroundColor: BLUE,
    paddingHorizontal: 18,
    borderRadius: 25,
    height: 60,
  },

  currentCarButton: {
    backgroundColor: WHITE,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: WHITE,
    marginRight: 10,
    display: "flex",
    justifyContent: "space-between",
  },

  currentCarButtonLabel: {
    fontSize: 12,
    color: GREY,
    fontFamily: "AzoSans-Medium",
    marginBottom: 5,
    // letterSpacing: 2,
  },
  declineTextContainer: {
    position: "absolute",
    bottom: 85,
    left: "10%",
    right: "10%",
    width: "80%",
  },
  declineBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },
  declineText: {
    color: GREY,
    fontSize: 20,
    fontFamily: "AzoSans-Medium",
  },
  licensePlateNumber: {
    fontFamily: "AzoSans-Medium",
    fontSize: 18,
    letterSpacing: 1,
    color: BLACK,
  },
  reservedPakingDescription: {
    fontSize: 16,
    fontWeight: "bold",
    color: GREY,
    marginHorizontal: 0,
  },

  placeDetailsSubtitle: {
    // marginVertical: 10,
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
  },

  //show more btn
  showMoreBtn: {
    width: "100%",
  },
  showMoreContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  showMoreContentText: {
    color: BLUE,
    letterSpacing: 1.24,
    fontSize: 14,
  },
  dummyFill: {
    width: 50,
    height: 10,
  },
  //price text
  priceText: {
    fontSize: 26,
    // marginVertical: 15,
    // fontWeight: "bold",
    fontFamily: "AzoSans-Bold",
  },
  parkingTitle: {},
  //TOAST STYLE
  toastContaier: {
    backgroundColor: "#FF4D4D",
    padding: 16,
    borderRadius: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 25,
    shadowColor: "red",
  },
  toastText: {
    color: "#F5F5F5",
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
  },

  //minipark modal
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBody: {
    width: "80%",
    height: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "AzoSans-Bold",
  },
  modalBtnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BLUE,
    width: "45%",
    paddingVertical: 12,
    borderRadius: 12,
  },
  btnLabel: {
    fontSize: 16,
    color: WHITE,
    fontFamily: "AzoSans-Bold",
  },
  // multiple reservations button
  multipleBtn: {
    display: "flex",
    position: "relative",
    // width: "40%",
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  multipleTxtWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "-50%",
    right: "-5%",
    borderRadius: 20,
    backgroundColor: AQUA,
    width: 24,
    height: 24,
  },
  // outside of a parking spot text
  noParkingSelected: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: RED,
    paddingVertical: 15,
    // paddingHorizontal: 15,
    // borderRadius: 15,
    // position: "absolute",
    // top: "55%",
    // width: "60%",
    // zIndex: 3,
  },
});

export default HomeStyle;
