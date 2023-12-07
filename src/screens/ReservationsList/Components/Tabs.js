import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {BLACK, BLUE, WHITE} from '../../../helpers/style/constants';
import style from '../style';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

const Tabs = props => {
  const {handleActiveTab = () => {}, activeTab = 'parkings'} = props;
  const {t} = useTranslation();
  return (
    <View style={style.tabContaienr}>
      <TouchableOpacity
        style={{
          ...style.tabBtn,
          backgroundColor: activeTab === 'parkings' ? BLUE : WHITE,
        }}
        onPress={() => handleActiveTab('parkings')}>
        <Text
          style={{
            ...style.tabLabel,
            color: activeTab === 'parkings' ? WHITE : BLACK,
          }}>
          {t('parkings')}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...style.tabBtn,
          backgroundColor: activeTab === 'sensors' ? BLUE : WHITE,
        }}
        onPress={() => handleActiveTab('sensors')}>
        <Text
          style={{
            ...style.tabLabel,
            color: activeTab === 'sensors' ? WHITE : BLACK,
          }}>
          {t('sensors')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Tabs.propTypes = {
  handleActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tabs;
