import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//style && assets
import style from './style';
import {RED, PLATINUM, BLACK} from '../../helpers/style/constants';
//libs
import PropTypes from 'prop-types';
import {t} from 'i18next';

const ActionModal = props => {
  const {
    handleNo = () => {},
    handleYes = () => {},
    text = '',
    isAction = true,
    reverseButtons = false,
  } = props;
  return (
    <View style={style.container}>
      <Text style={style.title}>{text}</Text>

      <View
        style={{
          ...style.btnContainer,
          flexDirection: reverseButtons ? 'column-reverse' : 'column',
        }}>
        {isAction && (
          <>
            <TouchableOpacity
              style={{
                ...style.btn,
                backgroundColor: reverseButtons ? PLATINUM : 'transparent',
              }}
              onPress={handleYes}>
              <Text
                style={{
                  ...style.btnLabel,
                  color: reverseButtons ? BLACK : RED,
                }}>
                {t('yes')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...style.btn,
                backgroundColor: reverseButtons ? 'transparent' : PLATINUM,
              }}
              onPress={() => handleNo()}>
              <Text
                style={{
                  ...style.btnLabel,
                  color: reverseButtons ? RED : BLACK,
                }}>
                {t('no')}
              </Text>
            </TouchableOpacity>
          </>
        )}
        {!isAction && (
          <TouchableOpacity
            style={{...style.btn, backgroundColor: PLATINUM}}
            onPress={() => handleNo()}>
            <Text style={{...style.btnLabel, color: RED}}>OK</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

ActionModal.propTypes = {
  handleNo: PropTypes.func,
  handleYes: PropTypes.func,
  text: PropTypes.string,
  isAction: PropTypes.bool,
  reverseButtons: PropTypes.bool,
};

export default ActionModal;
