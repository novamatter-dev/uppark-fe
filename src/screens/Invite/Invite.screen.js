import React from "react";
import { View } from "react-native";
import { Box, Text, Image, HStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { NativeBaseBackButton, NativeBaseButton } from "../../components";
import { Title } from "../../components";
import InviteStyles from "./Invite.style";
import { TouchableOpacity, Share, Platform } from "react-native";
//libs
import { useTranslation } from "react-i18next";
import Clipboard from "@react-native-clipboard/clipboard";

const Invite = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onPressShare = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === "android"
            ? "https://play.google.com/store/apps/details?id=com.uppark&hl=en"
            : "https://apps.apple.com/us/app/uppark/id6446678088",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box style={InviteStyles.container}>
      <View>
        <NativeBaseBackButton
          style={InviteStyles.backButton}
          handleOnPress={() => navigation.navigate("HomePage")}
        />
        <Title style={InviteStyles.title} label={t("share_link")} />
        <Box style={InviteStyles.inputContainer}>
          <HStack>
            <Image
              style={InviteStyles.iconStyle}
              source={require("../../assets/icons/share.png")}
              alt="something"
            />
            <Text style={InviteStyles.link}>
              {Platform.OS === "android"
                ? "https://play.google.com/store/apps/details?id=com.uppark&hl=en"
                : "https://apps.apple.com/us/app/uppark/id6446678088"}
            </Text>
            <TouchableOpacity
              style={InviteStyles.copyIconStyle}
              onPress={() =>
                Clipboard.setString(
                  Platform.OS == "android"
                    ? "Future link here Android"
                    : "Future link here iOs"
                )
              }
            >
              <Image
                style={InviteStyles.copyIconStyle}
                source={require("../../assets/icons/copy.png")}
                alt="something"
              />
            </TouchableOpacity>
          </HStack>
        </Box>
      </View>
      <NativeBaseButton
        style={InviteStyles.inviteButton}
        label={t("send_invite")}
        handleOnPress={() => onPressShare()}
      />
    </Box>
  );
};

export default Invite;
