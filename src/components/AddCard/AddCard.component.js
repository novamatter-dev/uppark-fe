import React, { useState } from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { useToast, Actionsheet } from "native-base";
import { NativeBaseBackButton, Title, ButtonComponent } from "../index";
import BaseInput from "../BaseInput";
import ActionModal from "../ActionModal/ActionModal";
//style
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import AddCardStyle from "./AddCard.style";
import { AQUA } from "../../helpers/style/constants";
import { Toast } from "../Toast";
//redux
import {
  useCreateCardMutation,
  useGetCardsMutation,
} from "../../services/wallets";
import { useSelector } from "react-redux";
import { t } from "i18next";

const AddCard = (props) => {
  const { onClosePress } = props;

  const toast = useToast();

  const [formState, setFormState] = useState({
    cardNumber: null,
    expirationMonth: null,
    expirationYear: null,
    year: null,
    holderName: null,
  });
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const personalState = useSelector((state) => state.users.personal);

  const [createCard] = useCreateCardMutation();
  const [getCards] = useGetCardsMutation();

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
      if (body.cardNumber.length && !isInvalidDate) {
        setIsInvalidDate(false);
        await createCard(body)
          .then((answer) => {
            onClosePress();
            handleSuccessToast();
            handleGetCards();
            setModalVisible(false);

            toast.show({
              placement: "top",
              duration: 1000,
              render: () => {
                return (
                  <View
                    style={{
                      backgroundColor: AQUA,
                      padding: 16,
                      borderRadius: 15,
                      shadowColor: AQUA,
                      shadowOffset: { width: -2, height: 4 },
                      shadowOpacity: 0.9,
                      shadowRadius: 4,
                      elevation: 25,
                      shadowColor: AQUA,
                    }}
                  >
                    <Text
                      style={{
                        color: "#F5F5F5",
                        fontSize: 18,
                        fontFamily: "AzoSans-Medium",
                      }}
                    >
                      {t("card_added")}
                    </Text>
                  </View>
                );
              },
            });
          })
          .catch((err) => {
            console.log("ERR createCard >>> ", err);
          });
      } else {
        // console;
      }
    }
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
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}
          >
            <Text
              style={{
                color: "#F5F5F5",
                fontSize: 18,
                fontFamily: "AzoSans-Medium",
              }}
            >
              Card was added your wallet !
            </Text>
          </View>
        );
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
    <View style={AddCardStyle.container}>
      <NativeBaseBackButton
        style={{ ...AddCardStyle.closeButton, marginHorizontal: "10%" }}
        handleOnPress={onClosePress}
        iconType={"exit"}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={AddCardStyle.inputContainer}>
          <Title
            label={t("add_card")}
            style={{ ...AddCardStyle.title, marginHorizontal: "10%" }}
          />
          {/* <KeyboardAwareScrollView> */}
          {formState?.cardNumber?.length > 0 &&
            formState?.cardNumber?.length < 16 && (
              <Text
                style={{
                  fontSize: 14,
                  color: "red",
                  fontFamily: "AzoSans-Medium",
                  marginTop: 10,
                  paddingHorizontal: "10%",
                }}
              >
                {t("card_langht_validation")}
              </Text>
            )}

          <BaseInput
            style={{ ...AddCardStyle.baseInput, marginHorizontal: "10%" }}
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
            placeHolder={"Card Number"}
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
              paddingHorizontal: "10%",
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
          <View
            style={{
              ...AddCardStyle.rowContainer,
              paddingHorizontal: "10%",
            }}
          >
            <BaseInput
              style={{ ...AddCardStyle.rowInput }}
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
              placeHolder={"Month"}
              onChangeText={(event) => handleChange(event, "expirationMonth")}
              value={formState.expirationMonth}
              keyboardType="numeric"
              maxLength={2}
            />

            <View style={{ ...AddCardStyle.rowInput }}>
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
                placeHolder={"Year"}
                onChangeText={(event) => handleChange(event, "expirationYear")}
                value={formState.expirationYear || ""}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>

          {formState?.holderName?.length > 0 &&
            formState?.holderName?.length < 3 && (
              <Text style={AddCardStyle.invalidLabel}>
                {t("holder_name_validation")}
              </Text>
            )}
          <BaseInput
            style={{ ...AddCardStyle.baseInput, marginHorizontal: "10%" }}
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
          {/* </KeyboardAwareScrollView> */}
          {/* <Actionsheet
          isOpen={modalVisible}
          // isOpen={true}
          style={{ height: "45%", position: "absolute", bottom: 0, zIndex: 10 }}
          _backdrop={() => setModalVisible(false)}
          disableOverlay={false}
        > */}
          {modalVisible && (
            <View
              style={{
                height: "50%",
                position: "absolute",
                bottom: 0,
                zIndex: 10,
                paddingBottom: "10%",
                width: "100%",
              }}
            >
              <ActionModal
                text={t("add_card_confirmation")}
                handleNo={handleNo}
                handleYes={handleYes}
                reverseButtons={true}
              />
            </View>
          )}
          {/* </Actionsheet> */}
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "absolute",
              bottom: "10%",
              paddingHorizontal: "10%",
            }}
          >
            <ButtonComponent
              text={"CONFIRM"}
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
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

AddCard.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddCard;
