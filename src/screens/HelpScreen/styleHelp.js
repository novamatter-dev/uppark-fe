import { StyleSheet } from "react-native";
import { BLACK, PLATINUM, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    height: "100%",
    paddingVertical: 45,
    paddingHorizontal: 32,
    backgroundColor: PLATINUM,
  },
  backBtn: {
    marginVertical: 12,
    backgroundColor: WHITE,
  },
  titleContainer: {
    marginVertical: 12,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
  },
  optionBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 24,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: "black",
    marginHorizontal: 18,
  },
  textComponentWrapper: {
    display: "flex",
    paddingHorizontal: "8%",
    paddingVertical: "5%",
  },
  textComponentContent: {
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "AzoSans-Medium",
    color: BLACK,
  },
});

export default style;
