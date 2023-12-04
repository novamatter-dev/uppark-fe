import React from "react";
import { Text as TextNative } from "react-native";
import TextStyle from "./Text.style";

const Text = (props) => {
  const { children, style } = props;
  return (
    <TextNative style={{ ...TextStyle.container, ...style }}>
      {children}
    </TextNative>
  );
};

export default Text;
