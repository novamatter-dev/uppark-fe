import { StyleSheet } from "react-native";
import { BLUE, WHITE, PLATINUM } from "../../../../helpers/style/constants";

const LoginPhoneStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: "10%",
    paddingHorizontal: "10%",
    height: "80%",
    width: "100%",
    backgroundColor: PLATINUM,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //header container
  headerContainer: {
    display: "flex",
    width: "100%",
    // paddingRight: "20%",
  },
  //inputs
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  textInput: {
    display: "flex",
    position: "relative",
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    // padding: 20,
    // width: 200,
    width: "80%",
  },
  dissmissKeyboardContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    // height: "100%",
    marginVertical: 40,
  },
  switchToEmailBtn: {
    padding: 5,
    marginBottom: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    color: BLUE,
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "AzoSans-Medium",
  },
  confirmBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    // width: "100%",
    backgroundColor: BLUE,
    borderRadius: 24,
    width: 320,
  },
  confirmlabel: {
    fontSize: 20,
    color: WHITE,
  },
});

export default LoginPhoneStyle;
