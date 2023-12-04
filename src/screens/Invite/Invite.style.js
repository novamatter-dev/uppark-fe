import { StyleSheet } from "react-native";
import { PLATINUM, WHITE } from "../../helpers/style/constants";

const InviteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PLATINUM,
    height: "100%",
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
  },
  backButton: {
    marginTop: "10%",
    height: 60,
    width: 60,
    backgroundColor: WHITE,
  },
  title: {
    fontSize: 26,
    marginVertical: "8%",
  },

  iconStyle: {
    height: 40,
    width: 30,
    backgroundColor: WHITE,
    marginLeft: "4%",
    marginTop: "4%",
  },
  copyIconStyle: {
    height: 26,
    width: 26,
    backgroundColor: WHITE,
    marginLeft: "6%",
    marginTop: "5%",
  },
  inputContainer: {
    width: 326,
    marginTop: "7%",
    backgroundColor: WHITE,
    borderRadius: 25,
    height: 64,
    marginBottom: "55%",
  },
  inviteButton: {
    display: "flex",

    height: 60,
    borderRadius: 25,
  },
  link: {
    fontFamily: "Azo Sans",
    marginLeft: "5%",
    fontSize: 18,
    marginTop: "7%",
    width: 200,
    fontWeight: "normal",
  },
});

export default InviteStyles;
