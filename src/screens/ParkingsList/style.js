import {StyleSheet} from 'react-native';
import {BLACK, BLUE, WHITE} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  contaier: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.95),
  },
  backButton: {
    // marginTop: '10%',
    // marginLeft: '8%',
    backgroundColor: WHITE,
    // height: 60,
    // width: 60,
  },
  headerTitle: {
    color: 'black',
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    marginVertical: 8,
  },
  bodyContainer: {
    height: '65%',
  },
  parkingItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: hp(2.95),
    width: '100%',
    height: hp(8.86),
    padding: 12,
    backgroundColor: WHITE,
    marginTop: hp(1.97),
  },
  itemTitle: {
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    color: BLACK,
    width: '70%',
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    color: BLUE,
    width: '30%',
    textAlign: 'right',
  },
});

export default style;
