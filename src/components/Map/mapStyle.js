import {StyleSheet} from 'react-native';
import {BLUE, RED, WHITE} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-end",
    display: 'flex',

    alignItems: 'center',
    borderRadius: 20,
  },
  recenterBtn: {
    backgroundColor: WHITE,
    borderRadius: hp(1.97),
    position: 'absolute',
    bottom: hp(1.97),
    right: hp(1.97),
    zIndex: 20,
    width: hp(5.91),
    height: hp(5.91),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  findParkingBtn: {
    backgroundColor: BLUE,
    borderRadius: hp(1.97),
    position: 'absolute',
    bottom: hp(9.85),
    right: hp(1.97),
    zIndex: 20,
    width: hp(5.91),
    height: hp(5.91),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    // flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

  carpinContainer: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  carpin: {
    height: 48,
    width: 48,
  },
  //modal Style
  modalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    padding: 32,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: 'AzoSans-Bold',
    color: WHITE,
  },
  modalBtnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 24,
    marginVertical: 5,
  },
  btnLabel: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'AzoSans-Bold',
  },
  modalCancelBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    paddingVertical: 20,
    borderRadius: 24,
  },
  btnCancelLabel: {
    fontSize: 16,
    color: RED,
    fontFamily: 'AzoSans-Bold',
  },
  parkPin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    bottom: '50%',
    right: '50%',
    // marginLeft: -17,
    marginTop: -48, //half of svg height
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED,
    padding: 15,
    borderRadius: 15,
    position: 'absolute',
    top: '55%',
    width: '90%',
    zIndex: 3,
  },
  noParkingSelected: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: RED,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    position: 'absolute',
    top: '55%',
    // width: "60%",
    zIndex: 3,
  },
});

export default styles;
