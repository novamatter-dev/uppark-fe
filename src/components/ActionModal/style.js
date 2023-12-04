import { StyleSheet } from "react-native";

import { WHITE, BLACK } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: BLACK,
    padding: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 26,
    color: WHITE,
    fontFamily: "AzoSans-Bold",
    textAlign: "center",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 24,
    marginTop: 24,
  },
  btnLabel: {
    fontSize: 16,
    color: BLACK,
    fontFamily: "AzoSans-Bold",
  },
});
export default style;
