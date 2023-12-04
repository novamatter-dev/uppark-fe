import { StyleSheet } from "react-native";
import { BLUE, GREY } from "../../../helpers/style/constants";

const SliderStyle = StyleSheet.create({
  minuteView: {
    height: 10,
    width: 10,
    backgroundColor: GREY,
    borderRadius: 30,
  },
  hourView: {
    height: 25,
    width: 5,
    backgroundColor: GREY,
    borderRadius: 30,
  },
  container: {
    paddingTop: 25,
    flexDirection: "column",
    alignItems: "center",
    display: "flex",
  },
  wrapperVertical: {
    // width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "auto",
    color: "black",
    width: 330,
  },
  OptionWrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderWidth: 3,
    borderRadius: 10,
    width: 3,
  },
  selectedOption: {
    height: 50,
    width: 7,
    backgroundColor: "#45E6B0",
    borderRadius: 30,
  },
});

export default SliderStyle;
