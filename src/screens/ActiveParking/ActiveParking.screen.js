import React, {useState} from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import {Box, Flex} from 'native-base';
import ActiveParkingStyle from './ActiveParking.style';
import {NativeBaseButton, Text, Map} from '../../components';
import {SearchBar, ParkDetails} from '../../components';
import {BLUE} from '../../helpers/style/constants';

const ActiveParking = ({navigation}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleOnSubmit = () => {
    navigation.navigate('ParkFromScreen');
  };
  return (
    <>
      <View style={ActiveParkingStyle.container}>
        <SearchBar navigation={navigation} />

        <Box
          style={
            isToggled
              ? ActiveParkingStyle.mapSmall
              : ActiveParkingStyle.mapLarge
          }>
          <Map
            style={
              isToggled
                ? ActiveParkingStyle.mapSmall
                : ActiveParkingStyle.mapLarge
            }
          />
        </Box>

        <Box
          style={
            isToggled
              ? ActiveParkingStyle.placeDetailsLarge
              : ActiveParkingStyle.placeDetailsSmall
          }>
          <TouchableOpacity onPress={handleToggle}>
            <Text
              style={{
                color: BLUE,
              }}>
              {t('show')} {isToggled ? 'less' : 'more'}
            </Text>
          </TouchableOpacity>

          <Flex direction={'row'} style={ActiveParkingStyle.timeLeft}>
            <Image
              source={require('../../assets/icons/clock.png')}
              style={ActiveParkingStyle.timeIcon}
            />
            <Text style={{fontSize: 25}}>01:14</Text>
          </Flex>
          {/* TODO: verify hardcoded */}
          <Text style={ActiveParkingStyle.placeDetailsSubtitle}>
            George Enescu, P2393
          </Text>

          {isToggled && <ParkDetails />}
        </Box>
      </View>

      <NativeBaseButton
        handleOnPress={handleOnSubmit}
        label={'Extend Time'}
        isDisabled={false}
        style={ActiveParkingStyle.parkSubmit}
      />
    </>
  );
};

export default ActiveParking;
