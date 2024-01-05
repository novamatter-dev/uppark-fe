import {StyleSheet} from 'react-native';
import {WHITE, BLACK} from '../../../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BankCardStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginVertical: 5,
    paddingVertical: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: WHITE,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },

  cardText: {
    fontSize: 18,
    color: BLACK,
    width: '70%',
    textAlign: 'left',
    fontFamily: 'AzoSans-Medium',
    marginLeft: wp(5),
  },

  icon: {
    height: 24,
    width: 24,
  },

  iconSpacing: {
    marginRight: 16,
  },

  deleteBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '15%',
  },
});

export default BankCardStyle;
