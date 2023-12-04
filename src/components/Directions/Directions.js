import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  parkingsState,
  setIsParkingSelected,
} from "../../redux/features/parkings/parkingsSlice";
import { CustomPolygon } from "../../components";
import PropTypes from "prop-types";
import carPin from "../../assets/icons/pin.png";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");

const Directions = (props) => {
  const {
    isPinDraggable = false,
    location = {
      latitude: 0.01,
      longitude: 0.01,
      latitudeDelta: 0.001,
      longitudeDelta: 0.0001,
    },
    polygonGroup = [],
    handleCarLocation = () => {},
  } = props;
  const dispatch = useDispatch();
  const parkingsData = useSelector(parkingsState);

  const handleUnselectParking = () => {
    dispatch(setIsParkingSelected(false));
  };

  const onRegionChange = (region) => {
    handleCarLocation(region);
  };

  const [mapViewRef, setMapViewRef] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={(c) => setMapViewRef(c)}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={location}
        // onRegionChangeComplete={(region) => setRegion(region)}
        zoomControlEnabled={true}
        showsMyLocationButton={true}
        showsUserLocation
        onPress={handleUnselectParking}
        onRegionChange={onRegionChange}
      >
        {/* {polygonGroup?.map((item, index) => {
          return (
            <CustomPolygon
              coordinates={item}
              key={`${index * item.ids}`}
              parkingId={item?.ids}
              isDraggable={isPinDraggable}
            />
          );
        })} */}
      </MapView>
      {isPinDraggable && (
        <View style={styles.carpinContainer}>
          <Image source={carPin} style={styles.carpin} />
        </View>
      )}
    </View>
  );
};

Map.propTypes = {
  isPinDraggable: PropTypes.bool,
  parkingGroups: PropTypes.array,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  handleCarLocation: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
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

export default Directions;
