import { StyleSheet } from "react-native";
import { GREY, PLATINUM, BLACK, WHITE } from "../../helpers/style/constants";

export default StyleSheet.create({
  mappedList: {
    flex: 1,
    width: "100%",
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
    // marginTop: "50%",
  },
  elementsWrapper: {
    marginVertical: 20,
  },
  element: {
    marginVertical: 1,
    padding: 5,
    borderBottomColor: GREY,
    borderBottomWidth: 0.5,
  },
  elementLabel: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: WHITE,
    marginVertical: 5,
  },
  prefixWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownArrow: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
  },
  prefixText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
    color: "black",
  },
  closeBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: "10%",
  },
  title: {
    display: "flex",
    alignSelf: "center",
    fontSize: 18,
    color: WHITE,
    fontFamily: "AzoSans-Medium",
  },
  closeBtn: {
    padding: 5,
    width: 30,
    height: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtnText: {
    fontSize: 18,
    fontFamily: "AzoSans-Bold",
  },
});
