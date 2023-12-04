import { StyleSheet } from "react-native";
import { BLUE, WHITE } from "../../helpers/style/constants";

export const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BLUE,
    width: "100%",
    borderRadius: 25,
    paddingVertical: 20,
  },
  btnlabel: {
    color: WHITE,
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
  },
});
export default style;
