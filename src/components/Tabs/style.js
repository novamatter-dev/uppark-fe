import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal: "10%",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "47%",
    paddingVertical: 10,
    borderRadius: 16,
  },
  btnLabel: {
    fontSize: 16,
    fontFamily: "AzoSans-Medium",
    color: WHITE,
  },
});

export default style;
