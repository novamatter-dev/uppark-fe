import {StyleSheet} from 'react-native';
import {
  WHITE,
  PLATINUM,
  BLUE,
  BLACK,
  GREY,
} from '../../../../helpers/style/constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const HistoryCardStyle = StyleSheet.create({
  dataContainer: {
    borderRadius: hp(2.95),
    flexDirection: 'row',
    padding: hp(2.95),
    marginVertical: 10,
    backgroundColor: WHITE,
    width: wp(82),
    justifyContent: 'space-between',
  },
  textContainer: {
    backgroundColor: WHITE,
    maxWidth: wp(28.71),
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight: 5,
  },
  imgContainer: {
    height: wp(35),
    width: wp(35),
  },
  imageContainer: {
    borderColor: GREY,
    height: '100%',
    width: '100%',
    borderRadius: 20,
    flex: 1,
    paddingHorizontal: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderWidth: 2,
    resizeMode: 'contain',
  },
  img: {
    width: '100%',
    height: '100%',
    // padding: hp(0),
  },
  placeholderImageContainer: {
    borderColor: GREY,
    height: wp(38.46),
    width: wp(38.46),
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderWidth: 2,
    resizeMode: 'contain',
  },
  dateText: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Bold',
  },
  plateText: {
    color: '#B6B7BF',
    fontWeight: 'bold',
    fontSize: hp(1.47),
    fontFamily: 'AzoSans-Bold',
    paddingTop: 1,
  },
  locationText: {
    color: BLUE,
    fontWeight: 'bold',
    fontSize: hp(1.97),
    fontFamily: 'AzoSans-Bold',
  },
  priceText: {
    color: BLACK,
    fontWeight: 'bold',
    fontSize: hp(1.97),
    fontFamily: 'Azo Sans',
  },
});

export default HistoryCardStyle;
