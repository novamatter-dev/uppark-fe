import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
//style
import style from "./style";
//compoenents
import NativeBaseBackButton from "../NativeBaseBackButton";
import PropTypes from "prop-types";
//libs
import { useNavigation } from "@react-navigation/native";

const Header = (props) => {
  const { isLoading = false, title = "", navScreen = "" } = props;
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <NativeBaseBackButton
        isLoading={false}
        style={style.backButton}
        handleOnPress={() => navigation.navigate(navScreen)}
      />
      <Text style={style.headerTitle}>{title}</Text>
    </View>
  );
};
Header.propTypes = {
  title: PropTypes.string,
  navScreen: PropTypes.string,
  isLoading: PropTypes.bool,
};
export default Header;
