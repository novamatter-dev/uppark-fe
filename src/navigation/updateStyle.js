import {StyleSheet} from 'react-native';
import {BLACK, WHITE} from '../helpers/style/constants';

const style = StyleSheet.create({
  updateNotificationContainer: {
    width: '100%',
    // height: "45%",
    position: 'absolute',
    bottom: 0,
    zIndex: 90,
    left: 0,
    backgroundColor: BLACK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 32,
  },
  title: {
    fontSize: 26,
    color: WHITE,
    fontFamily: 'AzoSans-Bold',
    marginBottom: 8,
    width: '100%',
    textAlign: 'center',
  },
  text: {
    color: '#B6B7BF',
    fontSize: 18,
    fontFamily: 'AzoSans-Medium',
    marginTop: 8,
  },
  btnContainer: {
    display: 'flex',
    width: '100%',
  },
});

export default style;
