import React, {useEffect} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import ctLogo from '../../assets/images/ct-logo.png';
import {useMaintenanceMode} from '../../helpers/useMaintenanceMode';

const Splash = () => {
  const {checkMaintenanceMode} = useMaintenanceMode();

  useEffect(() => {
    setTimeout(() => {
      checkMaintenanceMode();
    }, 750);
  }, []);

  return (
    <>
      <View style={bgStyle.container}>
        <ImageBackground
          source={require('../../assets/images/splash_noLogo.png')}
          resizeMode="cover"
          style={bgStyle.image}
        />
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EBEBEB',
            height: '50%',
          }}>
          <Image
            source={ctLogo}
            style={{
              width: '70%',
              height: 300,
            }}
          />
        </View>
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
