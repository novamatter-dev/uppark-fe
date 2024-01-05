import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

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
