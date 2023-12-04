import React from "react";
import { SafeAreaView, View, Text } from "react-native";
//style && assets
import { AQUA } from "../../helpers/style/constants";
//libraries
import { Box, useToast } from "native-base";
//components
import KeyboardView from "../KeyboardView";
import {
  ButtonComponent,
  CustomInput,
  NativeBaseBackButton,
  Title,
} from "../index";
import AddPhoneStyle from "./AddPhone.style";
import PropTypes from "prop-types";
//redux
import { setPhoneNumber } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

const AddEmail = (props) => {
  const { onClosePress, onConfirmPress, isDisabled } = props;

  const dispatch = useDispatch();

  const { phoneNumber } = useSelector((state) => state.auth);

  const toast = useToast();

  const handleChangePhone = (value) => {
    dispatch(setPhoneNumber({ phoneNumber: value }));
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}
          >
            <Text
              style={{
                color: "#F5F5F5",
                fontSize: 18,
                fontFamily: "AzoSans-Medium",
              }}
            >
              Phone number was added !
            </Text>
          </View>
        );
      },
    });
  };

  return (
    <SafeAreaView style={AddPhoneStyle.safeAreaContainer}>
      <KeyboardView boxStyle={AddPhoneStyle.container}>
        <NativeBaseBackButton
          style={AddPhoneStyle.closeButton}
          handleOnPress={onClosePress}
          iconType={"exit"}
        />
        <Box style={AddPhoneStyle.inputContainer}>
          <Title label={t("add_phone")} style={AddPhoneStyle.title} />
          <View style={{ marginTop: 25, width: "100%" }}>
            <CustomInput
              leftIcon={"phone"}
              placeholder={t("add_phone")}
              onChange={handleChangePhone}
              value={phoneNumber}
              keyboardType={"numeric"}
            />
          </View>
        </Box>
        <ButtonComponent
          text={t("confirm").toUpperCase()}
          isDisabled={isDisabled}
          onPress={() => {
            onConfirmPress();
            handleSuccessToast();
          }}
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
