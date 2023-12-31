import {Button} from 'native-base';
import {View} from 'react-native';
import React from 'react';
import nativeBaseBackButtonStyle from './NativeBaseBackButton.style';
import PropTypes from 'prop-types';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import {RED, WHITE} from '../../helpers/style/constants';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const NativeBaseBackButton = props => {
  const {
    handleOnPress,
    isLoading = false,
    iconType,
    style,
    disabled = false,
  } = props;

  const HandleIcon = () => {
    switch (iconType) {
      case 'exit':
        return <SvgXml xml={svgs.stop} width={hp(2.7)} height={hp(2.7)} />;
      case 'search':
        return (
          <SvgXml
            xml={disabled ? svgs.searchDisabled : svgs.search}
            width={hp(2.95)}
            height={hp(2.95)}
          />
        );
      case 'menu':
        return (
          <SvgXml
            xml={svgs.burgerMenu}
            width={hp(2.95)}
            height={hp(2.46)}
            fill={WHITE}
          />
        );
      case 'back':
        return <SvgXml xml={svgs.arrowLeft} width={hp(2.7)} height={hp(2.7)} />;
      default:
        return <SvgXml xml={svgs.arrowLeft} width={hp(2.7)} height={hp(2.7)} />;
    }
  };

  return (
    <>
      <View>
        <Button
          onPress={handleOnPress}
          isLoading={isLoading}
          style={{...nativeBaseBackButtonStyle.button, ...style}}
          disabled={disabled}>
          <View style={nativeBaseBackButtonStyle.icon}>
            {/* <Image source={handleGetIconType()} /> */}
            {/* <SvgXml xml={handleGetIconType()} width={22} height={22} /> */}
            <HandleIcon />
          </View>
        </Button>
      </View>
    </>
  );
};

NativeBaseBackButton.propTypes = {
  handleOnPress: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.element,
  style: PropTypes.object,
  iconType: PropTypes.oneOf([null, 'back', 'exit', 'search', 'menu']),
};

export default NativeBaseBackButton;
