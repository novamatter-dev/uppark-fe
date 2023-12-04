import { StyleSheet, Dimensions } from "react-native";
import { WHITE, BLACK, BLUE } from "../../../../helpers/style/constants";

const CarDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  boxContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: 30,
  },

  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: WHITE,
  },

  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  carContainer: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: WHITE,
    // borderRadius: 24,
    // height: 64,
    // // marginVertical: Dimensions.get("window").height * 0.05,
    // marginVertical: 8,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  optionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 24,
    height: 64,
  },
  carInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  carText: {
    fontFamily: "AzoSans-Medium",
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "left",
    color: BLACK,
    fontSize: 18,
    paddingHorizontal: 10,
    // width: 250,
  },

  optionsText: {
    fontFamily: "AzoSans-Medium",
    letterSpacing: 1,
    textAlign: "left",
    color: BLACK,
    fontSize: 18,
    height: 64,
    width: 250,
    paddingLeft: Dimensions.get("window").width * 0.07,
  },

  binIcon: {
    width: 25,
    height: 25,
  },

  saveButton: {
    backgroundColor: BLUE,
    marginTop: Dimensions.get("window").height * 0.12,
    height: 65,
    borderRadius: 30,
  },

  baseInput: {
    paddingTop: 10,
    marginBottom: 10,
  },

  itemWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  itemName: {
    color: BLACK,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    width: "35%",
  },
  itemShortName: {
    color: BLACK,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    width: "40%",
    textAlign: "center",
    // marginLeft: 16,
  },
});

export default CarDetailsStyle;
