import {Platform, StyleSheet} from 'react-native';
import {BLACK, WHITE, PLATINUM} from '../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const style = StyleSheet.create({
  container: {
    backgroundColor: PLATINUM,
    paddingHorizontal: wp(8.2),
    paddingVertical: hp(4.92),
    display: 'flex',
    // justifyContent: "space-between",
    width: '100%',
    height: '100%',
    // alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? hp(6.92) : hp(4.92),
  },
  titleWrapper: {
    marginBottom: hp(2.95),
  },
  backButton: {
    backgroundColor: WHITE,
  },
  headerTitle: {
    color: 'black',
    fontSize: hp(3.2),
    fontFamily: 'AzoSans-Bold',
    marginVertical: 8,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2.95),
  },
  listContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: PLATINUM,
    height: hp(65),
  },
  carsListContainer: {
    width: '100%',
    display: 'flex',
    height: hp(50),
    paddingTop: 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: hp(2.95),
    height: hp(7.88),
    width: '100%',
    backgroundColor: WHITE,
    marginBottom: hp(1.97),
  },
  itemLabel: {
    fontSize: hp(2.21),
    fontFamily: 'AzoSans-Medium',
    color: BLACK,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
});

export default style;
