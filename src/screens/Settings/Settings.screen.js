import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Linking, Platform, Switch} from 'react-native';
//style & assets
import SettingsScreenStyle from './Settings.style';
import {BLUE, GREY, WHITE} from '../../helpers/style/constants';
import thumb from '../../assets/images/thumb.png';
import svgs from '../../assets/svgs';
//components
import {
  ButtonComponent,
  NativeBaseBackButton,
  SelectLanaguage,
} from '../../components';
import {Title} from '../../components';
import DeleteAccount from './Components/DeleteAccountModal';
//libraries
import {Box, Text, HStack, Actionsheet} from 'native-base';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {useTranslation} from 'react-i18next';
import {SvgXml} from 'react-native-svg';
import DeviceInfo from 'react-native-device-info';
//redux
import {
  useGetSettingsMutation,
  useUpdateSettingsMutation,
} from '../../services/users';
import {useSelector, dispatch, useDispatch} from 'react-redux';

const Settings = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const {accountSettings} = useSelector(state => state.users);
  const appVer = DeviceInfo.getVersion();

  const [getSettings] = useGetSettingsMutation();
  const [updateSettings] = useUpdateSettingsMutation();

  const [settings, setSettings] = useState({
    allowPushNotifications: false,
    allowMarketingMaterials: false,
    notifyMeBeforeParkingEnds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleSwitchPush = async value => {
    const body = {
      allowPushNotifications: value,
      allowMarketingMaterials: settings.allowMarketingMaterials,
      notifyMeBeforeParkingEnds: settings.notifyMeBeforeParkingEnds,
    };
    await updateSettings(body)
      .then(() => {
        hnadleGetSettings();
      })
      .catch(err => {
        console.log('update settings err: ', err);
      });
  };
  const toggleSwitchMarketing = async value => {
    const body = {
      allowPushNotifications: settings?.allowPushNotifications,
      allowMarketingMaterials: value,
      notifyMeBeforeParkingEnds: settings?.notifyMeBeforeParkingEnds,
    };
    await updateSettings(body)
      .then(() => {
        hnadleGetSettings();
      })
      .catch(err => {
        console.log('update settings err: ', err);
      });
  };

  const toggleSwitchTimer = async value => {
    const body = {
      allowPushNotifications: settings?.allowPushNotifications,
      allowMarketingMaterials: settings?.allowMarketingMaterials,
      notifyMeBeforeParkingEnds: value,
    };
    await updateSettings(body)
      .then(() => {
        hnadleGetSettings();
      })
      .catch(err => {
        console.log('update settings err: ', err);
      });
  };

  const hnadleGetSettings = async () => {
    await getSettings()
      .then(answer => {
        setSettings({
          allowPushNotifications: answer?.data?.allowPushNotifications,
          allowMarketingMaterials: answer?.data?.allowMarketingMaterials,
          notifyMeBeforeParkingEnds: answer?.data?.notifyMeBeforeParkingEnds,
        });
      })
      .catch(err => {
        console.log('settings err:', err);
      });
  };

  const handleUpdateSettings = async () => {
    // integrate update settings
    await updateSettings(settings);
  };

  const handleDeleteAccount = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    hnadleGetSettings();
  }, [isFocused]);

  return (
    <Box style={SettingsScreenStyle.container}>
      <View>
        <NativeBaseBackButton
          style={SettingsScreenStyle.backButton}
          handleOnPress={() => navigation.navigate('HomePage')}
        />
        <Title style={SettingsScreenStyle.title} label={t('settings')} />
        <HStack style={SettingsScreenStyle.section}>
          <Text style={SettingsScreenStyle.switchLabel}>
            {t('select_language')}
          </Text>

          <SelectLanaguage />
        </HStack>
        <HStack style={SettingsScreenStyle.section}>
          <Text style={SettingsScreenStyle.switchLabel}>
            {t('push_notifications')}
          </Text>
          <Switch
            style={SettingsScreenStyle.switch}
            trackColor={{false: GREY, true: BLUE}}
            thumbColor={WHITE}
            ios_backgroundColor={GREY}
            onValueChange={() =>
              toggleSwitchPush(!settings.allowPushNotifications)
            }
            value={settings.allowPushNotifications}
          />
        </HStack>

        <HStack style={SettingsScreenStyle.section}>
          <Text style={SettingsScreenStyle.switchLabel}>
            {t('marketing_materials_check')}
          </Text>
          <Switch
            style={SettingsScreenStyle.switch}
            trackColor={{false: GREY, true: BLUE}}
            thumbColor={WHITE}
            ios_backgroundColor={GREY}
            onValueChange={() =>
              toggleSwitchMarketing(!settings.allowMarketingMaterials)
            }
            value={settings.allowMarketingMaterials}
          />
        </HStack>

        <Text style={SettingsScreenStyle.setTimerText}>
          {t('notify_slider_prefix')} {settings.notifyMeBeforeParkingEnds}{' '}
          {t('notify_slider_sufix')}
        </Text>
        <Slider
          style={SettingsScreenStyle.slider}
          step={5}
          minimumValue={5}
          maximumValue={30}
          minimumTrackTintColor={BLUE}
          maximumTrackTintColor={GREY}
          onSlidingComplete={val => toggleSwitchTimer(val)}
          thumbImage={thumb}
          disabled={!settings.allowPushNotifications}
          value={settings.notifyMeBeforeParkingEnds}
        />

        <TouchableOpacity>
          <Text
            style={SettingsScreenStyle.setTimerText}
            onPress={() =>
              Linking.openURL('https://uppark.io/termeni-si-conditii/')
            }>
            {t('terms_and_conditions')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={SettingsScreenStyle.setTimerText}
            onPress={() =>
              Linking.openURL('https://uppark.io/politica-de-confidentialitate')
            }>
            {t('privacy_policy')}
          </Text>
        </TouchableOpacity>
        <Text style={SettingsScreenStyle.versionText}>
          {/* {t("app_version")} {Platform.OS === "ios" ? "1.0.15" : "1.0.17"} */}
          {t('app_version')} {appVer}
        </Text>
      </View>

      <ButtonComponent
        text={t('delete_account')}
        isDisabled={false}
        color="red"
        onPress={handleDeleteAccount}
      />

      <Actionsheet
        isOpen={isVisible}
        // isOpen={true}
        style={{height: '45%', position: 'absolute', bottom: 0}}>
        <DeleteAccount
          handleNo={() => setIsVisible(false)}
          handleDelete={() => setIsVisible(false)}
        />
      </Actionsheet>
    </Box>
  );
};

export default Settings;
