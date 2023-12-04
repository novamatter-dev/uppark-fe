import React, { useState } from "react";
import { View, Text, TouchableOpacity, NativeModules } from "react-native";
import { Actionsheet } from "native-base";
import svgs from "../../assets/svgs";
import { SvgXml } from "react-native-svg";
import { useTranslation } from "react-i18next";
import ButtonComponent from "../ButtonComponent";
import style from "./style";
import { WHITE } from "../../helpers/style/constants";
import { t } from "i18next";
import DeviceInfo from "react-native-device-info";
//redux
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../redux/features/users/userSlice";

const SelectLanaguage = () => {
  const { i18n } = useTranslation();

  const { language } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [service, setService] = React.useState("");
  const [isVisible, setIsVisible] = useState(false);

  const languages = [
    {
      name: "en",
      label: "English",
    },
    {
      name: "ro",
      label: "Romana",
    },
    {
      name: "fr",
      label: "French",
    },
    {
      name: "de",
      label: "Deutsch",
    },
    {
      name: "hu",
      label: "Magyar",
    },
  ];

  const handleLanguace = (val) => {
    i18n.changeLanguage(val.name);
    setService(val.name);
    dispatch(setLanguage(val));
    setIsVisible(false);
  };

  const handleModal = () => {
    setIsVisible(true);
  };

  return (
    <>
      <TouchableOpacity
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        onPress={handleModal}
      >
        <SvgXml
          xml={language ? svgs[language.name] : svgs.en}
          width={16}
          height={24}
        />
        <Text
          style={{
            ...style.switchLabel,
            marginHorizontal: 8,
          }}
        >
          {language ? language.label : "Select"}
        </Text>
        <SvgXml xml={svgs.arrowDown} width={16} height={24} />
      </TouchableOpacity>

      <Actionsheet
        isOpen={isVisible}
        // isOpen={true}
        style={{ height: "45%", position: "absolute", bottom: 0 }}
      >
        <View
          style={{
            display: "flex",
            backgroundColor: "black",
            width: "100%",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: "10%",
            paddingHorizontal: "10%",
          }}
        >
          {languages?.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  marginVertical: 15,
                  alignItems: "center",
                }}
                onPress={() => handleLanguace(item)}
                key={item.name}
              >
                <SvgXml xml={svgs[item.name]} width={16} height={24} />
                <Text
                  style={{
                    ...style.switchLabel,
                    marginHorizontal: 8,
                    color: WHITE,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={{ marginTop: 20 }}>
            <ButtonComponent
              text={t("cancel")}
              isDisabled={false}
              color="red"
              onPress={() => setIsVisible(false)}
            />
          </View>
        </View>
      </Actionsheet>
    </>
    // <Center>
    //   <Box maxW="300">
    //     <Select
    //       selectedValue={service}
    //       minWidth="200"
    //       accessibilityLabel="Select language"
    //       placeholder="Select language"
    //       _selectedItem={{
    //         bg: "teal.600",
    //         endIcon: <CheckIcon size="5" />,
    //       }}
    //       mt={1}
    //       onValueChange={(itemValue) => handleLanguace(itemValue)}
    //     >
    //       {languages?.map((item) => {
    //         return (
    //           <Select.Item
    //             label={item.label}
    //             value={item.name}
    //             key={item.name}
    //           />
    //         );
    //       })}
    //     </Select>
    //   </Box>
    // </Center>
  );
};

export default SelectLanaguage;
