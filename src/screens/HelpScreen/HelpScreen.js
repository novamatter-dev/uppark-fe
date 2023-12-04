import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
//style & assets
import style from "./styleHelp";
import svgs from "../../assets/svgs";
import { SvgXml } from "react-native-svg";
import FAQ from "../../assets/FAQ-intl";
import Terms from "../../assets/Terms";
import Privacy from "../../assets/Privacy";
//components
import { LiveChat, NativeBaseBackButton, Title } from "../../components";
//libraries
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { useSelector } from "react-redux";
import TextModal from "./TextModal";

const HelpScreen = () => {
  const navigation = useNavigation();

  const { language } = useSelector((state) => state.users);

  const [isVisible, setIsVisible] = useState(false);
  const [viewChat, setViewChat] = useState(false);
  const [text, setText] = useState(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleText = (item) => {
    switch (language.name) {
      case "ro":
        setText(item.ro);
        break;
      case "en":
        setText(item.en);
        break;
      case "fr":
        setText(item.fr);
        break;
      case "de":
        setText(item.de);
        break;
      case "hu":
        setText(item.hu);
        break;
      default:
        setText(item.en);
    }

    setIsVisible(true);
  };

  return (
    <View style={style.container}>
      <NativeBaseBackButton
        style={style.backBtn}
        handleOnPress={handleBack}
        iconType={"back"}
      />
      <View style={style.titleContainer}>
        <Title label={t("help")} />
      </View>

      <View style={style.bodyContainer}>
        <TouchableOpacity
          style={style.optionBtn}
          onPress={() => handleText(FAQ)}
        >
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>FAQ</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={style.optionBtn}>
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>{t("payments_methods")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.optionBtn}>
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>{t("account")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.optionBtn}>
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>{t("parking")}</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={style.optionBtn}
          onPress={() => handleText(Terms)}
        >
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>{t("terms_and_conditions")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.optionBtn}
          onPress={() => handleText(Privacy)}
        >
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>{t("privacy_policy")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.optionBtn}
          onPress={() => setViewChat(true)}
        >
          <SvgXml xml={svgs.drivingLicense} width={22} height={24} />
          <Text style={style.label}>Chat</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={style.label}>{FAQ.deFAQ}</Text> */}

      <Modal visible={isVisible} isFullScreen={true}>
        <TextModal setIsVisible={setIsVisible} text={text} />
      </Modal>
      <Modal visible={viewChat} isFullScreen={true}>
        {/* <TextModal setIsVisible={setIsVisible} text={text} /> */}
        <LiveChat handleClose={() => setViewChat(false)} />
      </Modal>
    </View>
  );
};

export default HelpScreen;
