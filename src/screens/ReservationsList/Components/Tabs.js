import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BLACK, BLUE, WHITE } from "../../../helpers/style/constants";
import style from "../style";
import PropTypes from "prop-types";

const Tabs = (props) => {
  const { handleActiveTab = () => {}, activeTab = "parkings" } = props;
  return (
    <View style={style.tabContaienr}>
      <TouchableOpacity
        style={{
          ...style.tabBtn,
          backgroundColor: activeTab === "parkings" ? BLUE : WHITE,
        }}
        onPress={() => handleActiveTab("parkings")}
      >
        <Text
          style={{
            ...style.tabLabel,
            color: activeTab === "parkings" ? WHITE : BLACK,
          }}
        >
          Parkings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...style.tabBtn,
          backgroundColor: activeTab === "sensors" ? BLUE : WHITE,
        }}
        onPress={() => handleActiveTab("sensors")}
      >
        <Text
          style={{
            ...style.tabLabel,
            color: activeTab === "sensors" ? WHITE : BLACK,
          }}
        >
          Sensors
        </Text>
      </TouchableOpacity>
    </View>
  );
};

Tabs.propTypes = {
  handleActiveTab: PropTypes.func,
  activeTab: PropTypes.string,
};

export default Tabs;
