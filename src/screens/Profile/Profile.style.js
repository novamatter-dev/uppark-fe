import { StyleSheet, Dimensions } from "react-native";
import {
  BLUE,
  BLACK,
  WHITE,
  GREY,
  PLATINUM,
} from "../../helpers/style/constants";

const ProfileStyle = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: PLATINUM,
  },
  buttonsContainer: {
    paddingTop: Dimensions.get("window").height < 720 ? 10 : 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  header: {
    backgroundColor: WHITE,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: "30%",
  },
  tabText: {
    fontSize: 18,
    fontFamily: "Azo Sans",
    marginTop: "15%",
    textAlign: "center",
    fontWeight: "bold",
  },
  selectedText: {
    fontSize: 18,
    fontFamily: "Azo Sans",
    marginTop: "30%",
    textAlign: "center",
    fontWeight: "bold",
    color: WHITE,
  },
  button: {
    backgroundColor: PLATINUM,
    padding: 10,
    marginHorizontal: 10,
    width: Dimensions.get("window").height < 720 ? 85 : 96,
    height: Dimensions.get("window").height < 720 ? 85 : 96,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSelected: {
    backgroundColor: BLUE,
    padding: 10,
    marginHorizontal: 10,
    width: 96,
    height: 96,
    borderRadius: 20,
  },
  backButton: {
    marginTop: "10%",
    marginLeft: "8%",
    backgroundColor: PLATINUM,
    height: 60,
    width: 60,
  },
  screenContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PLATINUM,
    paddingHorizontal: "10%",
    paddingTop: 20,
  },

  addCarBtnBox: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    marginBottom: 36,
  },

  carEntry: {
    backgroundColor: WHITE,
    height: 64,
    borderRadius: 24,
    marginTop: 20,
    width: "90%",
  },

  iconSpacing: {
    marginHorizontal: 0,
  },

  labelStyle: {
    color: GREY,
    textTransform: "none",
    textAlign: "left",
    padding: 0,
    marginRight: 32,
    paddingHorizontal: 10,
  },
  exitButton: {
    backgroundColor: WHITE,
    alignSelf: "flex-end",
  },

  //history container
  historyContainer: {
    display: "flex",
    alignItems: "center",
    height: "70%",
    width: "100%",
    paddingTop: 20,
  },
  historyItem: {
    width: "100%",
    display: "flex",
  },
  flatList: {
    width: "100%",
    display: "flex",
  },
});

export default ProfileStyle;
