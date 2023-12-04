import React, { useEffect } from "react";
import { Alert, BackHandler } from "react-native";
import LoginEmail from "./LoginEmail";
// import LoginPhone from "./Components/LoginPhone/LoginPhone.component";
import { LoginPhone } from "./Components";

const Login = ({ route }) => {
  const handleBackButton = () => {
    Alert.alert("Are you sure you want to exit ?", "", [
      {
        text: "NO",
        onPress: () => {
          // console.log("Cancel Pressed");
        },
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => handleBackButton());

    return BackHandler.removeEventListener("hardwareBackPress", () =>
      handleBackButton()
    );
  }, []);

  return (
    <>
      {/* <LoginEmail /> */}
      <LoginPhone />
    </>
  );
};

export default Login;
