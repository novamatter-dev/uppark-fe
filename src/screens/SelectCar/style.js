import { StyleSheet } from "react-native";
import { BLACK, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {},
  listContainer: {
    display: "flex",
    width: "100%",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
    // padding: 25,
    backgroundColor: WHITE,
    marginVertical: 8,
  },
  itemLabel: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: BLACK,
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 23,
    paddingHorizontal: 25,
    width: "20%",
  },
});

export default style;
