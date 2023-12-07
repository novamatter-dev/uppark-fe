import { StyleSheet } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const titleComponentStyle = StyleSheet.create({
  title: {
    fontFamily: "AzoSans-Bold",
    color: "black",
    fontSize: hp(3.20),
  },
});

export default titleComponentStyle;
