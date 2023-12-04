import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  conatienr: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: WHITE,
    borderRadius: 25,
    width: "100%",
    marginBottom: 8,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 23,
    paddingHorizontal: 25,
    width: "20%",
  },
  input: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    width: "80%",
    color: BLACK,
  },
});

export default style;
