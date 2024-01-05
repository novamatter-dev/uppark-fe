import {StyleSheet, Dimensions, Platform} from 'react-native';
import {WHITE, BLACK} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
// const { height } = Dimensions.get('window');

const AddPhoneStyle = StyleSheet.create({
  safeAreaContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },

  container: {
    display: 'flex',
    height: '100%',
    // backgroundColor: "red",
    flexDirection: 'column',
  },

  inputContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: hp(2.95),
  },

  title: {
    textAlign: 'left',
    marginVertical: hp(2.95),
  },

  subtitle: {
    fontSize: 12,
    color: '#B6B7BF',
    fontFamily: 'AzoSans-Bold',
    marginBottom: hp(2),
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
    marginVertical: 8,
  },

  detailsBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    paddingLeft: hp(3),
    marginVertical: 8,
    height: hp(7.88),
  },
  btnLabel: {
    fontSize: hp(2.21),
    color: BLACK,
    fontFamily: 'AzoSans-Medium',
    marginLeft: hp(4.1),
  },
  //floating button
  floatingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
});

export default AddPhoneStyle;
