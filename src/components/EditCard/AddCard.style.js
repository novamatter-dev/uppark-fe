import {StyleSheet, Dimensions, Platform} from 'react-native';
import {WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const AddCardStyle = StyleSheet.create({
  safeAreaContainer: {},

  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    // marginVertical: 16,
    justifyContent: 'space-between',
  },

  title: {
    textAlign: 'left',
    marginBottom: hp(2.5),
  },

  image: {
    width: 23,
    height: 23,
  },

  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: WHITE,
  },

  baseInput: {
    // marginTop: "6%",
    // height: height * 0.06,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rowInput: {
    width: '48%',
  },
});

export default AddCardStyle;
