import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {WHITE} from '../../helpers/style/constants';

const SearchStyle = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingVertical: 5,
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 60,
    zIndex: 1,
  },
  resultItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 75,
    paddingHorizontal: wp(5),
  },
  contentBody: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 5,
  },
  resultText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'AzoSans-Medium',
  },
  regionText: {
    color: 'black',
    fontSize: 12,
  },
  resultRoute: {
    color: 'gray',
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: 20,
    width: '100%',
  },
  emptyInputContainer: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    height: hp(8),
    width: '100%',
  },
  textInput: {
    height: '100%',
    color: 'black',
    zIndex: 20,
    fontSize: 18,
    fontFamily: 'AzoSans-Medium',
  },
  listView: {
    position: 'absolute',
    top: hp(7),
    zIndex: 1,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: 'white',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  blackText: {
    color: 'black',
  },
  backIcon: {
    height: '100%',
    width: wp(15),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchStyle;
