import { StyleSheet } from "react-native";
import { BLUE, WHITE, BLACK } from "../../../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    backgroundColor: BLACK,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 32,
  },
  title: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  body: {
    color: WHITE,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
  },
  btn: {
    borderRadius: 25,
    backgroundColor: WHITE,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginVertical: 20,
  },
  btnlabel: {
    color: "black",
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 12,
  },
  bodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  btnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtn: {
    marginVertical: 24,
  },
});

export default style;
