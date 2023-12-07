import { StyleSheet } from "react-native";
import { WHITE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    alignItems: "flex-start",
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },
  headerTitle: {
    color: "black",
    fontSize: hp(3.20),
    fontFamily: "AzoSans-Bold",
    marginVertical: hp(2.95),
  },
  backButton: {
    backgroundColor: WHITE,
    height: 60,
    width: 60,
  },
});

export default style;
