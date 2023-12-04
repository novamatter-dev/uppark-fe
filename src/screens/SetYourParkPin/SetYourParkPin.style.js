import { StyleSheet } from "react-native";
import { BLACK, GREY, PLATINUM } from "../../helpers/style/constants";

const SetYourPinStyle = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    paddingHorizontal: "10%",
    paddingVertical: "10%",
    backgroundColor: PLATINUM,
  },
  content: {
    // height: "85%",
  },

  title: {
    textAlign: "left",
    fontSize: 20,
    paddingVertical: 12,
  },
  mapLarge: {
    height: "55%",
    textAlign: "center",
    marginBottom: 20,
  },

  mapSmall: {
    height: 300,
    // marginBottom: 20,
    borderRadius: 24,
  },
  placeDetailsSubtitle: {
    // marginVertical: 10,
    fontFamily: "AzoSans-Bold",
    fontSize: 18,
    color: BLACK,
    marginTop: 16,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // height: "15%",
  },

  declineBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
  declineText: {
    color: GREY,
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
  },
});

export default SetYourPinStyle;
