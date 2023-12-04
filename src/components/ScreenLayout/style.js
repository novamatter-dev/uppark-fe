import { Platform, StyleSheet } from "react-native";
import { PLATINUM } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
    paddingHorizontal: Platform.OS === "ios" ? "8%" : "7%",
    justifyContent: "space-between",
    // paddingVertical: "10%",
  },
});

export default style;
