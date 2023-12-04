import { StyleSheet } from "react-native";
import { BLUE, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    backgroundColor: "#1D1D26",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    color: WHITE,
    fontSize: 26,
    width: "100%",
    textAlign: "center",
    fontFamily: "AzoSans-Bold",
  },
  content: {
    color: WHITE,
    fontSize: 18,
    fontFamily: "AzoSans-Bold",
    width: "100%",
  },
  btn: {
    borderRadius: 25,
    backgroundColor: WHITE,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },

  btnLabel: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default style;
