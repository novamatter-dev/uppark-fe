import { StyleSheet } from "react-native";
import { BLUE } from "../../helpers/style/constants";

const nativeBaseButtonStyle = StyleSheet.create({
  button: {
    color: "#FFFFFF",
    backgroundColor: "#3356fe",
    borderRadius: 20,
    height: 65,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  isDisabled: {
    backgroundColor: "#b6b7bf",
  },

  buttonText: {
    fontFamily: "AzoSans-Bold",
    letterSpacing: 1,
    // textAlign: "center",
    // backgroundColor: "red",
    color: "#fff",
    fontSize: 18,
    padding: 3,
    // width: "20%",
  },

  withIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 80,
  },

  iconSpacing: {
    marginHorizontal: 4,
  },

  rightLabel: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLUE,
    letterSpacing: 0.64,
    marginHorizontal: 4,
  },
});

export default nativeBaseButtonStyle;
