import { StyleSheet } from "react-native";
import { PLATINUM, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
    paddingVertical: 32,
    paddingHorizontal: "5%",
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },
  titleWrapper: {
    marginVertical: 24,
  },
  body: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  buttonsWrapper: {
    position: "absolute",
    bottom: "5%",
    display: "flex",
    width: "100%",
  },
});

export default style;
