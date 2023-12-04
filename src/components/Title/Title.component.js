import React from "react";
import titleComponentStyle from "./Title.style";
import { Text } from "react-native";

const Title = (props) => {
  const { label, style } = props;

  return <Text style={{...titleComponentStyle.title, ...style}}>{label}</Text>;
};

export default Title;
