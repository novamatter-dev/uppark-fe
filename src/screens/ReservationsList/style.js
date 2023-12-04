import { Platform, StyleSheet } from "react-native";
import {
  PLATINUM,
  BLUE,
  WHITE,
  BLACK,
  GREY,
} from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
    paddingTop: Platform.OS === "ios" ? "5%" : 0,
    paddingHorizontal: Platform.OS === "ios" ? "8%" : "7%",
    // paddingBottom: "10%",
  },

  //header container
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "15%",
    paddingVertical: 16,

    alignItems: "center",
  },
  headerTitle: {
    color: "black",
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    marginVertical: 8,
  },
  backButton: {
    marginTop: "10%",
    marginLeft: "8%",
    backgroundColor: WHITE,
    height: 60,
    width: 60,
  },
  //tab container
  tabContaienr: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  tabBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    paddingVertical: 12,
  },
  tabLabel: {
    color: BLACK,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
  },
  // reservations list
  reservationsContainer: {
    display: "flex",
    marginTop: "5%",
    // height: "100%",
    borderRadius: 25,
  },

  reservationItem: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderRadius: 20,
    backgroundColor: WHITE,
    marginVertical: 8,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    paddingLeft: 10,
    // paddingVertical: 16,
  },
  detailsWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "70%",
    paddingVertical: 16,
  },
  reservationDetails: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
  },
  extendBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BLUE,
    width: "30%",
    borderBottomEndRadius: 20,
    borderTopEndRadius: 20,
  },
  reservationTime: {
    color: BLACK,
    fontSize: 18,
    fontFamily: "AzoSans-Bold",
  },
  reservationName: {
    color: BLACK,
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    marginHorizontal: 10,
  },
  reservationAddress: {
    color: GREY,
    fontSize: 12,
    fontFamily: "AzoSans-Bold",
    marginHorizontal: 10,
    marginVertical: 8,
  },
  expLabel: {
    color: GREY,
    fontSize: 12,
    fontFamily: "AzoSans-Bold",
    marginHorizontal: 10,
    width: "100%",
  },
  expTime: {
    color: BLUE,
    fontSize: 12,
    fontFamily: "AzoSans-Bold",
    marginHorizontal: 10,
  },
  extendLabel: {
    fontSize: 16,
    color: WHITE,
    fontFamily: "AzoSans-Bold",
    width: "100%",
    textAlign: "center",
  },
  startEndTime: {
    display: "flex",
    backgroundColor: "yellow",
  },
  timeLbale: {
    color: "gray",
    fontFamily: "AzoSans-Bold",
    textAlign: "center",
    fontSize: 14,
  },
  listLabel: {
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    color: GREY,
  },
});

export default style;
