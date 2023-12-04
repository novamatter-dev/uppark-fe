import { StyleSheet } from "react-native";
import { PLATINUM, BLUE } from "../../helpers/style/constants";

const modalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    top: 10,
    height: "100%",
    width: "100%",
    margin: 20,
    backgroundColor: PLATINUM,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fullScreenView: {
    marginTop: 0,
  },
  fullScreenModalView: {
    margin: 0,
    top: 0,
    borderRadius: 0,
    padding: 0,
    alignItems: "stretch",
  },
  notification: {
    position: "absolute",
    bottom: 0,
    height: "70%",
    width: "100%",
    backgroundColor: BLUE,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default modalStyle;
