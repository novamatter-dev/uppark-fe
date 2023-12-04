import { Platform, StyleSheet } from "react-native";
import {
  GREY,
  PLATINUM,
  BLUE,
  WHITE,
  BLACK,
} from "../../helpers/style/constants";

const ParkFromScreenStyle = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: PLATINUM,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? "8%" : "5%",
  },
  title: {
    textAlign: "left",
    paddingHorizontal: "10%",
    fontSize: 26,
  },
  listContainer: {
    backgroundColor: PLATINUM,
    paddingHorizontal: "10%",
    width: "100%",
  },
  priceContainer: {
    backgroundColor: WHITE,
    marginTop: "10%",
    borderRadius: 20,
  },
  sliderContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    backgroundColor: BLUE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignContent: "center",
    marginTop: "5%",
    paddingHorizontal: "10%",
    paddingBottom: "15%",
    paddingTop: "15%",
  },
  backButton: {
    marginTop: Platform.OS === "ios" ? "10%" : "5%",
    marginLeft: "10%",
    marginTop: "5%",
    backgroundColor: WHITE,
  },

  text: {
    color: GREY,
    fontSize: 12,
    fontFamily: "AzoSans-Medium",
    marginTop: "5%",
  },
  confirmButton: {
    backgroundColor: WHITE,
  },
  confrimButtonLabel: {
    color: BLACK,
    fontWeight: "bold",
  },
  timeSlotText: {
    color: GREY,
    fontWeight: "normal",
    fontSize: 12,
    fontFamily: "AzoSans-Medium",
    // marginLeft: '8%',
    marginTop: "10%",
  },
  availableZones: {
    color: GREY,
    fontWeight: "normal",
    fontSize: 12,
    fontFamily: "AzoSans-Medium",
    // marginLeft: '8%',
  },
  timeText: {
    color: BLACK,
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    // marginLeft: '8%',
    paddingTop: 15,
    width: 120,
  },
  equalsText: {
    color: GREY,
    fontSize: 24,
    fontFamily: "AzoSans-Medium",
    marginLeft: "8%",
    marginTop: "4%",
    marginRight: "7%",
  },
  toBePaidText: {
    color: GREY,
    fontWeight: "normal",
    fontSize: 12,
    fontFamily: "AzoSans-Medium",
    marginTop: "10%",
    marginLeft: "40%",
  },
  ammountText: {
    color: BLACK,
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    paddingTop: 15,
  },
  textBox: {
    flexDirection: "row",
    paddingHorizontal: "10%",
  },
  ownTimeText: {
    color: WHITE,
    fontWeight: "normal",
    fontSize: 12,
    fontFamily: "Azo Sans",
    marginTop: "5%",
    alignSelf: "center",
  },
  timeBtn: {
    backgroundColor: WHITE,
    marginLeft: 10,
    // paddingVertical: 30,
    // paddingHorizontal: 29,
    borderRadius: 24,
    width: 80,
    height: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  timeTitle: {
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
  },

  flatList: {
    marginTop: "5%",
  },

  confirmBtnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    // padding: 35,
  },
  productsWrapper: {
    display: "flex",
    width: "100%",
    height: 100,
  },
});

export default ParkFromScreenStyle;
