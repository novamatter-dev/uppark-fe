import { StyleSheet } from "react-native";
import { WHITE } from "../../helpers/style/constants";

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: "10%",
    alignItems: "flex-start",
  },
  headerTitle: {
    color: "black",
    fontSize: 26,
    fontFamily: "AzoSans-Bold",
    marginVertical: 8,
  },
  backButton: {
    backgroundColor: WHITE,
    height: 60,
    width: 60,
  },
});

export default style;
