import React, { useState } from "react";
import {
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
//style && assets
import LoginStyle from "../../Login.style";
import LoginPhoneStyle from "./LoginPhone.style";
//components
import Dropdown from "../../../../components/Dropdown/Dropdown";
import { Box } from "native-base";
import { ButtonComponent, Title, Toast } from "../../../../components";
import { dialCodes } from "../../../../constants/dialCodes";
//libraries
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";
import { SvgXml, Svg } from "react-native-svg";
//redux
import { usePostCreatePhoneNumberMutation } from "../../../../services/auth";
import { setPhoneNumber } from "../../../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { BLUE } from "../../../../helpers/style/constants";
import { t } from "i18next";

const LoginPhone = (props) => {
  const { error } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const { hasInternetConnection } = useSelector((state) => state.users);

  const [number, setNumber] = useState("");
  const [prefix, setPrefix] = useState("+40");

  const [postCreatePhoneNumber, { isLoading }] =
    usePostCreatePhoneNumberMutation();

  const handleChange = (nr) => {
    setNumber(nr);
  };

  const handleSubmit = async () => {
    await postCreatePhoneNumber({
      phoneNumber: `${prefix}${number}`,
    })
      .then((answer) => {
        // if (!error.message) {
        dispatch(setPhoneNumber({ phoneNumber: `${prefix}${number}` }));
        navigation.navigate("SmsConfirmCode");
        // }
      })
      .catch((err) => {
        console.log("ERR >>>", err);
      });
  };

  const handleShowLoginForm = () => {
    navigation.navigate("LoginEmail");
  };

  const handleNoInternet = () => {
    console.log("no internet");
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return <Toast message={t("internet_connection")} type={"danger"} />;
      },
    });
  };

  return (
    <ImageBackground
      source={require("../../../../assets/images/splash.png")}
      resizeMode="cover"
      style={LoginStyle.image}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box style={LoginPhoneStyle.container}>
          <View style={LoginPhoneStyle.headerContainer}>
            <Title label={t("enter_mobile_number")} />
          </View>

          <View style={LoginPhoneStyle.dissmissKeyboardContainer}>
            <View>
              <Box style={LoginPhoneStyle.input}>
                {/* <Svg
                  style={{ backgroundColor: "red", zIndex: 100 }}
                  // fillAll="#c6ccd8"
                  width="40"
                  height="40"
                  source={require("../../../../assets/SVGFlags/ro.svg")}
                /> */}

                <Dropdown data={dialCodes} setDial={setPrefix} dial={prefix} />
                <TextInput
                  onChangeText={(event) => handleChange(event)}
                  value={number}
                  name={"phoneNumber"}
                  placeholder="Phone number"
                  placeholderTextColor={"#e3e3e3"}
                  keyboardType="numeric"
                  style={{
                    ...LoginPhoneStyle.textInput,
                    paddingVertical: Platform.OS === "ios" ? 0 : 0,
                  }}
                  disabled={isLoading}
                  maxLength={prefix === "+40" ? 9 : 15}
                />
              </Box>
            </View>

            <Box>{error && <Text>{error.message}</Text>}</Box>
          </View>
          <TouchableOpacity
            style={LoginPhoneStyle.switchToEmailBtn}
            onPress={handleShowLoginForm}
          >
            <Text style={LoginPhoneStyle.switchText}>
              {t("login_with_email")}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              position: "absolute",
              bottom: "10%",
              width: "100%",
            }}
          >
            <ButtonComponent
              text={t("confirm").toUpperCase()}
              onPress={() => {
                if (hasInternetConnection) {
                  handleSubmit();
                } else {
                  handleNoInternet();
                }
              }}
              isDisabled={number < 8 ? true : false}
            />
          </View>
        </Box>
      </TouchableWithoutFeedback>
      {isLoading && (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <ActivityIndicator size="large" color={BLUE} />
        </View>
      )}
    </ImageBackground>
  );
};

LoginPhone.prototype = {
  handleRedirect: PropTypes.func,
};

export default LoginPhone;
