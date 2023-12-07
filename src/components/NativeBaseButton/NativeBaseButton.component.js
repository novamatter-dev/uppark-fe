import {View, Text} from 'react-native';
import React from 'react';
import nativeBaseButtonStyle from './NativeBaseButton.style';
import {Button} from 'native-base';

import PropTypes from 'prop-types';

const NativeBaseButton = props => {
  const {
    handleOnPress = () => {},
    isLoading,
    isDisabled,
    style,
    label,
    icon,
    iconPlacement,
    labelStyle,
    iconStyle,
    // withIconStyle,
    rightLabel,
    isFloating = false,
  } = props;

  return (
    <Button
      onPress={handleOnPress}
      isDisabled={isDisabled}
      isLoading={isLoading}
      style={
        isDisabled
          ? {
              ...nativeBaseButtonStyle.button,
              ...nativeBaseButtonStyle.isDisabled,
              ...style,
            }
          : {...nativeBaseButtonStyle.button, ...style}
      }
      primary>
      <View style={icon ? nativeBaseButtonStyle.withIcon : null}>
        {(iconPlacement === 'start' || !iconPlacement) && (
          <View style={{...nativeBaseButtonStyle.iconSpacing, ...iconStyle}}>
            {icon}
          </View>
        )}
        <Text style={{...nativeBaseButtonStyle.buttonText, ...labelStyle}}>
          {label}
        </Text>
        {iconPlacement === 'end' && (
          <View style={{...nativeBaseButtonStyle.iconSpacing, ...iconStyle}}>
            {icon}
          </View>
        )}
        {rightLabel && (
          <Text style={nativeBaseButtonStyle.rightLabel}>{rightLabel}</Text>
        )}
      </View>
    </Button>
  );
};

NativeBaseButton.propTypes = {
  handleOnPress: PropTypes.func,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isFloating: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.string,
  icon: PropTypes.element,
  labelStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  withIconStyle: PropTypes.object,
  rightLabel: PropTypes.string,
  iconPlacement: PropTypes.oneOf([null, 'start', 'end']),
};

export default NativeBaseButton;
