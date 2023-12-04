import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";

const BasicInputStyle = StyleSheet.create({
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: WHITE,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 8,
  },

  icon: {
    marginLeft: 10,
  },
  textInput: {
    width: "70%",
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    marginLeft: 16,
    color: "black",
  },
  rightIcon: {
    position: "absolute",
    // top: "50%",
    right: "8%",
  },
});

export default BasicInputStyle;
