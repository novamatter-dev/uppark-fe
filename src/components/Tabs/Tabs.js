import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
//style
import style from './style';
//libs
import PropTypes from 'prop-types';
import {BLUE, GREY} from '../../helpers/style/constants';

const Tabs = props => {
  const {tab = 0, handleTab = () => {}} = props;
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={{
          ...style.button,
          backgroundColor: tab === 0 ? BLUE : GREY,
        }}
        onPress={() => handleTab(0)}>
        <Text style={style.btnLabel}>CARD</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...style.button,
          backgroundColor: tab === 1 ? BLUE : GREY,
        }}
        onPress={() => handleTab(1)}>
        <Text style={style.btnLabel}>SMS</Text>
      </TouchableOpacity>
    </View>
  );
};
Tabs.propTypes = {
  tab: PropTypes.number,
  handleTab: PropTypes.func,
};

export default Tabs;
