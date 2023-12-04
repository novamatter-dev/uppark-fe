import { StyleSheet } from "react-native";
import { BLUE, ORANGE, PLATINUM } from "../helpers/style/constants";

const NavigationStyle = StyleSheet.create({
  navContainer: {},
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  linkText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    fontWeight: "bold",
    color: PLATINUM,
    paddingHorizontal: 17,
    width: "100%",
  },
  linkImg: {
    width: 20,
    height: 20,
    tintColor: BLUE,
  },
  logOutContainer: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: "50%",
    height: "100%",
  },
  logOutImg: {
    width: 20,
    height: 20,
    tintColor: ORANGE,
  },
});

export default NavigationStyle;
