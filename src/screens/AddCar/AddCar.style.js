import {Platform, StyleSheet} from 'react-native';
import {WHITE, BLACK, PLATINUM, GREY} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AddCarStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    width: '100%',
    height: '100%',
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  scrollViewContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  buttonWrapper: {
    // paddingVertical: 20,
    width: '100%',
    display: 'flex',
    marginTop: hp(5),
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  title: {
    textAlign: 'left',
    marginVertical: hp(2.95),
  },

  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: WHITE,
    // backgroundColor: "#F5F5F5"
  },

  baseInput: {
    // marginTop: 20,
    width: '100%',
  },
  propBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    padding: 20,
    marginVertical: 8,
    height: hp(7.88),
  },
  propBtnLabel: {
    marginHorizontal: 16,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    color: GREY,
  },
  detailsBtn: {
    height: hp(7.88),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    paddingLeft: wp(5.12),
    marginBottom: hp(1.97),
  },
  btnLabel: {
    fontSize: hp(2.21),
    color: BLACK,
    fontFamily: 'AzoSans-Medium',
    marginLeft: 17,
  },

  // modal container
  modalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
});

export default AddCarStyle;
