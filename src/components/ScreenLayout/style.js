import { Platform, StyleSheet } from "react-native";
import { PLATINUM } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },
});

export default style;
