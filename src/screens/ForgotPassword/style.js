import { StyleSheet } from "react-native";
import { PLATINUM } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingVertical: 32,
    paddingHorizontal: "10%",
    backgroundColor: PLATINUM,
  },
  inputsContainer: {
    marginTop: 32,
  },
  inputItem: {
    marginVertical: 8,
  },
  btnContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    paddingHorizontal: "10%",
  },
});

export default style;
