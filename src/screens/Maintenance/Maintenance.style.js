import {StyleSheet} from 'react-native';
import {WHITE} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const MaintenanceStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(10),
    alignItems: 'center',
  },
  image: {
    paddingTop: hp(5),
    marginBottom: hp(5),
    width: wp(40),
    height: hp(48),
  },
  smallImage: {
    marginTop: hp(5),
    marginBottom: hp(5),
    width: wp(20),
    height: wp(16),
  },
  modalContainer: {
    backgroundColor: '#1D1D26',
    width: '100%',
    height: hp(42),
    display: 'flex',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  content: {
    color: WHITE,
    fontSize: 18,
    fontFamily: 'AzoSans-Medium',
    width: '100%',
    lineHeight: 25,
    paddingHorizontal: wp(13),
  },
});

export default MaintenanceStyle;
