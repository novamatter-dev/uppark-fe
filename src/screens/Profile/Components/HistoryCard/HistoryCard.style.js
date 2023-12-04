import { StyleSheet } from "react-native";
import {
  WHITE,
  PLATINUM,
  BLUE,
  BLACK,
  GREY,
} from "../../../../helpers/style/constants";

const HistoryCardStyle = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: GREY,
  // },
  dataContainer: {
    borderRadius: 24,
    flexDirection: "row",
    padding: 24,
    marginVertical: 10,
    backgroundColor: WHITE,
  },
  textContainer: {
    backgroundColor: WHITE,
    // height: 150,
    maxWidth: 112,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // borderRadius: 30,
    marginRight: 5,
  },
  imageContainer: {
    borderColor: GREY,
    height: 150,
    width: 150,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 2,
    resizeMode: "contain",
  },
  dateText: {
    color: BLACK,
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "AzoSans-Bold",
  },
  plateText: {
    color: "#B6B7BF",
    fontWeight: "bold",
    fontSize: 12,
    fontFamily: "AzoSans-Bold",
    paddingTop: 1,
  },
  locationText: {
    color: BLUE,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    // width: 60,
  },
  priceText: {
    color: BLACK,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Azo Sans",
    // paddingTop: "23%",
  },
});

export default HistoryCardStyle;
