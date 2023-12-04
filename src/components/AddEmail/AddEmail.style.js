import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "../../helpers/style/constants";

// const { height } = Dimensions.get('window');

const AddEmailStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: 30,
    padding: 0,
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
    paddingTop: 24,
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
    marginTop: "6%",
    // height: height * 0.06,
  },
});

export default AddEmailStyle;
