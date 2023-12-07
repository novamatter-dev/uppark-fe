import { StyleSheet, Dimensions } from "react-native";
import { WHITE } from "../../helpers/style/constants";

// const { height } = Dimensions.get('window');
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const AddCardStyle = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  buttonWrapper: {
    display: 'flex',
    width: '100%',
    marginTop: "auto",
    marginBottom: hp(5.92),
  },
  container: {
    display: "flex",
    position: "relative",
    height: "99%",
    flexDirection: "column",
    paddingHorizontal: wp(8.20),
    paddingVertical: hp(4.92),
    paddingTop: Platform.OS === "ios" ? hp(6.92) : hp(4.92)
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },

  title: {
    textAlign: "left",
  },

  image: {
    width: hp(2.83),
    height: hp(2.83),
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },

  baseInput: {
    // marginTop: "6%",
    // height: height * 0.06,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  rowInput: {
    width: "48%",
  },

  invalidLabel: {
    fontSize: 14,
    color: "red",
    fontFamily: "AzoSans-Medium",
    marginTop: 10,
    paddingHorizontal: "10%",
  },
});

export default AddCardStyle;
