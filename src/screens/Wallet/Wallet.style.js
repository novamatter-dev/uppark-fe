import { StyleSheet } from "react-native";
import { PLATINUM, WHITE, GREY } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const WalletStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    backgroundColor: PLATINUM,
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },

  backButton: {
    backgroundColor: WHITE,
  },

  title: {
    fontSize: 26,
    marginTop: 24,
  },

  addCardButton: {
    backgroundColor: WHITE,
    borderRadius: 25,
    marginTop: 16,
  },

  addCardText: {
    color: GREY,
    width: 250,
    textAlign: "left",
    textTransform: "none",
  },

  iconSpacing: {
    marginRight: 16,
  },
});

export default WalletStyle;
