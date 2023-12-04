import React, { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
//style && asets
import AddBusinessStyle from "./AddBusiness.style";
import { SvgXml } from "react-native-svg";
import svgs from "../../assets/svgs";
import { AQUA } from "../../helpers/style/constants";
//libraries
import { Box, ScrollView, useToast } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PropTypes from "prop-types";
//components
import BaseInput from "../BaseInput";
import { NativeBaseBackButton, Title, Modal, ButtonComponent } from "../index";

import { PaymentOptions } from "../../screens/PaymentDetails/components";
//redux
import {
  useUpdateBusinessProfileMutation,
  useGetBusinessProfileMutation,
} from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessEntry } from "../../redux/features/users/userSlice";
import { useSetBusinessDefaultPaymentMutation } from "../../services/wallets";
import Toast from "react-native-toast-notifications";
import { t } from "i18next";

const AddBusiness = (props) => {
  const { onClosePress, isDisabled, handleGetCards } = props;

  const businessState = useSelector((state) => state.users.business);
  const dispatch = useDispatch();

  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [getBusinessProfile] = useGetBusinessProfileMutation();
  const [setBusinessDefaultPayment] = useSetBusinessDefaultPaymentMutation();

  const [modalVisible, setModalVisible] = useState(false);

  const toastRef = useRef();
  const toast = useToast();

  useEffect(() => {
    // dispatch(resetUserState());
    handleGetBusinessProfile();
  }, []);

  const handleGetBusinessProfile = async () => {
    await getBusinessProfile();
  };

  const handleChangeFormState = ({ type, label, value }) => {
    dispatch(setBusinessEntry({ type, label, value }));
  };

  const handleSubmit = async ({ closeModal = false }) => {
    const body = {
      companyName: businessState.companyName.value,
      cui: businessState.cui.value,
      email: businessState.email.value,
      address: businessState.address.value,
      city: businessState.city.value,
      county: businessState.county.value,
      registryCom: businessState.registryCom.value,
      iban: businessState.iban.value,
      bankName: businessState.bankName.value,
      // cardNumber: businessState.cardNumber.value,
    };

    await updateBusinessProfile(body)
      .then(() => {
        closeModal && onClosePress();
        handleSuccessToast();
      })
      .catch((err) => {
        console.log("ERR updateBusinessProfile >>> ", err);
      });
  };

  const handleChooseDefaultPayment = () => {
    handleGetCards();
    setModalVisible(true);
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const hadleSetBusinessCard = async (id) => {
    await handleSubmit({ closeModal: false }).then(async () => {
      await setBusinessDefaultPayment({ cardId: id })
        .then((answer) => {
          // handleModal();
          setModalVisible(false);
          handleGetBusinessProfile();
        })
        .catch((err) => {
          console.log("ERR setBusinessDefaultPayment >>>", err);
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
              Business profile saved !
            </Text>
          </View>
        );
      },
    });
  };

  return (
    <View style={AddBusinessStyle.safeAreaContainer}>
      {/* <KeyboardView boxStyle={AddBusinessStyle.container}> */}
      <ScrollView style={AddBusinessStyle.container}>
        <NativeBaseBackButton
          style={AddBusinessStyle.closeButton}
          handleOnPress={onClosePress}
          iconType={"exit"}
        />
        <Box style={AddBusinessStyle.inputContainer}>
          <Title label={"Business Profile"} style={AddBusinessStyle.title} />
          <KeyboardAwareScrollView>
            {Object.keys(businessState).map((item, index) => {
              if (item === "cardNumber") {
                return (
                  <TouchableOpacity
                    onPress={() => handleChooseDefaultPayment(true)}
                    style={AddBusinessStyle.detailsBtn}
                    key={`key--${item}`}
                  >
                    <SvgXml xml={svgs.copy} width={22} height={24} />
                    <Text style={AddBusinessStyle.btnLabel}>
                      {businessState.cardNumber.value
                        ? businessState.cardNumber.value
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
                    isDisabled={businessState[item].isDisabled}
                    style={AddBusinessStyle.baseInput}
                    icon={
                      <SvgXml
                        xml={businessState[item].svg}
                        width={22}
                        height={22}
                      />
                    }
                    name={item}
                    placeHolder={t(businessState[item].placeholder)}
                    onChangeText={(value) =>
                      handleChangeFormState({
                        type: item,
                        value,
                        label: businessState[item].label,
                      })
                    }
                    value={businessState[item].value}
                    key={`personal-inputs-${String(index)}`}
                    capitalize={"sentences"}
                    // onEndEditing={(event) => handleUpdateInfo(event, item)}
                  />
                  // <View
                  //   style={{
                  //     display: "flex",
                  //     width: "100%",
                  //     marginVertical: 8,
                  //   }}
                  // >
                  //   <CustomInput placeholder={businessState[item]?.label} />
                  // </View>
                );
              }
            })}
          </KeyboardAwareScrollView>
          <View style={AddBusinessStyle.floatingContainer}>
            {/* <NativeBaseButton
              label={"CONFIRM"}
              handleOnPress={() => handleSubmit({ closeModal: true })}
              isDisabled={isDisabled}
              isLoading={isLoading}
              isFloating={true}
              style={AddBusinessStyle.floatingBnt}
            /> */}
          </View>
        </Box>
      </ScrollView>
      <View style={AddBusinessStyle.floatingContainer}>
        {/* <NativeBaseButton
          label={"CONFIRM"}
          // handleOnPress={handleSubmit}
          handleOnPress={() => handleSubmit({ closeModal: true })}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isFloating={true}
          style={AddBusinessStyle.floatingBnt}
        /> */}
        <ButtonComponent
          text={"CONFIRM"}
          onPress={() => handleSubmit({ closeModal: true })}
          isDisabled={isDisabled}
        />
      </View>
      {/* </KeyboardView> */}

      <Modal isFullScreen={true} modalVisible={modalVisible}>
        <PaymentOptions
          onCardPress={hadleSetBusinessCard}
          onExitPress={handleModal}
          onSmsPress={handleModal}
          isFromPaymentDetails={false}
          profileType={"Business"}
        />
        <Toast
          ref={toastRef}
          style={{
            zIndex: 3,
            elevation: 3,
          }}
        />
      </Modal>
    </View>
  );
};

AddBusiness.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default AddBusiness;
