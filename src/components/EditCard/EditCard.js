import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { useToast } from "native-base";
import { NativeBaseBackButton, Title, ButtonComponent } from "../index";
import BaseInput from "../BaseInput";
import ActionModal from "../ActionModal/ActionModal";
//style
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import AddCardStyle from "./AddCard.style";
import { AQUA, RED } from "../../helpers/style/constants";
import { Toast } from "../Toast";
//redux
import {
  useCreateCardMutation,
  useGetCardsMutation,
  useEditCardMutation,
} from "../../services/wallets";
import { useSelector } from "react-redux";
import { t } from "i18next";
import { useDeleteCardMutation } from "../../services/wallets";

const EditCard = (props) => {
  const { onClosePress, cardInfo, handleGetAllWallets } = props;

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
  const [deleteCardModal, setDeleteCardModal] = useState(false);

  const personalState = useSelector((state) => state.users.personal);

  const [createCard] = useCreateCardMutation();
  const [getCards] = useGetCardsMutation();
  const [deleteCard] = useDeleteCardMutation();
  const [editCard] = useEditCardMutation();

  const cardNrRef = useRef(null);

  const handleGetCards = async () => {
    await getCards();
  };

  const isYearValid = () => {
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

  const hadnleFinalCehck = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (showInvalidDate()) {
      setIsInvalidDate(true);
    } else {
      setIsInvalidDate(false);
      setModalVisible(true);
    }
  };

  const handleEditCard = async () => {
    const body = {
      holderName: formState?.holderName,
      cardNumber: formState?.cardNumber,
      expirationMonth: formState?.expirationMonth,
      expirationYear: formState?.expirationYear,
    };
    await editCard({ cardId: cardInfo?.id, reqBody: body })
      .then(() => {
        handleGetCards();
        handleSuccessToast("Card was edited successfully!");
        onClosePress();
      })
      .catch((err) => {
        console.log("err edit card: ", err);
      });
  };

  const handleChange = (event, name) => {
    let val = 0;

    val = event;

    setFormState((formState) => ({
      ...formState,
      [name]: name === "cardNumber" ? event : val,
    }));
  };

  const handleModal = () => {
    // isYearValid();
    hadnleFinalCehck();
    // setModalVisible(true);
  };

  const handleYes = () => {
    // handleSubmit();
    handleEditCard();
  };
  const handleNo = () => {
    setModalVisible(false);
  };

  const handleSuccessToast = (message) => {
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
              {message}
            </Text>
          </View>
        );
      },
    });
  };

  const handleShowDeleteModal = () => {
    setDeleteCardModal(true);
  };

  const handleDeleteCard = async () => {
    await deleteCard({ cardId: cardInfo.id })
      .then(() => {
        handleGetAllWallets();
        handleSuccessToast("Card was removed with success!");
        onClosePress();
        setDeleteCardModal(false);
      })
      .catch((err) => {
        console.log("remove card err", err);
      });
  };

  const maskString = (inputString, numVisible) => {
    if (inputString.length <= numVisible) {
      return inputString;
    }

    const maskedPart = "*".repeat(numVisible);
    const visiblePart = inputString.substring(numVisible);

    return maskedPart + visiblePart;
  };

  const showInvalidDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currMonth = currentDate.getMonth();
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
        if (formState.expirationYear.length < 1) return true;
        if (formState?.expirationYear < currentYear) {
          return true;
        } else if (
          formState?.expirationYear == currentYear &&
          formState?.expirationMonth < currMonth + 1
        ) {
          return true;
        }
      }
    }
    return false;
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

  useEffect(() => {
    setIsInvalidDate(showInvalidDate());
  }, [formState]);

  useEffect(() => {
    setFormState(() => ({
      cardNumber: maskString(cardInfo?.cardNumber, 12),
      expirationMonth: cardInfo?.expirationMonth,
      expirationYear: cardInfo?.expirationYear,
      holderName: cardInfo?.holderName,
    }));
  }, []);

  return (
    <View style={AddCardStyle.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={AddCardStyle.inputContainer}>
          <View>
            <NativeBaseBackButton
              style={{ ...AddCardStyle.closeButton, marginHorizontal: "10%" }}
              handleOnPress={onClosePress}
              iconType={"exit"}
            />
            <Title
              label={"Edit card"}
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
              ref={cardNrRef}
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
              handleFocus={() =>
                setFormState((formState) => ({
                  ...formState,
                  cardNumber: "",
                }))
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
              {(isInvalidDate || showInvalidDate()) && (
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
                }
                name={svgs.copy}
                placeHolder={"Month"}
                onChangeText={(event) => handleChange(event, "expirationMonth")}
                value={`${formState?.expirationMonth}`}
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
                  onChangeText={(event) =>
                    handleChange(event, "expirationYear")
                  }
                  value={`${formState?.expirationYear}`}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>

            {formState?.holderName?.length > 0 &&
              formState?.holderName?.length < 3 && (
                <Text
                  style={{
                    ...AddCardStyle.invalidLabel,
                    paddingHorizontal: "10%",
                    color: RED,
                    fontFamily: "AzoSans-Bold",
                  }}
                >
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
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              // position: "absolute",
              // bottom: "0%",
              paddingHorizontal: "10%",
            }}
          >
            <View style={{ marginVertical: 8, width: "100%" }}>
              <ButtonComponent
                text={"DELETE CARD"}
                onPress={() => handleShowDeleteModal()}
                isDisabled={false}
                color={"transparent"}
                labelColor={RED}
              />
            </View>
            <View style={{ marginVertical: 8, width: "100%" }}>
              <ButtonComponent
                text={t("confirm").toUpperCase()}
                onPress={() => handleModal()}
                // isDisabled={false}
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
        </View>
      </TouchableWithoutFeedback>
      {deleteCardModal && (
        <View
          style={{
            // height: "50%",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            // paddingBottom: "10%",
            width: "100%",
          }}
        >
          <ActionModal
            text={t("add_card_confirmation")}
            handleNo={() => setDeleteCardModal(false)}
            handleYes={handleDeleteCard}
            reverseButtons={false}
          />
        </View>
      )}
      {modalVisible && (
        <View
          style={{
            height: "50%",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            paddingBottom: Platform.OS === "ios" ? "10%" : 0,
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
    </View>
  );
};

EditCard.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default EditCard;
