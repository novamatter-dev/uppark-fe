import { StyleSheet } from "react-native";
import { PLATINUM, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    // marginTop: 30,
    padding: 32,
    backgroundColor: PLATINUM,
    justifyContent: "space-between",
  },
  //close btn
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },

  inputContainer: {
    flexDirection: "column",
    marginVertical: 16,
  },

  title: {
    textAlign: "left",
  },

  image: {
    width: 23,
    height: 23,
  },

  baseInput: {
    // marginTop: "6%",
    // height: height * 0.06,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  rowInput: {
    width: "48%",
  },
  toastText: {
    color: "#F5F5F5",
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
  },

  pickerBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: WHITE,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 8,
    width: "100%",
  },
  pickerLabel: {
    width: "70%",
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    marginLeft: 16,
    color: "black",
  },
});

export default style;
