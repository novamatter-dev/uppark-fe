// @ts-nocheck
import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
//style
import HomeStyle from '../../screens/Home/Home.style';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
//components
import {ButtonComponent, NativeBaseBackButton, Text} from '../index';
import {Box, Flex} from 'native-base';
import GooglePlacesInput from '../GooglePlacesInput/GooglePLacesInput';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
//libs
import {useTranslation} from 'react-i18next';
import {BLUE, GREY} from '../../helpers/style/constants';
const SearchBar = props => {
  const {handleNearbyParkings = () => {}, displayCounter = false} = props;
  const {currentReservations} = useSelector(
    state => state.parkings.parkingsState,
  );

  const navigation = useNavigation();
  const {t} = useTranslation();

  const {activeCar} = useSelector(state => state.cars);

  const [searchIsActive, setSearchIsActive] = useState(false);

  const handleSetSearch = () => {
    setSearchIsActive(!searchIsActive);
  };

  const handleMenu = () => {
    navigation.toggleDrawer();
  };

  const handleShowCarScreen = () => {
    navigation.navigate('Profile');
  };

  const closeSearch = () => {
    setSearchIsActive(false);
  };

  const findParkedCar = () => {
    return currentReservations?.some(
      car => car.plateNumber === activeCar?.licensePlateNumber,
    );
  };

  useEffect(() => {
    if (displayCounter) {
      closeSearch();
    }
  }, [displayCounter]);

  return (
    <View style={HomeStyle.search}>
      {!searchIsActive && (
        <Flex
          direction="row"
          alignItems="center"
          justifyContent={'space-between'}>
          <NativeBaseBackButton
            style={HomeStyle.searchInactive}
            handleOnPress={handleSetSearch}
            iconType={'search'}
            disabled={false}
          />
          <>
            <Flex
              direction="row"
              alignItems="center"
              mb="2.5"
              mt="1.5"
              justifyContent={'space-between'}
              style={HomeStyle.rightNav}>
              <TouchableOpacity
                onPress={handleShowCarScreen}
                style={HomeStyle.currentCarButton}>
                <Text
                  style={{
                    ...HomeStyle.currentCarButtonLabel,
                    color: findParkedCar() ? BLUE : GREY,
                  }}>
                  {findParkedCar() ? t('parked_car') : t('current_car')}
                </Text>
                <Text style={HomeStyle.licensePlateNumber}>
                  {activeCar?.licensePlateNumber}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={HomeStyle.menu} onPress={handleMenu}>
                <SvgXml xml={svgs.burgerMenu} width={24} height={20} />
              </TouchableOpacity>
            </Flex>
          </>
        </Flex>
      )}
      {searchIsActive && (
        <View
          style={{
            height: '100%',
          }}>
          <GooglePlacesInput
            handleNearbyParkings={handleNearbyParkings}
            closeSearch={closeSearch}
            displayCounter={displayCounter}
            searchIsActive={searchIsActive}
          />
        </View>
      )}
    </View>
  );
};

SearchBar.prototype = {
  handleNearbyParkings: PropTypes.func,
  displayCounter: PropTypes.bool,
};

export default SearchBar;
