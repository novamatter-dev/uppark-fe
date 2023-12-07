import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
//libraries
// import MapView from "react-native-map-clustering";
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'native-base';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
//assets
import carPin from '../../../assets/icons/pin.png';
// import { CustomPolygon } from "../../../components";
//components
import {CustomPolygon} from '../../../components';

const Map = props => {
  const {
    isPinDraggable = false,
    location = {
      latitude: 0.0,
      longitude: 0.0,
      latitudeDelta: 0.0,
      longitudeDelta: 0.0,
    },
    setShowExtend = () => {},
    reservedPolygon = [],
  } = props;

  const navigation = useNavigation();
  const toast = useToast();

  const polygonRef = useRef();
  const mapRef = useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        region={location}
        zoomControlEnabled={false}
        showsMyLocationButton={false}
        customMapStyle={{borderRadius: 20}}
        clusteringEnabled={true}
        clusterColor={'green'}>
        <CustomPolygon
          ref={polygonRef}
          coordinate={reservedPolygon}
          isDraggable={isPinDraggable}
          setShowExtend={setShowExtend}
        />
      </MapView>
      <View style={styles.carpinContainer}>
        <Image source={carPin} style={styles.carpin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  carpinContainer: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  carpin: {
    height: 48,
    width: 48,
  },
});

export default Map;
