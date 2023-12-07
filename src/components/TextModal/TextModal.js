import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
//style
import style from "./style";
//libs
import PropTypes from "prop-types";
import { ScrollView } from "native-base";
//components
import { NativeBaseBackButton } from "../../components";

const TextModal = (props) => {
  const { setIsVisible = () => {}, text = "" } = props;
  return (
    <ScrollView>
      <View  showsVerticalScrollIndicator={false} style={style.textComponentWrapper}>
        <NativeBaseBackButton
          handleOnPress={() => setIsVisible(false)}
          style={style.backBtn}
        />
        <Text style={style.textComponentContent}>{text}</Text>
      </View>
    </ScrollView>
  );
};

TextModal.propTypes = {
  setIsVisible: PropTypes.func,
  text: PropTypes.string,
};

export default TextModal;
