import { StyleSheet } from "react-native";
import { BLACK } from "../../helpers/style/constants";

const style = StyleSheet.create({
  textComponentWrapper: {
    display: "flex",
    paddingHorizontal: "8%",
    paddingVertical: "10%",
  },
  textComponentContent: {
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "AzoSans-Medium",
    color: BLACK,
  },
});

export default style;
