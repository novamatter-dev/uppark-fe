import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
//assets & style
import { SvgXml } from "react-native-svg";
import AddPersonalStyle from "./AddPersonal.style";
import svgs from "../../assets/svgs";
import visa from "../../assets/icons/visa.png";
import { AQUA } from "../../helpers/style/constants";
//libraries
import { Box, ScrollView, useToast } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
//components
import BaseInput from "../BaseInput";
import KeyboardView from "../KeyboardView";
import {
  NativeBaseBackButton,
  NativeBaseButton,
  Title,
  Modal,
  ButtonComponent,
} from "../index";
import { PaymentOptions } from "../../screens/PaymentDetails/components";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setPersonalEntry,
  resetUserState,
} from "../../redux/features/users/userSlice";
import {
  useUpdatePersonalProfileMutation,
  useGetPersonalProfileMutation,
} from "../../services/users";
import { useSetPersonalDefaultPaymentMutation } from "../../services/wallets";
import Toast from "react-native-toast-notifications";
import { t } from "i18next";

const AddPersonal = (props) => {
  const { onClosePress, isDisabled, isLoading, handleGetCards } = props;

  const personalState = useSelector((state) => state.users.personal);
  const businessState = useSelector((state) => state.users.business);
  const dispatch = useDispatch();
  const toastRef = useRef();
  const toast = useToast();

  const [updatePersonalDetails] = useUpdatePersonalProfileMutation();
  const [getPersonalProfile] = useGetPersonalProfileMutation();
  const [setPersonalDefaultPayment] = useSetPersonalDefaultPaymentMutation();

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    handleGetPersonalDetails();
  }, []);

  const handleGetPersonalDetails = async () => {
    await getPersonalProfile()
      .then((answer) => { })
      .catch((err) => {
        console.log("ERR getPersonalProfile >>> ", err);
      });
  };

  const handleChangeFormState = ({ type, label, value }) => {
    dispatch(setPersonalEntry({ type, label, value }));
  };

  const handleChooseDefaultPayment = () => {
    handleGetCards();
    setModalVisible(true);
  };

  const handleSubmit = async ({ closeModal = false }) => {
    const body = {
      firstName: personalState?.firstName?.value,
      lastName: personalState?.lastName?.value,
      email: personalState?.email?.value,
      address: personalState?.address?.value,
      city: personalState?.city?.value,
      county: personalState?.county?.value,
    };

    await updatePersonalDetails(body)
      .then(() => {
        closeModal && onClosePress();
        handleSuccessToast();
      })
      .catch((err) => {
        console.log("ERR updatePersonalDetails >>> ", err);
      });
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hadleSetPersonalCard = async (id) => {
    await handleSubmit({ closeModal: false }).then(async () => {
      await setPersonalDefaultPayment({ cardId: id })
        .then((answer) => {
          setModalVisible(false);
          handleGetPersonalDetails();
        })
        .catch((err) => {
          console.log("ERR setPersonalDefaultPayment >>> ", err);
        });
    });
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
              {t("personal_profile_saved")}
            </Text>
          </View>
        );
      },
    });
  };

  const handlePlaceholder = (name) => {
    switch (name) {
      case "First Name":
        return t("first_name");

      case "Last Name":
        return t("last_name");

      case "Address":
        return t("address");

      case "City":
        return t("city");

      case "County":
        return t("county");

      case "Email for receipt":
        return t("email_for_receipt");
    }
  };

  return (
    <View style={AddPersonalStyle.safeAreaContainer}>
      {/* <ScrollView style={AddPersonalStyle.container}> */}
      {/* <KeyboardView boxStyle={AddPersonalStyle.container}> */}
      <NativeBaseBackButton
        isLoading={false}
        style={{backgroundColor: "#F5F5F5"}}
        handleOnPress={onClosePress}
        isDisabled={false}
      />
              <Title label={t("personal_profile")} style={AddPersonalStyle.title} />

      {/* <Box style={AddPersonalStyle.inputContainer}>
      
      </Box> */}
      <ScrollView showsVerticalScrollIndicator={false} style={AddPersonalStyle.container}>
        <KeyboardAwareScrollView>
          {Object.keys(personalState).map((item, index) => {
            if (item === "cardNumber") {
              return (
                <TouchableOpacity
                  onPress={() => handleChooseDefaultPayment(true)}
                  style={AddPersonalStyle.detailsBtn}
                  key={`key--${item}`}
                >
                  <SvgXml xml={svgs.copy} width={22} height={24} />
                  <Text style={AddPersonalStyle.btnLabel}>
                    {personalState.cardNumber.value
                      ? `**** ${personalState.cardNumber.value.slice(-4)}`
                      : t("default_payment")}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <BaseInput
                  onPress={
                    item === "cardNumber"
                      ? handleChooseDefaultPayment()
                      : null
                  }
                  isDisabled={personalState[item].isDisabled}
                  style={AddPersonalStyle.baseInput}
                  icon={
                    <SvgXml
                      xml={personalState[item].svg}
                      width={22}
                      height={22}
                    />
                  }
                  name={item}
                  // placeHolder={personalState[item].label}
                  placeHolder={t(personalState[item].placeholder)}
                  onChangeText={(value) =>
                    handleChangeFormState({
                      type: item,
                      value,
                      label: personalState[item].label,
                    })
                  }
                  value={personalState[item].value}
                  key={`personal-inputs-${String(index)}`}
                  capitalize={"sentences"}
                />
              );
            }
          })}
        </KeyboardAwareScrollView>
      </ScrollView>
      {/* </KeyboardView> */}

      <View style={AddPersonalStyle.floatingContainer}>
        <ButtonComponent
          text={t("confirm").toUpperCase()}
          onPress={() => handleSubmit({ closeModal: true })}
          isDisabled={isDisabled}
        />
      </View>
      <Modal isFullScreen={true} modalVisible={modalVisible}>
        <PaymentOptions
          onCardPress={hadleSetPersonalCard}
          onExitPress={handleModal}
          onSmsPress={handleModal}
          isFromPaymentDetails={false}
          profileType={"Personal"}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>
      <Toast
        ref={toastRef}
        style={{
          zIndex: 3,
          elevation: 3,
        }}
      />
    </View>
  );
};

AddPersonal.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddPersonal;
