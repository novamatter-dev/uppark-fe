import { StyleSheet } from "react-native";
import { BLACK, BLUE, WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  contaier: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  bodyContainer: {},
  parkingItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 25,
    width: "100%",
    padding: 25,
    backgroundColor: WHITE,
    marginVertical: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: BLACK,
    width: "70%",
    textAlign: "left",
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
    color: BLUE,
    width: "30%",
    textAlign: "right",
  },
});

export default style;
