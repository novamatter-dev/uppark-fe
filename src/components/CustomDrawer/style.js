import { StyleSheet } from "react-native";
import { BLACK, PLATINUM, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    paddingVertical: 40,
  },
  bodyContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  linksContainer: {
    paddingTop: 40,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    marginVertical: 10,
    paddingLeft: 40,
  },
  label: {
    fontSize: 16,
    fontFamily: "AzoSans-Bold",
    color: WHITE,
    marginLeft: 16,
  },
  closeContainer: {
    paddingLeft: 40,
  },
  closeBnt: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PLATINUM,
    borderRadius: 25,
    width: 60,
    height: 60,
  },
});

export default style;
