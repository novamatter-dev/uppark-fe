import {StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BasicInputStyle = StyleSheet.create({
  input: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(2.95),
    backgroundColor: WHITE,
    paddingVertical: 20,
    // paddingHorizontal: 10,
    marginVertical: 8,
    height: hp(7.88),
  },

  icon: {
    marginLeft: hp(3),
  },
  textInput: {
    width: '70%',
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    marginLeft: hp(4.1),
    color: 'black',
  },
  rightIcon: {
    position: 'absolute',
    // top: "50%",
    right: '8%',
  },
});

export default BasicInputStyle;
