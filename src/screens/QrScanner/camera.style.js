import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  camera: {
    flex: 1
  },

  //loading container
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "red"
  },
  loadingText: {
    color: "black",
    fontSize: 16,
  },
  //back button
  backBtnContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? "7%" : "5%",
    left: "8%",
    zIndex: 1,
    backgroundColor:"red"
  },
});

export default style;
