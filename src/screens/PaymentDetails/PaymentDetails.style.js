import { Platform, StyleSheet } from "react-native";
import {
  BLACK,
  PLATINUM,
  WHITE,
  GREY,
  BLUE,
} from "../../helpers/style/constants";

const PaymentDetailsStyle = StyleSheet.create({
  container: {
    // padding: 30,
    flex: 1,
    backgroundColor: PLATINUM,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "ios" ? "10%" : "5%",
    paddingTop: "12%",
    paddingHorizontal: "10%",
  },

  title: {
    fontSize: 26,
    marginTop: 24,
    fontWeight: "bold",
    fontFamily: "AzoSans-Medium",
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
    borderRadius: 24,
  },

  icon: {
    height: 24,
    width: 24,
  },

  cardText: {
    fontSize: 16,
    color: BLACK,
    width: 220,
    textAlign: "left",
  },

  grayText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    color: GREY,
    letterSpacing: 0.24,
    marginBottom: 6,
  },

  optionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  paymentOptionsContainer: {
    marginTop: "auto",
    width: "48%",
  },

  mediumBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 18,
    color: BLACK,
    letterSpacing: 0.24,
  },

  bigBoldText: {
    textAlign: "right",
    fontFamily: "AzoSans-Bold",
    fontSize: 26,
    color: BLACK,
    letterSpacing: 1,
    // width: 100,
    fontWeight: "bold",
    zIndex: 1,
  },

  bottomTextContainer: {
    display: "flex",

    marginVertical: "8%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 20,
    // width: 155,
    width: "100%",
    height: 60,
  },

  contentText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  ctaText: {
    color: BLUE,
    fontSize: 16,
  },

  // card missing modal
  missingCardContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: BLUE,
    padding: 20,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  missingCardTitle: {
    color: WHITE,
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    width: "100%",
    textAlign: "center",
  },
  missingCardBtn: {
    width: "90%",
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderRadius: 20,
  },
  missingBtnLabel: {
    color: BLUE,
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    width: "100%",
    textAlign: "center",
  },
  disclaimerTxt: {
    fontSize: 12,
    color: GREY,
    width: "100%",
    fontFamily: "AzoSans-Medium",
    textAlign: "center",
    marginTop: 8,
  },
});

export default PaymentDetailsStyle;
