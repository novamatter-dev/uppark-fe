import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
// const { height } = Dimensions.get('window');

const AddPhoneStyle = StyleSheet.create({
  safeAreaContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    flex: 1,
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },

  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    // margin: 30,
    padding: 0,
  },

  inputContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    flex: 1,
    // paddingTop: 24,
  },

  title: {
    textAlign: "left",
    marginVertical: hp(2.95)
  },

  image: {
    width: 23,
    height: 23,
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },

  baseInput: {
    marginTop: "6%",
    // height: height * 0.06,
  },
});

export default AddPhoneStyle;
