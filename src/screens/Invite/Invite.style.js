import { StyleSheet } from "react-native";
import { PLATINUM, WHITE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const InviteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
    height: "100%",
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
    marginVertical: "8%",
  },

  iconStyle: {
    height: 40,
    width: 30,
    backgroundColor: WHITE,
    marginLeft: "4%",
    marginTop: "4%",
  },
  copyIconStyle: {
    height: 26,
    width: 26,
    backgroundColor: WHITE,
    marginLeft: "6%",
    marginTop: "5%",
  },
  inputContainer: {
    width: "100%",
    marginTop: "7%",
    backgroundColor: WHITE,
    borderRadius: 25,
    height: 64,
    marginBottom: "55%",
  },
  inviteButton: {
    display: "flex",

    height: 60,
    borderRadius: 25,
  },
  link: {
    fontFamily: "Azo Sans",
    marginLeft: "5%",
    fontSize: 18,
    marginTop: "7%",
    width: 200,
    fontWeight: "normal",
  },
});

export default InviteStyles;
