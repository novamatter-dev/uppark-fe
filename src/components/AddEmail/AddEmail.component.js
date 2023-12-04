import React from "react";
import {
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Box } from "native-base";
import BaseInput from "../BaseInput";
import KeyboardView from "../KeyboardView";
import {
  NativeBaseBackButton,
  NativeBaseButton,
  Title,
} from "../index";
import AddEmailStyle from "./AddEmail.style";
import PropTypes from "prop-types";
import emailBlue from "../../assets/icons/emailBlue.png";

const AddEmail = (props) => {
  const {
    onClosePress,
    onConfirmPress,
    isDisabled,
    isLoading,
    value,
    onChangeText,
    handleChangeEmail
  } = props;

  return (
    <SafeAreaView style={AddEmailStyle.safeAreaContainer}>
      <KeyboardView boxStyle={AddEmailStyle.container}>
        <NativeBaseBackButton
          style={AddEmailStyle.closeButton}
          handleOnPress={onClosePress}
          iconType={"exit"}
        />
        <Box style={AddEmailStyle.inputContainer}>
          <Title label={"Add Email address"} style={AddEmailStyle.title} />
          <BaseInput
            style={AddEmailStyle.baseInput}
            icon={<Image style={AddEmailStyle.image} source={emailBlue} />}
            name={"emailInput"}
            placeHolder={"Add Email address"}
            keyboardType={"email-address"}
            onChangeText={handleChangeEmail}
            value={value}
          />
        </Box>
        <NativeBaseButton
          label={"CONFIRM"}
          handleOnPress={onConfirmPress}
          isDisabled={isDisabled}
          isLoading={isLoading}
        />
      </KeyboardView>
    </SafeAreaView>
  );
};

AddEmail.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddEmail;
