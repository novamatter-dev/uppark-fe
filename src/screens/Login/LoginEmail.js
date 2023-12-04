import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
//style && assets
import LoginStyle from "./Login.style";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import AddPhoneStyle from "../../components/AddPhone/AddPhone.style";
//components
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseInput from "../../components/BaseInput";
import {
  Title,
  ButtonComponent,
  CustomInput,
  Toast as ToastComponent,
  TextModal,
} from "../../components";
//libraries
import { useNavigation } from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";
import Toast from "react-native-toast-notifications";
import jwt_decode from "jwt-decode";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  Profile,
} from "react-native-fbsdk-next";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useTranslation } from "react-i18next";
import { useToast } from "native-base";
//helpers
import { useFcmTokenUpdater } from "../../helpers/useFcmTokenUpdater";
//redux
import {
  usePostLoginWithEmailMutation,
  usePostLoginWithFbMutation,
  usePostLoginWithGoogleMutation,
  usePostLoginWithAppleMutation,
} from "../../services/auth";
import { setToken } from "../../redux/features/auth/authSlice";
import { setLoadingScreen } from "../../redux/features/notifications/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { BLUE } from "../../helpers/style/constants";

const LoginEmail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const { hasInternetConnection } = useSelector((state) => state.users);
  const { t } = useTranslation();
  const toast = useToast();

  const [postLoginWithEmail] = usePostLoginWithEmailMutation();
  const [postLoginWithFb] = usePostLoginWithFbMutation();
  const [postLoginWithGoogle] = usePostLoginWithGoogleMutation();
  const [postLoginWithApple] = usePostLoginWithAppleMutation();

  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [emailLogin, setEmailLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { updateFcmToken } = useFcmTokenUpdater();

  const toastRef = useRef();

  const handleChangeLoginEmail = ({ type, text }) => {
    setEmailLogin((prevState) => {
      return {
        ...prevState,
        [type]: text,
      };
    });
  };

  const handleLoginWithEmail = async () => {
    if (
      emailLogin?.email?.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setIsLoading(true);
      setIsInvalidEmail(false);
      let fcmtoken = await AsyncStorage.getItem("fcmtoken");
      const deviceId = await DeviceInfo.getUniqueId();
      const brand = await DeviceInfo.getBrand();
      const model = await DeviceInfo.getModel();
      const body = {
        email: emailLogin?.email,
        password: emailLogin?.password,
        device: {
          deviceType: Platform.OS,
          deviceId: deviceId,
          firebaseToken: fcmtoken,
          brand: brand,
          model: model,
          resolutionWidth: 0,
          resolutionHeight: 0,
        },
      };

      await postLoginWithEmail(body)
        .then((answer) => {
          if (answer?.error?.data) {
            setIsInvalidEmail(true);

            loginFailedMessage(answer?.error?.data);
          }
          if (answer?.data?.jwt) {
            dispatch(setToken({ jwt: answer?.data?.jwt }));
            updateFcmToken();
            navigation.navigate("HomeDrawer");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("login err: ", err);
        });
    } else {
      setIsInvalidEmail(true);
      setIsLoading(false);
    }
  };

  const handleFbLogin = async () => {
    try {
      if (Platform.OS === "android") {
        LoginManager.setLoginBehavior("web_only");
      }
      await LoginManager.logInWithPermissions(
        ["public_profile", "email"],
        "limited"
      )
        .then(
          (result) => {
            if (result.isCancelled) {
              customFacebookLogout();
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                callFacebookGraph(data?.accessToken);
              });
            }
          },
          (error) => {
            customFacebookLogout();
            setTimeout(() => {
              handleFbLogin();
            }, 1500);
          }
        )
        .catch((err) => {
          console.log("LoginManager err:  ", err);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const onGoogleAccountSuccess = async (user, accessToken) => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const brand = await DeviceInfo.getBrand();
      const model = await DeviceInfo.getModel();
      let fcmtoken = await AsyncStorage.getItem("fcmtoken");
      await GoogleSignin.signOut().then(async () => {
        try {
          const body = {
            authProvider: "Google",
            idToken: user.idToken,
            accessToken: accessToken?.accessToken,
            firstName: user.user.givenName,
            lastName: user.user.familyName,
            deviceDto: {
              deviceType: Platform.OS,
              deviceId: deviceId,
              firebaseToken: fcmtoken,
              brand: brand,
              model: model,
              resolutionWidth: 0,
              resolutionHeight: 0,
            },
          };
          // console.log("ggl signing body: ", body);
          setIsLoading(true);

          await postLoginWithGoogle(body)
            .then((answer) => {
              if (answer?.data?.jwt) {
                dispatch(setToken({ jwt: answer.data.jwt }));
                // dispatch(setLoadingScreen(false));
                setIsLoading(false);
                updateFcmToken();
                navigation.navigate("HomeDrawer");
              } else if (answer?.error) {
                loginFailedMessage(answer?.error?.error);
                setIsLoading(false);
              }
            })
            .catch(async (err) => {
              console.log("GGL SIGNING ENDPOINT ERROR >>>", err);
              try {
                await GoogleSignin.signOut().then(() => {
                  setIsLoading(false);
                });
                // this.setState({ user: null }); // Remember to remove the user from your app's state as well
              } catch (error) {
                console.error("ggl err : ", error);
              }
            });
        } catch (e) {
          console.error(e);
        }
      });
    } catch (error) {
      if (error.message === "Request timed out") {
        console.log("Timeout pentru requestul API");
      } else {
        console.log("Eroare API:", error);
      }
    }
  };

  const callFacebookGraph = async (accessToken) => {
    // customFacebookLogout(accessToken);
    const deviceId = await DeviceInfo.getUniqueId();
    const brand = await DeviceInfo.getBrand();
    const model = await DeviceInfo.getModel();
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    setIsLoading(true);
    const deviceDto = {
      deviceType: Platform.OS,
      deviceId: deviceId,
      firebaseToken: fcmtoken,
      brand: brand,
      model: model,
      resolutionWidth: 0,
      resolutionHeight: 0,
    };
    if (Platform.OS === "ios") {
      Profile.getCurrentProfile().then(async (data) => {
        const deviceId = await DeviceInfo.getUniqueId();
        console.log("getCurrentProfile", data);
        const body = {
          authProvider: "Facebook",
          accessToken: accessToken,
          idToken: accessToken,
          firstName: data?.firstName,
          lastName: data?.lastName,
          deviceDto: deviceDto,
        };

        await postLoginWithFb(body)
          .then((answer) => {
            if (answer?.data?.jwt) {
              dispatch(setToken({ jwt: answer?.data?.jwt }));
              setIsLoading(false);
              updateFcmToken();
              navigation.navigate("HomeDrawer");
            } else if (answer?.error?.data) {
              setIsLoading(false);
              loginFailedMessage(answer?.error?.data);
            }
          })
          .catch((err) => {
            console.log("FB ERR >>>", err);
            setIsLoading(false);
          });
      });
    } else {
      const responseInfoCallback = async (error, result) => {
        if (error) {
          console.log(error);
          alert("Error fetching data: " + error.toString());
        } else {
          const body = {
            authProvider: "Facebook",
            accessToken: accessToken,
            idToken: accessToken,
            firstName: result?.first_name,
            lastName: result?.last_name,
            deviceDto: deviceDto,
          };
          await postLoginWithFb(body)
            .then((answer) => {
              if (answer.data.jwt) {
                dispatch(setToken({ jwt: answer.data.jwt }));
                setIsLoading(false);
                updateFcmToken();
                navigation.navigate("HomeDrawer");
              }
            })
            .catch((err) => {
              console.log("FB ERR >>>", err);
              setIsLoading(false);
            });
        }
      };

      const infoRequest = new GraphRequest(
        "/me",
        {
          accessToken: accessToken,
          parameters: {
            fields: {
              string: "email,name,first_name,last_name",
            },
          },
        },
        responseInfoCallback
      );
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    }
  };

  const handleIosFbLogin = async () => {
    dispatch(setLoadingScreen(true));
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ])
        .then((answer) => {})
        .catch((err) => {
          console.log("err longin fb: ", err);
        });

      AccessToken.getCurrentAccessToken().then((data) => {
        if (data?.accessToken) {
          callFacebookGraph(data?.accessToken);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async () => {
    GoogleSignin.configure({
      webClientId:
        "271698093388-r9v7b4866lrg0ogv9h69bl1opolbbldm.apps.googleusercontent.com",
      // scopes: ["email"],
      offlineAccess: false,
      // forceCodeForRefreshToken: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessTokenGoogle = await GoogleSignin.getTokens();

      // console.log("userInfo", userInfo);
      // console.log("accessTokenGoogle", accessTokenGoogle);

      onGoogleAccountSuccess(userInfo, accessTokenGoogle);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        // Alert.alert("login_cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        // Alert.alert("in progress");
        console.log("in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Alert.alert("play services not available or outdated")
        console.log("play services not available or outdated");
      } else {
        // Alert.alert("Something went wrong", error.toString());
        console.log("Something went wrong: ", error.toString(), "   ", error);
      }
    }
  };

  const handleInitiateAppleLogin = async () => {
    const osVersion = await DeviceInfo.getSystemVersion();
    const deviceId = await DeviceInfo.getUniqueId();
    const brand = await DeviceInfo.getBrand();
    const model = await DeviceInfo.getModel();
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // console.log("appleAuthRequestResponse >>> ", appleAuthRequestResponse);
    setIsLoading(true);

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // console.log("credentialState >>>", credentialState);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      let appleCredentials = jwt_decode(appleAuthRequestResponse.identityToken);

      const body = {
        authorizationCode: appleAuthRequestResponse?.authorizationCode,
        authorizedScopes: appleAuthRequestResponse?.authorizedScopes,
        identityToken: appleAuthRequestResponse?.identityToken,
        nonce: appleAuthRequestResponse?.nonce,
        realUserStatus: appleAuthRequestResponse?.realUserStatus,
        user: appleAuthRequestResponse?.user,
        aud: appleCredentials?.aud,
        c_hash: appleCredentials?.c_hash,
        email: appleCredentials?.email,
        email_verified: appleCredentials?.email_verified,
        iss: appleCredentials?.iss,
        deviceDto: {
          deviceType: Platform.OS,
          deviceId: deviceId,
          firebaseToken: fcmtoken,
          brand: brand,
          model: model,
          resolutionWidth: 0,
          resolutionHeight: 0,
        },
      };

      handleAppleLogin(body);

      // console.log("appleCredentials >>>", appleCredentials);
    } else if (credentialState == appleAuth.State.REVOKED) {
      Alert.alert(translate("login_cancelled"));
    }
  };

  const handleAppleLogin = async (body) => {
    await postLoginWithApple(body)
      .then((answer) => {
        if (answer?.data?.jwt) {
          setIsLoading(false);
          dispatch(setToken({ jwt: answer?.data?.jwt }));
          updateFcmToken();
          navigation.navigate("HomeDrawer");
        } else if (answer?.error) {
          setIsLoading(false);
          loginFailedMessage(answer?.error?.data);
        }
      })
      .catch((err) => {
        console.log("Apple login err: ", err);
        // loginFailedMessage(err.message)
      });
  };

  const loginFailedMessage = (message) => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return <ToastComponent message={t(message)} type={"danger"} />;
      },
    });
  };

  const handleNav = (screen) => {
    navigation.navigate(screen);
  };

  const getInfo = async () => {
    const brand = await DeviceInfo.getModel();
  };

  const handleNoInternet = () => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return (
          <ToastComponent message={t("internet_connection")} type={"danger"} />
        );
      },
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/splash.png")}
      resizeMode="cover"
      style={LoginStyle.image}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={LoginStyle.modalContainer}>
          <View style={LoginStyle.titleContainer}>
            <Title label={t("login")} />

            <TouchableOpacity
              style={{ width: "60%", paddingVertical: 5 }}
              onPress={() => handleNav("LoginPhone")}
            >
              <Text style={LoginStyle.touchableToggleLogin}>
                {t("switch_to_phone")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={LoginStyle.bodyContainer}>
            <View>
              {isInvalidEmail && (
                <Text style={LoginStyle.invalidCredentials}>
                  {t("invalid_credentials")}
                </Text>
              )}

              <BaseInput
                style={AddPhoneStyle.baseInput}
                icon={
                  <SvgXml
                    xml={
                      isInvalidEmail
                        ? svgs.mailDanger
                        : emailLogin?.email?.length
                        ? svgs.mail
                        : svgs.mailDisabled
                    }
                    width={22}
                    height={24}
                  />
                }
                name={"email"}
                placeHolder={t("email_address")}
                keyboardType={"email-address"}
                onChangeText={(text) =>
                  handleChangeLoginEmail({
                    type: "email",
                    text,
                  })
                }
                value={emailLogin?.email}
              />
              <BaseInput
                style={AddPhoneStyle.baseInput}
                icon={
                  <SvgXml
                    xml={
                      emailLogin?.password?.length > 0
                        ? svgs.pwIcon
                        : svgs.pwIconDisabled
                    }
                    width={22}
                    height={24}
                  />
                }
                rightIcon={true}
                name={"password"}
                placeHolder={t("password")}
                onChangeText={(text) =>
                  handleChangeLoginEmail({
                    type: "password",
                    text,
                  })
                }
                value={emailLogin.password}
                secureTextEntry={true}
              />

              <TouchableOpacity
                onPress={() => {
                  handleNav("ForgotPassword");
                }}
                style={{ marginVertical: 10 }}
              >
                <Text style={LoginStyle.touchableToggleLogin}>
                  {t("forgot_password")}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={LoginStyle.socialWrapLogin}>
              <Text style={{ ...LoginStyle.registerBtn, fontSize: 12 }}>
                {t("or_login_with")}
              </Text>
              <View style={LoginStyle.socialBtnswrapper}>
                <TouchableOpacity
                  onPress={() => {
                    if (hasInternetConnection) {
                      handleGoogleLogin();
                    } else {
                      handleNoInternet();
                    }
                  }}
                  style={LoginStyle.socialIconWidth}
                >
                  <SvgXml xml={svgs.gglLogo} width={50} height={50} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (hasInternetConnection) {
                      if (Platform.OS === "android") {
                        handleFbLogin();
                      } else {
                        handleIosFbLogin();
                      }
                    } else {
                      handleNoInternet();
                    }
                  }}
                  style={LoginStyle.socialIconWidth}
                >
                  <SvgXml xml={svgs.fbLogo} width={50} height={50} />
                </TouchableOpacity>
                {Platform.OS === "ios" && (
                  <TouchableOpacity
                    onPress={() => {
                      if (hasInternetConnection) {
                        handleInitiateAppleLogin();
                      } else {
                        handleNoInternet();
                      }
                    }}
                    style={LoginStyle.socialIconWidth}
                  >
                    <SvgXml
                      xml={svgs.appleLogo}
                      width={50}
                      height={50}
                      fill="black"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Toast
              ref={toastRef}
              style={{
                zIndex: 3,
                elevation: 3,
              }}
            />

            <View>
              <TouchableOpacity
                onPress={() => {
                  if (hasInternetConnection) {
                    handleNav("Register");
                  } else {
                    handleNoInternet();
                  }
                }}
                style={{ marginVertical: 25 }}
              >
                <Text style={LoginStyle.registerBtn}>
                  {t("register").toUpperCase()}
                </Text>
              </TouchableOpacity>
              <ButtonComponent
                text={t("login").toUpperCase()}
                isDisabled={false}
                onPress={() => {
                  if (hasInternetConnection) {
                    handleLoginWithEmail();
                  } else {
                    handleNoInternet();
                  }
                }}
              />
            </View>
          </View>
        </View>
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

export default LoginEmail;
