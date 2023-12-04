import { StyleSheet } from "react-native";
import { WHITE, PLATINUM, BLACK } from "../../helpers/style/constants";

const AddLicenseStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    padding: 35,
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    width: 310,
    textAlign: "left",
    paddingTop: 10,
    fontSize: 26,
  },
  baseInput: {
    height: 64,
    width: 326,
    marginTop: "5%",
    marginLeft: "23%",
    marginBottom: "50%",
  },
  closeButton: {
    height: 60,
    width: 60,
    backgroundColor: WHITE,
    marginLeft: "77%",
    borderRadius: 20,
    marginTop: "10%",
  },
  closeButtonImage: {
    height: 20,
    width: 20,
    marginTop: "35%",
    marginLeft: "35%",
  },
  licenseIconStyle: {
    height: 28,
    width: 35,
    backgroundColor: WHITE,
    marginLeft: "2%",
  },
  confirmButton: {
    // marginTop: "105%",
    // flex: 1,
  },
});

export default AddLicenseStyle;
