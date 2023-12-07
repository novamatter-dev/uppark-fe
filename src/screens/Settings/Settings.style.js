import { Platform, StyleSheet } from "react-native";
import {
  PLATINUM,
  WHITE,
  BLACK,
  RED,
  GREY,
} from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SettingsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },
  backButton: {
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 26,
    marginVertical: "6%",
  },
  switchLabel: {
    color: BLACK,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    width: "70%",
  },
  marketingText: {
    color: BLACK,
    fontWeight: "normal",
    fontSize: 18,
    fontFamily: "Azo Sans",
    paddingTop: 38,
  },
  setTimerText: {
    color: "black",
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    paddingTop: 25,
    fontWeight: "bold",
  },
  versionText: {
    color: GREY,
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    paddingTop: 25,
    fontWeight: "bold",
  },
  switch: {
    // marginTop: "7%",
    borderRadius: 24,
  },
  slider: {
    width: "100%",
    heigth: 60,
    marginVertical: 10,
  },

  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    alignItems: "center",
  },
  deleteBtn: {
    width: "100%",
    backgroundColor: RED,
  },
});

export default SettingsScreenStyle;
