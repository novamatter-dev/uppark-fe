import React from "react";
import { View } from "react-native";
//style
import style from "./style";
const ScreenLayout = (props) => {
  return <View style={style.container}>{props.children}</View>;
};

export default ScreenLayout;
