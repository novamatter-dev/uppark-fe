import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "../../helpers/style/constants";

// const { height } = Dimensions.get('window');

const AddCardStyle = StyleSheet.create({
  safeAreaContainer: {
    // flex: 1,
  },

  container: {
    display: "flex",
    // width: "100%",
    height: "100%",
    flexDirection: "column",
    paddingVertical: 32,
    // paddingHorizontal: "10%",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    marginVertical: 16,
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

  invalidLabel: {
    fontSize: 14,
    color: "red",
    fontFamily: "AzoSans-Medium",
    marginTop: 10,
    paddingHorizontal: "10%",
  },
});

export default AddCardStyle;
