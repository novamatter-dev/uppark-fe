import { StyleSheet } from "react-native";
import { AQUA, BLUE, GREY, ORANGE } from "../../helpers/style/constants";

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
    marginVertical: 15,
  },
  placeDetailsEntryTitle: {
    color: GREY,
    fontFamily: "AzoSans-Medium",
    fontSize: 14,
  },
  placeDetailsEntryTitleStatus: {
    color: AQUA,
  },
  placeDetailsEntryContent: {
    fontSize: 16,
    marginVertical: 5,
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
    fontSize: 14,
  },
  closed: {
    color: ORANGE,
    fontFamily: "AzoSans-Medium",
    fontSize: 14,
  },
  detailsText: {
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
  },
});

export default HomeStyle;
