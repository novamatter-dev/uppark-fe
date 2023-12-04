import { StyleSheet } from "react-native";
import { PLATINUM, WHITE, BLACK } from "../../../../helpers/style/constants";

const PaymentOptionsStyle = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  exitButton: {
    backgroundColor: WHITE,
    alignSelf: "flex-end",
  },

  icon: {
    width: 24,
    height: 24,
  },

  nativeButtonStyle: {
    backgroundColor: PLATINUM,
    height: 64,
    marginTop: 5,
  },

  nativeBaseLabelStyle: {
    fontSize: 16,
    color: BLACK,
    width: 320,
    textAlign: "left",
    paddingHorizontal: 10,
  },

  title: {
    // marginTop: 24,
  },
});

export default PaymentOptionsStyle;
