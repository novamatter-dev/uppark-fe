import { Text, TouchableOpacity } from "react-native";
import style from "../../reservationStyle";
import React from "react";
import { t } from "i18next";

const DownloadReceiptApple = (props) => {
  const { onShare } = props;

  return (
    <TouchableOpacity onPress={onShare}>
      <Text style={style.savePdf}>{t("save")}</Text>
    </TouchableOpacity>
  );
};

export default DownloadReceiptApple;
