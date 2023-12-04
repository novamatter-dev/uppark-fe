import { Platform, StyleSheet } from "react-native";
import {
  PLATINUM,
  WHITE,
  BLACK,
  RED,
  GREY,
} from "../../helpers/style/constants";

const SettingsScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
    // padding: 32,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: "8%",
    paddingVertical: Platform.OS === "ios" ? "10%" : "5%",
  },
  backButton: {
    marginTop: "5%",
    height: 60,
    width: 60,
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
