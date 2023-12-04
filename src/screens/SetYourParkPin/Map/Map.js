import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
//libraries
// import MapView from "react-native-map-clustering";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import MapViewDirections from "react-native-maps-directions";
import { SvgXml } from "react-native-svg";
import { useToast } from "native-base";
import { t } from "i18next";
import { Actionsheet } from "native-base";
import { useNavigation } from "@react-navigation/native";
//assets
import carPin from "../../../assets/icons/pin.png";
// import { CustomPolygon } from "../../../components";
//components
import { CustomPolygon, CustomMarker, Toast } from "../../../components";

const Map = (props) => {
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
        region={location}
        style={styles.map}
        zoomControlEnabled={false}
        showsMyLocationButton={false}
        customMapStyle={{ borderRadius: 20 }}
        clusteringEnabled={true}
        clusterColor={"green"}
      >
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
    display: "flex",

    alignItems: "center",
    borderRadius: 20,
  },
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  carpinContainer: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  carpin: {
    height: 48,
    width: 48,
  },
});

export default Map;
