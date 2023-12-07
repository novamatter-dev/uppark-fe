import React from 'react';
import {View, Text} from 'react-native';
import {NativeBaseButton} from '../../components';
import {useTranslation} from 'react-i18next';

const SearchParking = () => {
  const {t} = useTranslation();
  return (
    <View>
      <NativeBaseButton />
      <Text>{t('search_for_parking')}</Text>
    </View>
  );
};

export default SearchParking;
