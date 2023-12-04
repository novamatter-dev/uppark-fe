import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NativeModules,
  Platform,
  Linking,
  View,
  Text,
  PermissionsAndroid,
} from "react-native";
import {
  SmsConfirmCode,
  Splash,
  Login,
  ParkFromScreen,
  PaymentDetails,
  ActiveParking,
  AddCar,
  QrScanner,
  HelpScreen,
  ReservartionDetailsScreen,
  TermsScreen,
  PrivacyScreen,
} from "../screens";
import style from "./updateStyle";
import MainDrawerNavigation from "./drawerNavigation";
import { setError } from "../redux/features/auth/authSlice";
import { LoginPhone } from "../screens/Login/Components";
import Register from "../screens/Login/Register";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
//libraries
import NetInfo from "@react-native-community/netinfo";
import { useToast, Actionsheet } from "native-base";
import messaging from "@react-native-firebase/messaging";
import { useTranslation } from "react-i18next";
import DeviceInfo from "react-native-device-info";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
//components
import { Toast, NotificationPopup, ButtonComponent } from "../components";
import LoginEmail from "../screens/Login/LoginEmail";
import { t } from "i18next";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setInternetConnection } from "../redux/features/users/userSlice";
import { setLanguage } from "../redux/features/users/userSlice";
import { useCheckForUpdatesMutation } from "../services/notifications";
import { BLACK, PLATINUM, RED, WHITE } from "../helpers/style/constants";

const Stack = createNativeStackNavigator();

const MainStackNavigation = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { error } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.users);
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  const [checkForUpates] = useCheckForUpdatesMutation();

  const [update, setUpdate] = useState({
    showNotification: false,
    link: "",
  });

  const screenListeners = {
    focus: () => {
      // do something when screen opens & is focused
      dispatch(setError({ status: null, message: null }));
    },
    blur: () => {
      // do something when scree is closed OR dismissed (in iOS)
      dispatch(setError({ status: null, message: null }));
    },
  };

  const handleCheckForUpates = async () => {
    const appVer = DeviceInfo.getVersion();
    const body = {
      platform: Platform.OS.toUpperCase(),
      clientVersion: appVer,
    };
    await checkForUpates(body)
      .then((answer) => {
        if (answer?.data?.needsUpdate) {
          setUpdate({
            showNotification: true,
            link: "answer?.data?.updateLink",
          });
        }
      })
      .catch((err) => {
        console.log("checkForUpates err: ", err);
      });
  };

  const handleOpenLink = async () => {
    await Linking.openURL(update?.link);
    // setShowStore(true);
  };

  const checkApplicationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkApplicationPermission();
    // if (error?.message) {
    //   toast.show(error.message, {
    //     type: error?.type || "normal",
    //     placement: "bottom",
    //     duration: 4000,
    //     offset: 30,
    //     animationType: "slide-in",
    //   });
    // }
    if (error.status === 401) {
      toast.show({
        id: id,
        placement: "top",
        duration: null,
        render: () => {
          return <Toast message={"Unauthorized!"} type={"danger"} />;
        },
      });
      navigation.navigate("Login");
    }
  }, [error]);

  const id = "internet-toast";

  const languages = [
    {
      name: "en",
      label: "English",
    },
    {
      name: "ro",
      label: "Romana",
    },
    {
      name: "fr",
      label: "French",
    },
    {
      name: "de",
      label: "Deutsch",
    },
    {
      name: "hu",
      label: "Magyar",
    },
  ];

  const handleLanguage = () => {
    const nativeLocale =
      Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    const locale = nativeLocale.split("_");
    const fallBack = locale[0];

    const lang = languages?.find((el) => el.name === fallBack);
    dispatch(setLanguage(lang));
  };

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language?.name);
    } else {
      // console.log("nativeLocale", nativeLocale);
      handleLanguage();
    }
    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        if (!toast.isActive(id)) {
          toast.show({
            id: id,
            placement: "top",
            duration: null,
            render: () => {
              return (
                <Toast message={t("internet_connection")} type={"danger"} />
              );
            },
          });
        }
        dispatch(setInternetConnection(false));
      } else {
        dispatch(setInternetConnection(true));
        toast.closeAll();
      }
    });
    handleCheckForUpates();
  }, []);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false, orientation: "portrait" }}
          component={Splash}
          listeners={screenListeners}
        />

        <Stack.Screen
          name={"HomeDrawer"}
          options={{
            headerShown: false,
            gestureEnabled: false,
            orientation: "portrait",
          }}
          component={MainDrawerNavigation}
        />

        <Stack.Screen
          name="Login"
          options={{ headerShown: false, orientation: "portrait" }}
          component={Login}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="LoginPhone"
          options={{ headerShown: false, orientation: "portrait" }}
          component={LoginPhone}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="LoginEmail"
          options={{ headerShown: false, orientation: "portrait" }}
          component={LoginEmail}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="Register"
          options={{ headerShown: false, orientation: "portrait" }}
          component={Register}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false, orientation: "portrait" }}
          component={ForgotPassword}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="SmsConfirmCode"
          options={{ headerShown: false, orientation: "portrait" }}
          component={SmsConfirmCode}
          listeners={screenListeners}
        />

        <Stack.Screen
          name="ParkFromScreen"
          options={{ headerShown: false, orientation: "portrait" }}
          component={ParkFromScreen}
        />

        <Stack.Screen
          name="PaymentDetails"
          options={{ headerShown: false, orientation: "portrait" }}
          component={PaymentDetails}
        />

        <Stack.Screen
          name="ActiveParking"
          options={{ headerShown: false, orientation: "portrait" }}
          component={ActiveParking}
        />

        <Stack.Screen
          name="AddCar"
          options={{ headerShown: false, orientation: "portrait" }}
          component={AddCar}
        />
        {/* <Stack.Screen
          name="QrScanner"
          options={{ headerShown: false }}
          component={QrScanner}
        /> */}
        <Stack.Screen
          name="HelpScreen"
          options={{ headerShown: false, orientation: "portrait" }}
          component={HelpScreen}
        />
        <Stack.Screen
          name="ReservartionDetailsScreen"
          options={{ headerShown: false, orientation: "portrait" }}
          component={ReservartionDetailsScreen}
        />
        <Stack.Screen
          name="TermsScreen"
          options={{ headerShown: false, orientation: "portrait" }}
          component={TermsScreen}
        />
        <Stack.Screen
          name="PrivacyScreen"
          options={{ headerShown: false, orientation: "portrait" }}
          component={PrivacyScreen}
        />
      </Stack.Navigator>

      {update?.showNotification && (
        <View style={style.updateNotificationContainer}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Text style={style.title}>{t("update_avaiable")}</Text>
            <Text style={style.text}>{t("update_text")}</Text>
          </View>
          <View style={style.btnContainer}>
            <ButtonComponent
              text={t("later").toUpperCase()}
              onPress={() => setUpdate({ showNotification: false })}
              color={"transparent"}
              labelColor={RED}
            />
            <ButtonComponent
              text={t("update_now").toUpperCase()}
              onPress={handleOpenLink}
              color={PLATINUM}
              labelColor={BLACK}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default MainStackNavigation;
