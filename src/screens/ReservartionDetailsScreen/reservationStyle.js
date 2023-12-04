import { Dimensions, StyleSheet } from "react-native";
import { GREY, BLACK, BLUE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: 32,
    paddingTop: 40,
  },

  backButton: {
    marginBottom: 25,
  },

  //Amount container:
  amountContainer: {
    display: "flex",
    marginVertical: 25,
  },
  greyText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    color: GREY,
    letterSpacing: 0.24,
  },
  amountText: {
    fontSize: 26,
    color: "black",
    fontFamily: "AzoSans-Bold",
    marginVertical: 5,
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

  bigBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 26,
    color: BLACK,
    letterSpacing: 1,
    fontWeight: "bold",
    marginVertical: 5,
  },

  mediumBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLACK,
    letterSpacing: 0.24,
    paddingTop: 4,
    fontWeight: "bold",
  },

  smallBoldText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    color: BLACK,
    letterSpacing: 0.24,
  },

  //floating button
  floatingContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    // width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  floatingBnt: {
    width: 330,
    paddingVertical: 20,
  },

  pdfContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  savePdf: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLUE,
    letterSpacing: 0.24,
  },
});

export default style;
