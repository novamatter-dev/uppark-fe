import {Platform, StyleSheet} from 'react-native';
import {WHITE, PLATINUM, BLACK} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const AddLicenseStyle = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },

  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    width: 310,
    textAlign: 'left',
    paddingVertical: hp(1.97),
    // fontSize: 26,
  },
  baseInput: {
    height: 64,
    width: 326,
    marginTop: '5%',
    marginLeft: '23%',
    marginBottom: '50%',
  },
  closeButton: {
    height: 60,
    width: 60,
    backgroundColor: WHITE,
    marginLeft: '77%',
    borderRadius: 20,
    marginTop: '10%',
  },
  closeButtonImage: {
    height: 20,
    width: 20,
    marginTop: '35%',
    marginLeft: '35%',
  },
  licenseIconStyle: {
    height: 28,
    width: 35,
    backgroundColor: WHITE,
    marginLeft: '2%',
  },
  confirmButton: {
    // marginTop: "105%",
    // flex: 1,
  },
  dateInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: hp(2.95),
    height: hp(7.88),
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
    // marginTop: 16,
  },
  dateInputText: {
    color: BLACK,
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Bold',
    width: '90%',
  },
});

export default AddLicenseStyle;
