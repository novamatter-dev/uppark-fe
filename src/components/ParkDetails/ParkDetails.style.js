import { StyleSheet } from "react-native";
import { AQUA, BLUE, GREY, ORANGE } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const HomeStyle = StyleSheet.create({
  placeDetailsShowMore: {
    color: BLUE,
    marginHorizontal: 20,
  },
  placeDetailsTitle: {
    fontSize: 32,
  },
  placeDetailsSubtitle: {
    color: GREY,
  },
  placeDetailsEntry: {
    marginTop: hp(2.09),
  },
  placeDetailsEntryTitle: {
    color: GREY,
    fontFamily: "AzoSans-Medium",
    fontSize: hp(1.47),
    marginBottom: hp(3)
  },
  placeDetailsEntryTitleStatus: {
    color: AQUA,
  },
  placeDetailsEntryContent: {
    fontSize: hp(1.97),
    marginTop: hp(1),
    fontFamily: "AzoSans-Bold",
  },
  placeDetailsEntryBullet: {
    color: GREY,
    fontSize: 15,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  opened: {
    color: AQUA,
    fontFamily: "AzoSans-Medium",
    fontSize: hp(1.47),
  },
  closed: {
    color: ORANGE,
    fontFamily: "AzoSans-Medium",
    fontSize: hp(1.47),
  },
  detailsText: {
    fontSize: hp(1.97),
    fontFamily: "AzoSans-Bold",
  },
});

export default HomeStyle;
