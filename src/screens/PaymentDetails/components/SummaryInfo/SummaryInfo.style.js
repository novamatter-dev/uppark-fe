import { StyleSheet } from "react-native";
import { BLACK, GREY, BLUE } from "../../../../helpers/style/constants";

const SummaryInfoStyle = StyleSheet.create({
  container: {
    flexDirection: "column",
    // padding: 32,
    // marginTop: 20,
  },

  greyText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    color: GREY,
    letterSpacing: 0.24,
  },

  bigBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 26,
    color: BLACK,
    letterSpacing: 1,
    marginVertical: 5,
  },

  mediumBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLACK,
    letterSpacing: 0.24,
    paddingTop: 4,
  },

  smallBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    color: BLACK,
    letterSpacing: 0.24,
  },

  licensePlateText: {
    // paddingEnd: 20,
    paddingTop: 4,
    letterSpacing: 0.24,
    fontSize: 16,
    textTransform: "uppercase",
    color: BLUE,
    fontFamily: "AzoSans-Bold",
  },

  iconAlignment: {
    alignItems: "center",
    // marginTop: 28,
    alignSelf: "center",
    // marginHorizontal: 40,
  },

  //time container

  timeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    marginVertical: 45,
  },
  startTimeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    paddingRight: 20,
  },
  item: {
    display: "flex",
    flexDirection: "column",
  },

  //info box
  infoBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoItem: {
    width: "50%",

    display: "flex",
    flexDirection: "column",
    height: 100,
  },
});

export default SummaryInfoStyle;
