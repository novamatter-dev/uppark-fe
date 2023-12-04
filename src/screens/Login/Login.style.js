import { StyleSheet } from "react-native";
import { BLUE, PLATINUM, RED, WHITE } from "../../helpers/style/constants";

const LoginStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  SafeAreaView1: { backgroundColor: "transparent", flex: 0 },
  SafeAreaView2: { flex: 1, backgroundColor: "#FFF" },
  outerWrapper: {
    // flex: 1,
    display: "flex",

    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  // modal container
  modalContainer: {
    height: "85%",
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

    // justifyContent: "space-between",
  },

  buttonStyle: {
    // backgroundColor: "#EEE",
    paddingHorizontal: 40,
    paddingVertical: 30,
    borderWidth: 0.5,
    borderColor: "#F0F0F0",
    borderRadius: 10,
  },
  text: { fontSize: 18, color: "#808080", fontWeight: "bold" },

  imgContainer: {
    flex: 1,
  },
  image: {
    display: "flex",
    // justifyContent: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  imgText: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },

  bgModal: {},

  touchableToggleLogin: {
    textAlign: "right",
    color: BLUE,
    padding: 5,
    fontFamily: "AzoSans-Bold",
    width: "100%",
  },

  socialWrapLogin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  socialBtnswrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 25,
    width: "100%",
  },

  socialIconWidth: {
    marginHorizontal: 12,
  },

  socialLoginIcon: {
    width: 40,
    height: 40,
  },

  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  registerBtn: {
    color: "black",
    fontSize: 16,
    fontFamily: "AzoSans-Bold",

    textAlign: "center",
  },

  bodyContainer: {
    width: "100%",
    height: "88%",
    justifyContent: "space-between",
  },
  btnsContainer: {},
  disclaimerText: {
    fontSize: 12,
    fontFamily: "AzoSans-Medium",
    color: "black",
    width: "100%",
    textAlign: "center",
    marginVertical: 20,
    lineHeight: 16,
    letterSpacing: 0.24,
  },
  highlited: {
    color: BLUE,
  },
  errText: {
    color: RED,
    fontFamily: "AzoSans-Bold",
    fontSize: 12,
    width: "100%",
    textAlign: "center",
  },
  //invalid credentials text
  invalidCredentials: {
    fontSize: 14,
    color: "red",
    fontFamily: "AzoSans-Bold",
  },
  //loading
});

export default LoginStyle;
