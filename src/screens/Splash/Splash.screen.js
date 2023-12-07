import React, {useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Splash = () => {
  const navigation = useNavigation();
  const {jwt} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      if (jwt) {
        navigation.navigate('HomeDrawer');
      } else {
        navigation.navigate('Login');
      }
    }, 1000);
  }, []);

  return (
    <>
      <View style={bgStyle.container}>
        <ImageBackground
          source={require('../../assets/images/splash.png')}
          resizeMode="cover"
          style={bgStyle.image}
        />
      </View>
    </>
  );
};

const bgStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default Splash;
