import React from "react";
import { View, TextInput, Text } from "react-native";
//style
import style from "./style";
import svgs from "../../assets/svgs";
//libraries
import { SvgXml } from "react-native-svg";
import { GREY } from "../../helpers/style/constants";
import PropTypes from "prop-types";

const CustomSearchBox = (props) => {
  const { placeholder = "", handleChange = () => {}, value = "" } = props;

  return (
    <View style={style.conatienr}>
      <View style={style.iconContainer}>
        <SvgXml xml={svgs.search} width={24} height={24} />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={GREY}
        style={style.input}
        onChangeText={handleChange}
        value={value}
      />
    </View>
  );
};

CustomSearchBox.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
};

export default CustomSearchBox;
