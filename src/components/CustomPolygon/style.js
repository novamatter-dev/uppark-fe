import { StyleSheet } from "react-native";
import { WHITE, RED, BLUE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  //modal Style
  modalContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    padding: 32,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "AzoSans-Bold",
    color: WHITE,
  },
  modalBtnContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 20,
    borderRadius: 24,
    marginVertical: 5,
  },
  btnLabel: {
    fontSize: 16,
    color: "black",
    fontFamily: "AzoSans-Bold",
  },
  modalCancelBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    paddingVertical: 20,
    borderRadius: 24,
  },
  btnCancelLabel: {
    fontSize: 16,
    color: RED,
    fontFamily: "AzoSans-Bold",
  },
});
export default style;
