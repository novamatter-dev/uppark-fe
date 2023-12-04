import { StyleSheet, Dimensions } from "react-native";
import { WHITE, BLACK } from "../../helpers/style/constants";

// const { height } = Dimensions.get('window');

const AddBusinessStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 30,
    marginTop: 30,
    padding: 0,
    paddingTop: 20,
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
    marginVertical: 8,
  },

  detailsBtn: {
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
  //floating button
  floatingContainer: {
    // position: "absolute",
    // bottom: 30,
    // left: 0,
    // right: 0,
    // width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 30,
  },
});

export default AddBusinessStyle;
