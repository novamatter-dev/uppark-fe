import { StyleSheet } from "react-native";
import { WHITE, PLATINUM } from "../../../../helpers/style/constants";

const DetailsStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
  },
  inputContainer: {
    alignItems: "center",
    backgroundColor: PLATINUM,
   
    
  },
  input: {
    fontFamily: "Azo Sans",
    fontSize: 18,
    fontWeight: "normal",
    backgroundColor: WHITE,
 
  },

  avoidingView: {
    flex: 1,
    marginBottom: "10%",
    backgroundColor: PLATINUM,
  },
  phoneIconStyle: {
    height: 26,
    width: 26,
    backgroundColor: WHITE,
    marginLeft: "2%",
  },
  mailIconStyle: {
    height: 20,
    width: 28,
    backgroundColor: WHITE,
    marginLeft: "2%",
  },
  licenseIconStyle: {
    height: 28,
    width: 26,
    backgroundColor: WHITE,
    marginLeft: "2%",
  },
});

export default DetailsStyle;
