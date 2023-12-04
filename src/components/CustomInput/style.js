import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: WHITE,
    borderRadius: 25,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 8,
    width: "100%",
    justifyContent: "space-between",
  },
  leftIconContainer: {
    // width: "10%",
  },
  customInput: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    marginLeft: 16,
    color: BLACK,
    width: "80%",
  },
});

export default style;
