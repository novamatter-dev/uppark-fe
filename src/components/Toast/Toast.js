import React from "react";
import { View, Text } from "react-native";
import { AQUA, RED } from "../../helpers/style/constants";
import PropTypes from "prop-types";

const Toast = (props) => {
  const { message = "", type = "" } = props;
  return (
    <View
      style={{
        backgroundColor: type === "success" ? AQUA : RED,
        padding: 16,
        borderRadius: 15,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 25,
        shadowColor: type === "success" ? AQUA : RED,
      }}
    >
      <Text
        style={{
          color: "#F5F5F5",
          fontSize: 18,
          fontFamily: "AzoSans-Medium",
        }}
      >
        {message}
      </Text>
    </View>
  );
};
Toast.prototype = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default Toast;
