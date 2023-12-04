import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
//style && assets
import style from "./style";
import svgs from "../../assets/svgs";
import { RED } from "../../helpers/style/constants";
//libs
import { SvgXml } from "react-native-svg";
import { t } from "i18next";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
//redux
import { useUpdateFcmTokenMutation } from "../../services/notifications";
import {
  clearToken,
  resetAuthState,
} from "../../redux/features/auth/authSlice";
import { resetCarsState } from "../../redux/features/cars/carsSlice";
import { resetNotificationsState } from "../../redux/features/notifications/notificationSlice";
import { resetParkingState } from "../../redux/features/parkings/parkingsSlice";
import { resetUserState } from "../../redux/features/users/userSlice";
import { useDispatch } from "react-redux";

const CustomDrawer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [updateToken] = useUpdateFcmTokenMutation();

  const handleNav = (screen) => {
    navigation.navigate(screen);
  };

  const handleMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const updateFcmToken = async () => {
    const id = await DeviceInfo.getUniqueId();
    const body = {
      newFirbaseToken: "",
      deviceId: id,
    };
    await updateToken(body);
  };

  // TODO: check Error: apiClient is null
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut().then(() => {
        console.log("ggl sign out ");
        updateFcmToken();
      });
      // this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }

    dispatch(clearToken());
    dispatch(resetAuthState());
    dispatch(resetCarsState());
    dispatch(resetNotificationsState());
    dispatch(resetParkingState());
    dispatch(resetUserState());
    navigation.navigate("Login", { paramPropKey: "paramPropValue" });
  };

  return (
    <View style={style.container}>
      <View style={style.bodyContainer}>
        <View style={style.linksContainer}>
          <TouchableOpacity
            style={style.item}
            onPress={() => handleNav("Profile")}
          >
            <SvgXml xml={svgs.profile} width={22} height={25} />
            <Text style={style.label}>{t("profile").toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() => handleNav("Wallet")}
          >
            <SvgXml xml={svgs.wallet} width={22} height={25} />
            <Text style={style.label}>{t("wallet").toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() => handleNav("Settings")}
          >
            <SvgXml xml={svgs.settings} width={22} height={25} />
            <Text style={style.label}>{t("settings").toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() => handleNav("Invite")}
          >
            <SvgXml xml={svgs.star} width={22} height={25} />
            <Text style={style.label}>{t("invite_friends").toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() => handleNav("Help")}
          >
            <SvgXml xml={svgs.questionMark} width={22} height={25} />
            <Text style={style.label}>{t("help").toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={style.logOutContainer}>
          <TouchableOpacity style={style.item} onPress={handleLogout}>
            <SvgXml xml={svgs.log_out} width={22} height={25} />
            <Text style={style.label}>{t("log_out").toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        <View style={style.closeContainer}>
          <TouchableOpacity style={style.closeBnt} onPress={handleMenu}>
            <SvgXml xml={svgs.close} width={22} height={25} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawer;
