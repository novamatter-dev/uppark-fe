import React from "react";
import { Box } from "native-base";
import PropTypes from "prop-types";
import KeyboardViewStyle from "./KeyboardView.style";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

const KeyboardView = (props) => {
  const { boxStyle, children } = props;

  return (
    <KeyboardAvoidingView
      style={KeyboardViewStyle.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box style={{ ...KeyboardViewStyle.container, ...boxStyle }}>
          {children}
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

KeyboardView.propTypes = {
  boxStyle: PropTypes.object,
};

export default KeyboardView;
