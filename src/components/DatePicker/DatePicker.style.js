import { StyleSheet } from "react-native";
import { WHITE, BLACK } from "../../helpers/style/constants";

const DatePickerStyle = StyleSheet.create({
  wrap: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: WHITE,
    padding: 5,
    borderRadius: 20,
    marginTop: 20,
  },

  text: {
    fontFamily: "AzoSans-Bold",
    color: BLACK,
    fontSize: 15,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderRadius: 10,
    padding: 2,
    width: 80,
    height: 40,
    marginRight: 5,
    textAlign: "center",
  },

  separator: {
    width: 20,
    paddingVertical: 5,
  },

  validationText: {
    fontSize: 14,
    color: "red",
    fontFamily: "AzoSans-Bold",
  },
});

export default DatePickerStyle;
