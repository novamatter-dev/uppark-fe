import { head } from "lodash";
import { StyleSheet } from "react-native";
import { PLATINUM, BLUE } from "../../helpers/style/constants";

const codeSmsStyle = StyleSheet.create({
  title: {
    fontFamily: "AzoSans-Bold",
    color: "black",
    fontSize: 32,
  },

  modalBg: {
    display: "flex",
    backgroundColor: PLATINUM,
    width: "100%",
  },

  imgContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",
    // paddingTop: 16,
  },
  backLabel: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLUE,
    textTransform: "uppercase",
    marginRight: 10,
  },
});

export default codeSmsStyle;
