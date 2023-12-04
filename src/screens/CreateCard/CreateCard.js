import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
//style && assets
import svgs from "../../assets/svgs";
import style from "./style";
import { BLUE } from "../../helpers/style/constants";
//componenets
import {
  NativeBaseBackButton,
  Title,
  ButtonComponent,
  Toast,
} from "../../components";
import BaseInput from "../../components/BaseInput";
import { SvgXml } from "react-native-svg";
import ActionModal from "../../components/ActionModal/ActionModal";
//libraires
import PropTypes from "prop-types";
import moment from "moment";
import { useToast, Actionsheet } from "native-base";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
//redux
import { useDispatch } from "react-redux";
import {
  useCreateCardMutation,
  useGetCardsMutation,
} from "../../services/wallets";
import { t } from "i18next";

const CreateCard = () => {
  const navigation = useNavigation();

  const toast = useToast();

  const [createCard] = useCreateCardMutation();
  const [getCards] = useGetCardsMutation();

  const [formState, setFormState] = useState({
    cardNumber: null,
    expirationMonth: null,
    expirationYear: null,
    holderName: null,
  });

  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetCards = async () => {
    await getCards();
  };

  const isYearValid = () => {
    // return Number(formState.expirationYear) >= new Date().getFullYear();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (
      formState?.expirationYear < currentYear ||
      (formState?.expirationYear === currentYear &&
        formState?.expirationMonth < currentMonth)
    ) {
      // return false;
      setIsInvalidDate(true);
    } else if (
      formState?.expirationMonth < 1 ||
      formState?.expirationMonth > 12
    ) {
      // return false;
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
      setModalVisible(true);
    }
    // return true;
    // setIsInvalidDate(false);
  };

  const year = moment(new Date()).format("yyyy");
  const currentMonth = moment(new Date()).format("MM");

  const handleSubmit = async () => {
    setIsLoading(true);
    const currentYear = moment(new Date()).format("yyyy");
    const currentMonth = moment(new Date()).format("M");

    const body = {
      cardNumber: formState.cardNumber,
      expirationMonth: formState.expirationMonth,
      expirationYear: formState.expirationYear,
      holderName: formState.holderName,
      netopiaToken: "string",
      netopiaTokenExpirationDate: "2023-01-05T17:24:10.688Z",
    };

    if (
      formState.expirationYear === currentYear &&
      formState.expirationMonth <= currentMonth
    ) {
      setIsInvalidDate(true);
    } else {
      if (body.cardNumber && !isInvalidDate) {
        setIsInvalidDate(false);
        await createCard(body)
          .then((answer) => {
            handleSuccessToast();
            handleGetCards();
            setFormState({
              cardNumber: null,
              expirationMonth: null,
              expirationYear: null,
              year: null,
              holderName: null,
            });
            setModalVisible(false);
            setIsLoading(false);
            navigation.navigate("Wallet");
            handleSuccessToast();
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("ERR createCard >>> ", err);
          });
      } else {
        setIsLoading(false);
        handleCustomToast("A aparut o eroare", "danger");
      }
    }
  };

  const handleNav = () => {
    navigation.navigate("Wallet");
    setFormState({
      cardNumber: null,
      expirationMonth: null,
      expirationYear: null,
      year: null,
      holderName: null,
    });
  };

  const handleChange = (event, name) => {
    let val = 0;
    // if (name === "expirationMonth") {
    //   val =
    //     (event.length === 2 && parseInt(event) < 1) || parseInt(event) > 12
    //       ? 1
    //       : parseInt(event);
    // } else {
    val = event;
    // }
    setFormState((formState) => ({
      ...formState,
      [name]: name === "cardNumber" ? event : val,
    }));
  };

  const handleModal = () => {
    isYearValid();
    // setModalVisible(true);
  };

  const handleYes = () => {
    handleSubmit();
  };
  const handleNo = () => {
    setModalVisible(false);
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return <Toast message={t("card_added")} type={"success"} />;
      },
    });
  };
  const handleCustomToast = (message, type) => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return <Toast message={message} type={type} />;
      },
    });
  };

  const validateDate = (inputMonth, inputYear) => {
    const monthValue = parseInt(inputMonth);
    const yearValue = parseInt(inputYear);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Verifică dacă ambele input-uri sunt numere valide
    if (isNaN(monthValue) || isNaN(yearValue)) {
      return false;
    }

    // Verifică dacă luna este între 1 și 12
    if (monthValue < 1 || monthValue > 12) {
      return false;
    }

    // Verifică dacă anul este în viitor sau egal cu anul curent
    if (
      yearValue < currentYear ||
      (yearValue === currentYear && monthValue < currentMonth)
    ) {
      return false;
    }

    return true;
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currMonth = currentDate.getMonth();

  const showInvalidDate = () => {
    if (!formState?.expirationYear && !formState?.expirationMonth) return false;
    if (!formState?.expirationYear) {
      return true;
    } else {
      if (!formState?.expirationMonth) {
        return true;
      } else {
        if (
          !(formState?.expirationMonth > 0 && formState?.expirationMonth < 13)
        )
          return true;
        if (formState.expirationYear.length < 4) return true;
        if (formState?.expirationYear < currentYear) {
          return true;
        } else if (
          formState?.expirationYear == currentYear &&
          formState?.expirationMonth < currentMonth
        ) {
          return true;
        }
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={style.container}>
        <View style={{ width: "100%" }}>
          <View
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <NativeBaseBackButton
              style={style.closeButton}
              handleOnPress={() => handleNav()}
              iconType={"exit"}
            />
          </View>

          <View style={style.inputContainer}>
            <View style={style.titleContianer}>
              <Title label={t("add_card")} style={style.title} />
            </View>
            {formState?.cardNumber?.length > 0 &&
              formState?.cardNumber?.length < 16 && (
                <Text style={style.invalidLabel}>
                  {t("card_langht_validation")}
                </Text>
              )}
            <BaseInput
              style={style.baseInput}
              icon={
                <SvgXml
                  xml={
                    formState?.cardNumber?.length < 1 ||
                    formState?.cardNumber === null
                      ? svgs.cardDisabled
                      : formState?.cardNumber?.length < 16 ||
                        formState?.cardNumber?.length > 16
                      ? svgs.cardDanger
                      : svgs.card
                  }
                  width={22}
                  height={22}
                />
              }
              maxLength={16}
              name={svgs.copy}
              placeHolder={t("card_number")}
              onChangeText={(event) => handleChange(event, "cardNumber")}
              value={formState.cardNumber}
              keyboardType="numeric"
              isInvalid={
                formState?.cardNumber?.length > 0 &&
                formState?.cardNumber?.length < 16
                  ? true
                  : false
              }
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              {!isInvalidDate && showInvalidDate() && (
                <Text
                  style={{
                    fontSize: 12,
                    color: "red",
                    fontFamily: "AzoSans-Bold",
                  }}
                >
                  {t("invalid_date")}
                </Text>
              )}
            </View>

            <View style={style.rowContainer}>
              <BaseInput
                style={style.rowInput}
                icon={
                  !isInvalidDate ? (
                    <SvgXml
                      xml={
                        !formState?.expirationMonth
                          ? svgs.copyDisabled
                          : showInvalidDate()
                          ? svgs.copyDanger
                          : svgs.drivingLicense
                      }
                      width={22}
                      height={22}
                    />
                  ) : (
                    <SvgXml xml={svgs.copyDanger} width={22} height={22} />
                  )
                }
                name={svgs.copy}
                placeHolder={t("month")}
                onChangeText={(event) => handleChange(event, "expirationMonth")}
                value={formState?.expirationMonth || ""}
                keyboardType="numeric"
                maxLength={2}
              />

              <View style={style.rowInput}>
                <BaseInput
                  icon={
                    <SvgXml
                      xml={
                        !formState?.expirationYear
                          ? svgs.copyDisabled
                          : showInvalidDate()
                          ? svgs.copyDanger
                          : svgs.drivingLicense
                      }
                      width={22}
                      height={22}
                    />
                  }
                  name={svgs.copy}
                  placeHolder={t("year")}
                  onChangeText={(event) =>
                    handleChange(event, "expirationYear")
                  }
                  value={formState.expirationYear || ""}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>

            {formState?.holderName?.length > 0 &&
              formState?.holderName?.length < 3 && (
                <Text style={style.invalidLabel}>
                  {/* {t("card_langht_validation")} */}
                  {t("holder_name_validation")}
                </Text>
              )}
            <BaseInput
              style={style.baseInput}
              icon={
                <SvgXml
                  xml={
                    formState?.holderName === null
                      ? svgs.profileDisabled
                      : formState?.holderName.length < 3
                      ? svgs.profileDanger
                      : svgs.profile
                  }
                  width={22}
                  height={22}
                />
              }
              name={svgs.copy}
              placeHolder={t("holder_name")}
              onChangeText={(event) => handleChange(event, "holderName")}
              value={formState.holderName || ""}
            />
            <Actionsheet
              isOpen={modalVisible}
              style={{ height: "45%", position: "absolute", bottom: 0 }}
              _backdrop={() => setModalVisible(false)}
              disableOverlay={false}
            >
              <ActionModal
                text={t("add_card_confirmation")}
                handleNo={handleNo}
                handleYes={handleYes}
                reverseButtons={true}
              />
            </Actionsheet>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <ButtonComponent
            text={t("confirm").toUpperCase()}
            onPress={() => handleModal()}
            isDisabled={
              formState?.cardNumber?.length >= 16 &&
              formState?.holderName?.length > 3 &&
              validateDate(
                formState?.expirationMonth,
                formState?.expirationYear
              )
                ? false
                : true
            }
          />
        </View>
        {isLoading && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              // backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ActivityIndicator size="large" color={BLUE} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateCard;
