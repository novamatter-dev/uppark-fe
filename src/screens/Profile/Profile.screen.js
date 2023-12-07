import React, {useState} from 'react';
import {Box, Text} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
//style & assets
import ProfileStyle from './Profile.style';
import svgs from '../../assets/svgs';
import {PLATINUM, BLUE, BLACK, WHITE} from '../../helpers/style/constants';
//components
import {NativeBaseBackButton} from '../../components';
import {CarsTab, HistoryTab, DetailsTab} from './Components';
//libs
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

const Profile = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const [selectedId, setSelectedId] = useState(2);

  return (
    <Box style={ProfileStyle.container}>
      <Box style={ProfileStyle.header}>
        <NativeBaseBackButton
          isLoading={false}
          style={ProfileStyle.backButton}
          handleOnPress={() => navigation.navigate('HomePage')}
          isDisabled={false}
        />
        <View style={ProfileStyle.buttonsContainer}>
          <TouchableOpacity
            onPress={() => setSelectedId(1)}
            style={{
              ...ProfileStyle.button,
              backgroundColor: selectedId === 1 ? BLUE : PLATINUM,
            }}>
            <SvgXml
              xml={selectedId === 1 ? svgs.selectedProfile : svgs.profile}
              width={22}
              height={22}
            />
            <Text
              style={{
                ...ProfileStyle.tabText,
                color: selectedId === 1 ? WHITE : BLACK,
              }}>
              {t('details')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedId(2)}
            style={{
              ...ProfileStyle.button,
              backgroundColor: selectedId === 2 ? BLUE : PLATINUM,
            }}>
            <SvgXml
              xml={selectedId === 2 ? svgs.selectedCar : svgs.car}
              width={22}
              height={22}
            />
            <Text
              style={{
                ...ProfileStyle.tabText,
                color: selectedId === 2 ? WHITE : BLACK,
              }}>
              {t('cars')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedId(3)}
            style={{
              ...ProfileStyle.button,
              backgroundColor: selectedId === 3 ? BLUE : PLATINUM,
            }}>
            <SvgXml
              xml={selectedId === 3 ? svgs.selectedHistory : svgs.history}
              width={22}
              height={22}
            />
            <Text
              style={{
                ...ProfileStyle.tabText,
                color: selectedId === 3 ? WHITE : BLACK,
              }}>
              {t('history')}
            </Text>
          </TouchableOpacity>
        </View>
      </Box>
      <View style={{height: '100%'}}>
        {selectedId === 1 && <DetailsTab />}
        {selectedId === 2 && <CarsTab />}
        {selectedId === 3 && <HistoryTab />}
      </View>
    </Box>
  );
};

export default Profile;
