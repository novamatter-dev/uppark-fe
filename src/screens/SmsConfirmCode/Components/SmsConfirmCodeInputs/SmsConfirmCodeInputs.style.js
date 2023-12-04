import { StyleSheet, Dimensions } from "react-native";
import { WHITE, BLACK, BLUE } from "../../../../helpers/style/constants";

const SmsConfirmCodeInputs = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  display: {
    width: 32,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },
  text: {
    fontFamily: "AzoSans-Bold",
    color: BLACK,
    fontSize: 32,
    borderWidth: 1,
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderRadius: 20,
    padding: 2,

    width: 56,
    height: Dimensions.get("window").height < 720 ? 70 : 80,
    // marginRight: 5,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  noBorder: {
    borderRightWidth: 0,
  },
  resendCodeBox: {
    marginTop: 20,
    width: "100%",
  },
  resendBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loadingWrapper: {
    // position: "absolute",
    // right: 50,
    width: "20%",
  },
  dummyView: {
    width: "20%",
    height: 10,
  },
  resendCodeBoxText: {
    fontFamily: "AzoSans-Bold",
    fontSize: 16,
    color: BLUE,
    textTransform: "uppercase",
    marginRight: 10,
    width: "60%",
    textAlign: "center",
  },
  keyPadContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  keyPadItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
    width: "30%",
    height: Dimensions.get("window").height < 720 ? 55 : 80,
  },
  keyPadLabel: {
    fontSize: 40,
    fontFamily: "AzoSans-Bold",
    color: BLACK,
  },
});

export default SmsConfirmCodeInputs;
