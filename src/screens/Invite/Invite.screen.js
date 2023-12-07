import React from 'react';
import {View} from 'react-native';
import {Box, Text, Image, HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {NativeBaseBackButton, NativeBaseButton} from '../../components';
import {Title} from '../../components';
import InviteStyles from './Invite.style';
import {TouchableOpacity, Share, Platform} from 'react-native';
//libs
import {useTranslation} from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';

const Invite = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const onPressShare = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'android'
            ? 'https://play.google.com/store/apps/details?id=com.constantaparking'
            : 'https://apps.apple.com/us/app/constanta-parking/id6471258849',
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
          handleOnPress={() => navigation.navigate('HomePage')}
        />
        <Title style={InviteStyles.title} label={t('share_link')} />
        <Box style={InviteStyles.inputContainer}>
          <HStack>
            <Image
              style={InviteStyles.iconStyle}
              source={require('../../assets/icons/share.png')}
              alt="something"
            />
            {/* TODO: check for constantaparking and uppark app link store 
               // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
               */}

            <Text style={InviteStyles.link}>https://play.google.co...</Text>
            <TouchableOpacity
              style={InviteStyles.copyIconStyle}
              onPress={() =>
                Clipboard.setString(
                  Platform.OS == 'android'
                    ? 'https://play.google.com/store/apps/details?id=com.uppark&pcampaignid=web_share'
                    : 'Future link here iOs',
                )
              }>
              <Image
                style={InviteStyles.copyIconStyle}
                source={require('../../assets/icons/copy.png')}
                alt="something"
              />
            </TouchableOpacity>
          </HStack>
        </Box>
      </View>
      <NativeBaseButton
        style={InviteStyles.inviteButton}
        label={t('send_invite')}
        handleOnPress={() => onPressShare()}
      />
    </Box>
  );
};

export default Invite;
