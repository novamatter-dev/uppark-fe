import React from "react";
import { View, TextInput, Text } from "react-native";
//style && assets
import style from "./style";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
//libraires
import PropTypes from "prop-types";
import { GREY } from "../../helpers/style/constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const CustomInput = (props) => {
  const {
    placeholder = "",
    onChange = () => {},
    keyboardType = "default",
    leftIcon = "",
    rightIcon = "",
    maxLength = 50,
    value = "",
  } = props;

  return (
    <View style={style.container}>
      {leftIcon && (
        <View style={style.leftIconContainer}>
          <SvgXml xml={svgs[leftIcon]} width={hp(2.95)} height={hp(2.95)} />
        </View>
      )}
      <TextInput
        style={style.customInput}
        placeholder={placeholder}
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholderTextColor={GREY}
        maxLength={maxLength}
        value={value}
      />
      {rightIcon && (
        <View style={style.leftIconContainer}>
          <SvgXml xml={svgs[rightIcon]} width={hp(2.95)} height={hp(2.95)} />
        </View>
      )}
    </View>
  );
};

CustomInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  keyboardType: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
};

export default CustomInput;
