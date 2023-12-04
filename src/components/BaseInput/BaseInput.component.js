import React, { useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import BasicInputStyle from "./BaseInput.style";
import { BLUE, GREY, RED } from "../../helpers/style/constants";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";

const BaseInput = (props) => {
  const {
    onChangeText = () => {},
    value = "",
    name = "",
    placeHolder = "",
    keyboardType,
    style,
    icon,
    isDisabled = false,
    onEndEditing = () => {},
    maxLength = 100,
    capitalize = "none",
    isInvalid = false,
    secureTextEntry = false,
    rightIcon,
    handleFocus = () => {},
  } = props;

  const [showPw, setShowPw] = useState(false);

  return (
    <View style={{ ...BasicInputStyle.input, ...style }}>
      <View style={BasicInputStyle.icon}>{icon}</View>
      <TextInput
        onChangeText={onChangeText}
        value={value}
        name={name}
        placeholder={placeHolder}
        keyboardType={keyboardType}
        placeholderTextColor={GREY}
        editable={!isDisabled}
        style={{
          ...BasicInputStyle.textInput,
          color: isInvalid ? RED : "black",
          paddingVertical: Platform.OS === "ios" ? 0 : 0,
        }}
        onEndEditing={onEndEditing}
        maxLength={maxLength}
        autoCapitalize={capitalize}
        secureTextEntry={showPw ? false : secureTextEntry}
        selectionColor={"green"}
        onFocus={handleFocus}
        autoComplete={"off"}
        autoCorrect={false}
      />
      {rightIcon && (
        <TouchableOpacity
          style={BasicInputStyle.rightIcon}
          onPress={() => setShowPw(!showPw)}
        >
          <View>
            <SvgXml
              xml={
                // value?.length > 0
                //   ? svgs.hiddenPassword
                //   : svgs.hiddenPasswordDisabled
                showPw
                  ? svgs.showPassword
                  : value?.length > 0
                  ? svgs.hiddenPassword
                  : svgs.hiddenPasswordDisabled
              }
              width={22}
              height={24}
              fill={"#3356FF"}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

BaseInput.propTypes = {
  onChangeText: PropTypes.func,
  name: PropTypes.string,
  placeHolder: PropTypes.string,
  keyboardType: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.element,
  value: PropTypes.any,
  isInvalid: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  handleFocus: PropTypes.func,
  capitalize: PropTypes.string,
};

export default BaseInput;
