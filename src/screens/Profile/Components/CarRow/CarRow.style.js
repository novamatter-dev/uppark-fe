import { StyleSheet } from "react-native";
import { WHITE, BLACK, GREY, AQUA } from "../../../../helpers/style/constants";

const carRowStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
    width: "100%",
    borderRadius: 25,
    marginVertical: 8,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  carDetails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  // old
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 24,
    height: 64,
  },
  btnContent: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  innerButton: {
    display: "flex",
    flexDirection: "row",
    width: "70%",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: "AzoSans-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    textAlign: "left",
    color: BLACK,
    fontSize: 18,
    paddingHorizontal: 25,
  },

  radio: {
    borderRadius: 12,
    borderWidth: 3,
    borderColor: GREY,
    backgroundColor: WHITE,
    height: 32,
    width: 32,
  },

  radioSelected: {
    borderRadius: 12,
    backgroundColor: AQUA,
    height: 32,
    width: 32,
  },

  radioContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default carRowStyle;
