import { StyleSheet } from "react-native";
import { PLATINUM, WHITE } from "../../../../helpers/style/constants";

const DatePickerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
  },
  button: {
    marginTop: "10%",
    height: 70,
    width: 350,
    borderRadius: 25,
    marginLeft: "5%",
  },
  datePicker: {
    marginTop: "60%",
    height: 120,
    width: 350,
    borderRadius: 25,
    marginLeft: "3%",
  },
  closeButton: {
    height: 60,
    width: 60,
    backgroundColor: WHITE,
    borderRadius: 20,
    marginTop: "12%",
    marginLeft: "80%",
  },
  closeButtonImage: {
    height: 20,
    width: 20,
    marginTop: "35%",
    marginLeft: "35%",
  },
});

export default DatePickerStyle;
