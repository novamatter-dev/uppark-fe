import { t } from "i18next";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NativeBaseBackButton, Title, ScreenLayout } from "../../components";
//style
import style from "./style";
//libs
import { useNavigation } from "@react-navigation/native";

const PrivacyScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <NativeBaseBackButton handleOnPress={() => navigation.goBack()} />
      <View style={style.titleContainer}>
        <Title label={t("privacy_policy")} />
      </View>
      <View style={style.textContainer}>
        <Text>PrivacyScreen screen </Text>
      </View>
    </View>
  );
};

export default PrivacyScreen;
