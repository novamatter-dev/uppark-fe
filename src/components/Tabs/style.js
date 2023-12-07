import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    // paddingHorizontal: "10%",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: wp(39.74),
    height: hp(4.92),
    borderRadius: hp(1.97),

  },
  btnLabel: {
    fontSize: hp(1.97),
    fontFamily: "AzoSans-Medium",
    color: WHITE,
  },
});

export default style;
