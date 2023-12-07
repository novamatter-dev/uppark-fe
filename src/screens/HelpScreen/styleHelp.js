import { StyleSheet } from "react-native";
import { BLACK, PLATINUM, WHITE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const style = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },
  backBtn: {
    // marginVertical: 12,
    backgroundColor: WHITE,
    marginBottom: hp(2.95)
  },
  titleContainer: {
    marginVertical: 12,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column",
  },
  optionBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 24,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: "black",
    marginHorizontal: 18,
  },
  textComponentWrapper: {
    display: "flex",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },
  textComponentContent: {
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: "AzoSans-Medium",
    color: BLACK,
  },
});

export default style;
