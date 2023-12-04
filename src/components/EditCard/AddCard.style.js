import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "../../helpers/style/constants";

const AddCardStyle = StyleSheet.create({
  safeAreaContainer: {},

  container: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    paddingVertical: 32,
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    // marginVertical: 16,
    justifyContent: "space-between",
  },

  title: {
    textAlign: "left",
  },

  image: {
    width: 23,
    height: 23,
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
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
});

export default AddCardStyle;
