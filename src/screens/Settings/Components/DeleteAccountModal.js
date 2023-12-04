import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
//style
import style from "./style";
import { BLUE, PLATINUM, RED, WHITE } from "../../../helpers/style/constants";
//libs
import PropTypes from "prop-types";
import { t } from "i18next";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import DeviceInfo from "react-native-device-info";
//redux
import { useDeleteAccountMutation } from "../../../services/users";
import { useDispatch } from "react-redux";
import {
  clearToken,
  resetAuthState,
} from "../../../redux/features/auth/authSlice";
import { resetCarsState } from "../../../redux/features/cars/carsSlice";
import { resetNotificationsState } from "../../../redux/features/notifications/notificationSlice";
import { resetParkingState } from "../../../redux/features/parkings/parkingsSlice";
import { resetUserState } from "../../../redux/features/users/userSlice";
import { useUpdateFcmTokenMutation } from "../../../services/notifications";

const DeleteAccount = (props) => {
  const { handleNo = () => {}, handleDelete = () => {} } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [deleteAccount] = useDeleteAccountMutation();
  const [updateToken] = useUpdateFcmTokenMutation();

  const handleDeleteAccount = async () => {
    await deleteAccount()
      .then(() => {
        handleLogout();
        handleDelete();
      })
      .catch((err) => {
        console.log("delete account err: ", err);
      });
  };

  const updateFcmToken = async () => {
    const id = await DeviceInfo.getUniqueId();
    const body = {
      newFirbaseToken: "",
      deviceId: id,
    };
    await updateToken(body);
  };

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
      <Text style={style.title}>
        Are you sure you want to delete your account ?
      </Text>

      <View style={style.btnContainer}>
        <TouchableOpacity
          style={{ ...style.btn, backgroundColor: "transparent" }}
          onPress={handleDeleteAccount}
        >
          <Text style={{ ...style.btnLabel, color: RED }}>{t("yes")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...style.btn, backgroundColor: PLATINUM }}
          onPress={handleNo}
        >
          <Text style={style.btnLabel}>{t("no")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
DeleteAccount.propTypes = {
  handleNo: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default DeleteAccount;
