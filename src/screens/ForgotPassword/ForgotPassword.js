import React from "react";
import { View, TouchableOpacity, Text, SafeAreaView } from "react-native";
//style && assets
import style from "./style";
import svgs from "../../assets/svgs";
//components
import { ButtonComponent, NativeBaseBackButton, Title } from "../../components";
import BaseInput from "../../components/BaseInput";
//libraries
import { useNavigation } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
//redux
import { useDispatch } from "react-redux";
import { WHITE } from "../../helpers/style/constants";
import { t } from "i18next";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    console.log("reset password");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View style={style.container}>
        <NativeBaseBackButton
          style={{ backgroundColor: WHITE, marginBottom: 40 }}
          handleOnPress={handleBack}
        />

        <Title label={t("forgot_password")} />

        <View style={style.inputsContainer}>
          <BaseInput
            style={style.inputItem}
            icon={<SvgXml xml={svgs.mail} width={22} height={24} />}
            name={"email"}
            placeHolder={t("email_address")}
            keyboardType={"email-address"}
            //   onChangeText={(text) =>
            //     handleChangeLoginEmail({
            //       type: "email",
            //       text,
            //     })
            //   }
          />

          <BaseInput
            style={style.inputItem}
            icon={<SvgXml xml={svgs.pwIcon} width={22} height={24} />}
            rightIcon={true}
            name={"password"}
            placeHolder={t("password")}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={style.btnContainer}>
        <ButtonComponent
          text={t("confirm").toUpperCase()}
          isDisabled={false}
          onPress={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
