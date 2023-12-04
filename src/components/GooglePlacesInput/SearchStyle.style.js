import { StyleSheet } from "react-native";

const SearchStyle = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: "gray",
    paddingVertical: 5,
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60,
    zIndex: 1,
  },
  resultItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 330,
    height: 75,
  },
  contentBody: {
    // paddingVertical: 4,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 5,
    // backgroundColor: "red",
  },
  resultText: {
    color: "black",
    fontSize: 16,
    fontFamily: "AzoSans-Medium",
  },
  regionText: {
    color: "black",
    fontSize: 12,
    // fontFamily: "AzoSans-Medium",
  },
  resultRoute: {
    color: "gray",
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    borderRadius: 25,
    height: 20,
  },
  textInput: {
    height: "100%",
    color: "black",
    marginHorizontal: 10,
    zIndex: 20,
    fontSize: 18,
    fontFamily: "AzoSans-Medium",
  },
  listView: {
    position: "absolute",
    top: 60,
    zIndex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  row: {
    display: "flex",
    justifyContent: "center",
    padding: 0,
  },
  blackText: {
    color: "black",
  },
});
export default SearchStyle;
