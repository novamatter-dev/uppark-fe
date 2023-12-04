import { StyleSheet } from "react-native";
import { PLATINUM, WHITE, GREY } from "../../helpers/style/constants";

const WalletStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    paddingVertical: 32,
    paddingHorizontal: "10%",
    backgroundColor: PLATINUM,
  },

  backButton: {
    backgroundColor: WHITE,
  },

  title: {
    fontSize: 26,
    marginTop: 24,
  },

  addCardButton: {
    backgroundColor: WHITE,
    borderRadius: 25,
    marginTop: 16,
  },

  addCardText: {
    color: GREY,
    width: 250,
    textAlign: "left",
    textTransform: "none",
  },

  iconSpacing: {
    marginRight: 16,
  },
});

export default WalletStyle;
