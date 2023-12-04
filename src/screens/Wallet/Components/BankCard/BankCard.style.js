import { StyleSheet } from "react-native";
import { WHITE, BLACK, AQUA } from "../../../../helpers/style/constants";

const BankCardStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginVertical: 5,
    paddingVertical: 10,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: WHITE,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  cardText: {
    fontSize: 18,
    color: BLACK,
    width: "70%",
    textAlign: "left",
    fontFamily: "AzoSans-Medium",
  },

  icon: {
    height: 24,
    width: 24,
  },

  iconSpacing: {
    marginRight: 16,
  },

  deleteBtn: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "15%",
  },
  toastWrapper: {
    backgroundColor: AQUA,
    padding: 16,
    borderRadius: 15,
    shadowColor: AQUA,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 25,
    shadowColor: AQUA,
  },
});

export default BankCardStyle;
