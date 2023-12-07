import React, {useEffect} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import marker from '../../assets/icons/marker.png';
//style
import {BLUE, RED} from '../../helpers/style/constants';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
//redux
import {useSelector} from 'react-redux';

const CustomMarker = props => {
  const {
    coordinate = {},
    handleClick = () => {},
    isDraggable = false,
    isSensor = false,
    sensorStatus = '',
    sensorInfo = {},
    selectedSensorId = 0,
    sensorColor = '',
  } = props;

  const {selectedSensor} = useSelector(state => state.parkings.parkingsState);

  const handleOnDragEnd = e => {
    const {coordinate, position} = e.nativeEvent;
    const {latitude, longitude} = coordinate;
  };

  const handleColor = () => {
    if (sensorInfo.id === 2705) {
      console.log('sensorStatus:', sensorStatus);
    }
    if (sensorInfo?.id === selectedSensor?.id) {
      return 'yellow';
    } else {
      return sensorStatus === 'Liber'
        ? '#45E6B0'
        : sensorStatus === 'Rezervat'
        ? BLUE
        : RED;
    }
  };

  const handlePress = () => {
    handleClick();
  };

  return (
    <Marker
      draggable={isDraggable}
      coordinate={coordinate}
      onPress={handlePress}
      onDragEnd={handleOnDragEnd}
      tracksViewChanges={false}>
      {!isSensor && (
        <Image
          source={marker}
          style={{
            width: isDraggable ? 55 : 25,
            height: isDraggable ? 55 : 25,
          }}
        />
      )}

      {isSensor && (
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            backgroundColor: handleColor(),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'transparent'}}>{sensorStatus}</Text>
          {/* {sensorInfo.isHandicaped && (
            <SvgXml xml={svgs.wheelchair} width={22} height={22} />
          )} */}
        </View>
      )}
    </Marker>
  );
};

CustomMarker.prototype = {
  coordinate: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  handleClick: PropTypes.func,
  isDraggable: PropTypes.bool,
  isSensor: PropTypes.bool,
  sensorStatus: PropTypes.string,
  sensorInfo: PropTypes.shape({}),
  selectedSensorId: PropTypes.number,
  sensorColor: PropTypes.string,
};

export default CustomMarker;
