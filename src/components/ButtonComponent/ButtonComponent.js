import React from "react";
import { TouchableOpacity, Text } from "react-native";
//style
import style from "./style";
import { BLUE, GREY, RED, WHITE } from "../../helpers/style/constants";
//components
import { Toast } from "../../components/Toast";
//libs
import PropTypes from "prop-types";
import { useToast } from "native-base";
//redux
import { useSelector } from "react-redux";

const ButtonComponent = (props) => {
  const {
    text = "",
    onPress = () => {},
    isDisabled = false,
    color = BLUE,
    labelColor = WHITE,
  } = props;

  const toast = useToast();

  const { hasInternetConnection } = useSelector((state) => state.users);

  const handlePress = () => {
    if (hasInternetConnection) {
      onPress();
    } else {
      handleNoInternet();
    }
  };

  const handleNoInternet = () => {
    toast.show({
      placement: "top",
      duration: null,
      render: () => {
        return (
          <ToastComponent message={t("internet_connection")} type={"danger"} />
        );
      },
    });
  };

  return (
    <TouchableOpacity
      style={{
        ...style.container,
        backgroundColor: isDisabled ? GREY : color,
      }}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <Text style={{ ...style.btnlabel, color: labelColor }}>{text}</Text>
    </TouchableOpacity>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string,
  labelColor: PropTypes.string,
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default ButtonComponent;
