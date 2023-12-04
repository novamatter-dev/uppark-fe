import { StyleSheet } from "react-native";
import { BLUE, GREY } from "../../../../helpers/style/constants";

const SliderStyle = StyleSheet.create({


  minuteView: {
    height: 10,
    width: 10,
    backgroundColor: GREY,
    borderRadius: 30
  },
  hourView: {
    height: 25,
    width: 5,
    backgroundColor: GREY,
    borderRadius: 30
  },
  container: {
    paddingTop: 6,
    paddingBottom: 3,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: BLUE,
  },
  wrapperVertical: {
    width: "100%",
    height: 120,
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    margin: 'auto',
    color: 'black',
  },
  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderWidth: 3,
    borderRadius: 10,
    width: 3
  },
  selectedOption: {
    height: 50,
    width: 7,
    backgroundColor: "#45E6B0",
    borderRadius: 30,
  }

})

export default SliderStyle