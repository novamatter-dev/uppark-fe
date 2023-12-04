import { StyleSheet } from "react-native";
import { BLUE, GREY, PLATINUM, WHITE } from "../../helpers/style/constants";

const HomeStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    height: "100%",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  search: {
    height: "15%",
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: WHITE,
    borderColor: WHITE,
    borderWidth: 0,
    paddingVertical: 3,
    height: "100%",
    elevation: 0,
  },
  searchInactive: {
    width: 45,
    height: 45,
    tintColor: BLUE,
    backgroundColor: WHITE,
    padding: 20,
    borderRadius: 15,
  },
  searchText: {
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    fontFamily: "Azo Sans",
    fontSize: 18,
    fontWeight: "normal",
    backgroundColor: WHITE,
    width: "100%",
  },
  closeSearchIconStyle: {
    height: 20,
    width: 28,
    backgroundColor: WHITE,
    marginLeft: "5%",
  },
  clearSearchIconStyle: {
    height: 20,
    width: 28,
    backgroundColor: WHITE,
    position: "relative",
    right: 20,
  },
  mapSmall: {
    height: "30%",
    marginBottom: 20,
  },
  mapLarge: {
    height: "55%",
    textAlign: "center",
    marginBottom: 20,
  },
  mapText: {
    fontSize: 24,
    textAlign: "center",
  },
  placeDetailsLarge: {
    height: "30%",
    paddingHorizontal: 20,
  },
  placeDetailsSmall: {
    height: 30,
    paddingHorizontal: 20,
  },

  parkSubmit: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    width: "80%",
  },

  rightNav: {
    backgroundColor: WHITE,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: WHITE,
  },

  menu: {
    backgroundColor: BLUE,
    width: 45,
    height: 45,
    tintColor: BLUE,
    padding: 20,
    borderRadius: 15,
  },

  currentCarButton: {
    backgroundColor: WHITE,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: WHITE,
  },

  currentCarButtonLabel: {
    fontSize: 12,
    color: GREY,
  },

  timeLeft: {
    // marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: BLUE,
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
  },

  timeIcon: {
    marginTop: 5,
    marginRight: 10,
  },
});

export default HomeStyle;
