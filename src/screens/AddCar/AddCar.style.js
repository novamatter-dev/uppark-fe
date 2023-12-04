import { StyleSheet } from "react-native";
import { WHITE, BLACK, PLATINUM, GREY } from "../../helpers/style/constants";

const AddCarStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    paddingVertical: 32,
    paddingHorizontal: "10%",
    backgroundColor: PLATINUM,
  },

  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 24,
  },

  title: {
    textAlign: "left",
    marginBottom: 20,
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },

  baseInput: {
    marginTop: 20,
    width: "100%",
  },
  propBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 24,
    backgroundColor: WHITE,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  propBtnLabel: {
    marginHorizontal: 16,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: GREY,
  },
  detailsBtn: {
    // width: 330,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 20,
    marginVertical: 8,
  },
  btnLabel: {
    fontSize: 18,
    color: BLACK,
    fontFamily: "AzoSans-Medium",
    marginLeft: 17,
  },

  // modal container
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

export default AddCarStyle;
