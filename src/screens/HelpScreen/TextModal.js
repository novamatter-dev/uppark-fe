import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
//style
import style from './styleHelp';
//libs
import PropTypes from 'prop-types';
import { ScrollView } from 'native-base';
//components
import { NativeBaseBackButton } from '../../components';

const TextModal = props => {
  const { setIsVisible = () => { }, text = '' } = props;
  return (

    <View style={style.textComponentWrapper}>
      <NativeBaseBackButton
        handleOnPress={() => setIsVisible(false)}
        style={style.backBtn}
      />
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={style.textComponentContent}>{text}</Text>
      </ScrollView>
    </View>
  );
};

TextModal.propTypes = {
  setIsVisible: PropTypes.func,
  text: PropTypes.string,
};

export default TextModal;
