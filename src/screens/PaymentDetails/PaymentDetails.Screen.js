import React, { useState, useEffect, useRef } from "react";
import { Box, Actionsheet } from "native-base";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  AppState,
} from "react-native";
//style & assets
import svgs from "../../assets/svgs";
import PaymentDetailsStyle from "./PaymentDetails.style";
import visa from "../../assets/icons/visa.png";
import { AQUA, BLUE, WHITE } from "../../helpers/style/constants";
//netopia assets
//components
import CarsTab from "../Profile/Components/CarsTab/CarsTab.screen";
import { ModalConfirmPayment, PaymentOptions, SummaryInfo } from "./components";
import {
  NativeBaseBackButton,
  Title,
  Modal,
  DropdownButton,
  ButtonComponent,
} from "../../components";

//libraries
import moment from "moment";
import { SvgXml } from "react-native-svg";
import { WebView } from "react-native-webview";
import { useIsFocused } from "@react-navigation/native";
//hooks
import useInterval from "../../hooks/useInterval.hook";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  usePostParkingReservationMutation,
  useExtendReservationMutation,
  useInitiatePaymentMutation,
  useChecktransactionMutation,
  useReturnLinkMutation,
} from "../../services/parkings";
import { setSelectingCar } from "../../redux/features/cars/carsSlice";
import {
  parkingsState,
  setNearByParkings,
  setIsParkingSelected,
  setReservationDetails,
  setWorksWithHub,
} from "../../redux/features/parkings/parkingsSlice";
import { setLoadingScreen } from "../../redux/features/notifications/notificationSlice";
import {
  useGetPersonalDefailtCardMutation,
  useGetBusinessDefaultCardMutation,
} from "../../services/wallets";
import Toast from "react-native-toast-notifications";
import AddCar from "../AddCar";
import { t } from "i18next";
import SelectCar from "../SelectCar/SelectCar";

const PaymentDetails = ({ navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const parkingsData = useSelector(parkingsState);
  const { activeCar } = useSelector((state) => state.cars);
  const { currentReservations, selectedSensor } = useSelector(
    (state) => state.parkings.parkingsState
  );
  const { activeLoadingScreen } = useSelector((state) => state.notification);

  const toastRef = useRef();

  const [postParkingReservation] = usePostParkingReservationMutation();
  const [extendReservation] = useExtendReservationMutation();
  const [getPersonalDefailtCard] = useGetPersonalDefailtCardMutation();
  const [getBusinessDefaultCard] = useGetBusinessDefaultCardMutation();

  const [initiatePayment] = useInitiatePaymentMutation();
  const [checktransaction] = useChecktransactionMutation();
  const [returnLink] = useReturnLinkMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [addCarModal, setAddCarModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [profileType, setProfileType] = useState("Personal");
  const [selectedCard, setSelectedCard] = useState(null);
  const [step, setStep] = useState(1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [netopiaVisible, setNetopiaVisible] = useState(false);
  const [initiateNetopia, setInitiateNetopia] = useState({
    html: "",
    transactionId: null,
  });
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardMissing, setIsCardMissing] = useState(false);

  const [isForeground, setIsForeground] = useState(false);

  useEffect(() => {
    getProfileDefaultCard();
  }, [profileType]);

  const getProfileDefaultCard = async () => {
    if (profileType === "Personal") {
      await getPersonalDefailtCard()
        .then((answer) => {
          // setSelectedCard(answer?.data?.cardNumber?.substring(8, 16));
          setSelectedCard(answer?.data);
        })
        .catch((err) => {
          console.log("err personal card : ", err);
        });
    } else {
      await getBusinessDefaultCard().then((answer) => {
        // setSelectedCard(answer?.data?.cardNumber?.substring(8, 16));
        setSelectedCard(answer?.data);
      });
    }
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectCardFromList = (card) => {
    setSelectedCard(card.substring(8, 16));
    getProfileDefaultCard();
    handleModal();
  };

  const handleAddCar = () => {
    setAddCarModal(!addCarModal);
    dispatch(setSelectingCar(true));
  };

  const handleOnPress = async () => {
    if (parkingsData.hasSensors) {
      // SENZORI !
      const body = {
        carId: activeCar.carId,
        parkingId: parkingsData?.parkingDetails?.parkingId,
        groupId: parkingsData?.reservedPolygon?.groupId,
        productId: parkingsData?.parkingForm?.productId,
        paymentProfileType: `${profileType}Profile`,
        parkingLotId: selectedSensor?.id, // trebuie doar daca este selectata parcarea de la Iasi !!
      };
      console.log(" sensor reservation body >>>", body);
      await postParkingReservation(body)
        .then((answer) => {
          dispatch(setNearByParkings([]));
          dispatch(setIsParkingSelected(false));
          dispatch(
            setReservationDetails({
              reservationId: answer.data.parkingReservationId,
              start: answer.data.reservedFrom,
              end: answer.data.reservedTo,
            })
          );
          dispatch(setLoadingScreen(false));
          //setez loading false
          setIsLoading(false);
          navigation.navigate("SetYourParkPin");

          return answer;
        })
        .catch((err) => {
          console.log("parking reservation err: ", err);
          setIsLoading(false);
        });
    } else {
      if (parkingsData?.worksWithHub || parkingsData?.isMiniPark) {
        handleHubReservation();
      } else {
        handleRegularReservation();
      }
    }
  };

  const handleHubReservation = async () => {
    const body = {
      carId: null,
      parkingId: parkingsData?.parkingDetails?.parkingId,
      groupId: 0,
      parkingLotId: null,
      productId: null,
      paymentProfileType: `${profileType}Profile`,
      reservedFrom: moment(parkingsData?.parkingForm?.startTime).format(
        "yyyy-MM-DD HH:mm:ss"
      ), //(acel entryDate) din QrScanner
      amount: parkingsData.parkingForm.totalAmounts, //din QrScanner
      ticketIdentifier: parkingsData?.parkingForm?.ticketId, // din QrScanner
    };

    dispatch(setWorksWithHub(false));

    await postParkingReservation(body).then((answer) => {
      navigation.navigate("HomeDrawer");
    });
  };

  const handleRegularReservation = async () => {
    const body = {
      carId: activeCar?.carId,
      parkingId: parkingsData?.parkingDetails?.parkingId,
      groupId: parkingsData?.reservedPolygon?.groupId,
      productId: parkingsData?.parkingForm?.productId,
      paymentProfileType: `${profileType}Profile`,
      parkingLotId: null,
      ticketIdentifier: null,
      amount: 0,
      reservedFrom: null,
      CardId: selectedCard?.id,
    };
    await postParkingReservation(body)
      .then((answer) => {
        dispatch(setNearByParkings([]));
        dispatch(setIsParkingSelected(false));
        dispatch(
          setReservationDetails({
            reservationId: answer.data.parkingReservationId,
            start: answer.data.reservedFrom,
            end: answer.data.reservedTo,
          })
        );
        setIsLoading(false);
        dispatch(setLoadingScreen(false));
        navigation.navigate("SetYourParkPin");

        return answer;
      })
      .catch((err) => {
        console.log("parking reservation err: ", err);
        setIsLoading(false);
      });
  };

  const handleExtendReservation = async () => {
    const body = {
      productId: parkingsData.parkingForm.productId,
      paymentProfileType: `${profileType}Profile`,
    };

    await extendReservation({
      prakingReservationId: parkingsData.reservationDetails.reservationId,
      reqBody: body,
    })
      .then(() => {
        navigation.navigate("HomeDrawer");
      })
      .catch((err) => {
        console.log("err >>> ", err);
      });
  };

  const handlePayConfirm = () => {
    setIsConfirmModalVisible(false);
    const findId = currentReservations.some(
      (item) =>
        item.parkingId === parkingsData.parkingDetails.parkingId &&
        item.plateNumber === activeCar.licensePlateNumber
    );
    if (currentReservations.length >= 1 && findId) {
      handleExtendReservation();
    } else {
      handleOnPress();
    }
  };

  const handlePay = () => {
    // navigation.navigate("SetYourParkPin");
    if (parkingsData.parkingDetails.currencyType === "EURO") {
      // setIsConfirmModalVisible(true);
      handleInitiatePayment();
    } else {
      if (selectedCard) {
        // setIsConfirmModalVisible(true);
        handleInitiatePayment();
        return true;
      } else {
        setIsCardMissing(true);
      }
    }
  };

  const handleInitiatePayment = async () => {
    if (parkingsData.parkingDetails.currencyType === "EURO") {
      Linking.openURL(
        `sms:${parkingsData.parkingForm.shortNumber}?&body=${parkingsData.parkingForm.code}-${activeCar?.licensePlateNumber}`
      );
    } else {
      let productId = parkingsData.parkingForm.productId;
      if (
        parkingsData.parkingForm.productId ===
          "00000000-0000-0000-0000-000000000000" ||
        parkingsData.parkingForm.productId ||
        null
      ) {
        productId = 0;
      }

      const body = {
        Amount: parkingsData.parkingForm.totalAmounts,
        Currency: parkingsData.parkingDetails.currencyType,
        // ProductId: parkingsData.parkingForm.productId
        //   ? parkingsData.parkingForm.productId
        //   : parkingsData.isMiniPark
        //   ? // ? "3342F4B4-C193-40BD-96D0-85EF41037A39"
        //     125
        //   : 0,
        ProductId: parkingsData.parkingForm.productId
          ? parkingsData.parkingForm.productId
          : productId,
        ParkingId: parkingsData.parkingDetails.parkingId,
        isPersonalProfile: profileType === "Personal" ? true : false,
        CardId: selectedCard?.id,
        LicensePlate: activeCar.licensePlateNumber,
        TicketIdentifier: parkingsData.worksWithHub
          ? parkingsData?.parkingForm?.ticketId
          : null,
      };

      console.log("body initiate payment >>>> ", body);

      await initiatePayment(body)
        .then((answer) => {
          let form = answer.data.form;
          form = form.replace(/\\"/g, '"');

          console.log("answer.data >>>> ", answer.data);

          setTransactionInProgress(true);

          setInitiateNetopia({
            html: answer.data.form,
            transactionId: answer.data.transactionId,
          });

          // setNetopiaVisible(true);
        })
        .catch((err) => {
          console.log("initiate payment err >>> ", err);
        });
    }
  };

  useEffect(() => {
    if (initiateNetopia.html) {
      setNetopiaVisible(true);
    }
  }, [initiateNetopia]);

  const handleCheckTransaction = async () => {
    await checktransaction({ transactionId: initiateNetopia.transactionId })
      .then((answer) => {
        //to set your pin
        if (answer.data) {
          setTransactionInProgress(false);
          setNetopiaVisible(false);

          handlePayConfirm();
          dispatch(setLoadingScreen(true));
          setIsLoading(true);
        } else {
          // console.log("checking transaction >>> ");
        }
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  };

  useInterval(
    () => {
      handleCheckTransaction();
    },
    transactionInProgress ? 1000 : null
  );

  const find = () => {
    return currentReservations.some(
      (obj) => obj.parkingId === parkingsData.parkingDetails.parkingId
    );
  };

  const handleAppState = (state) => {
    setIsForeground(state === "active");

    if (state === "active") {
      navigation.navigate("HomeDrawer");
    }
  };

  useEffect(() => {
    if (parkingsData.parkingDetails.currencyType === "EURO") {
      const subscribe = AppState.addEventListener("change", (state) =>
        handleAppState(state)
      );

      return () => subscribe.remove();
    }
  }, [isFocused]);

  if (!netopiaVisible) {
    return (
      <>
        <Box style={PaymentDetailsStyle.container}>
          <View style={PaymentDetailsStyle.topHalf}>
            <NativeBaseBackButton
              style={PaymentDetailsStyle.backButton}
              handleOnPress={() => {
                if (parkingsData.worksWithHub) {
                  navigation.navigate("HomeDrawer");
                } else {
                  navigation.goBack();
                }
              }}
            />
            <Title
              label={t("payment_details")}
              style={PaymentDetailsStyle.title}
            />
            <SummaryInfo
              startTime={moment(parkingsData.parkingForm.startTime).format(
                "HH:mm"
              )}
              endTime={moment(parkingsData.parkingForm.endTime).format("HH:mm")}
              startDate={moment(parkingsData.parkingForm.startTime).format(
                "dd, MMM DD"
              )}
              endDate={moment(parkingsData.parkingForm.endTime).format(
                "dd, MMM DD"
              )}
              address={parkingsData?.parkingDetails?.parkingShortTitle}
              handleAddCar={handleAddCar}
              isExtend={find}
            />
          </View>

          <View style={PaymentDetailsStyle.bottomHalf}>
            {/* OPTIONS CONTAINER */}

            <View style={PaymentDetailsStyle.optionsContainer}>
              <Box style={PaymentDetailsStyle.paymentOptionsContainer}>
                <Text style={PaymentDetailsStyle.grayText}>
                  {t("payment_options")}
                </Text>

                {parkingsData.parkingDetails.currencyType !== "EURO" && (
                  <TouchableOpacity
                    style={PaymentDetailsStyle.btnContainer}
                    onPress={handleModal}
                  >
                    <Image style={PaymentDetailsStyle.icon} source={visa} />
                    <Text style={PaymentDetailsStyle.contentText}>
                      {selectedCard?.cardNumber
                        ? `**** ${selectedCard?.cardNumber?.slice(-4)}`
                        : t("selected_card")}
                    </Text>
                  </TouchableOpacity>
                )}
                {parkingsData.parkingDetails.currencyType === "EURO" && (
                  <TouchableOpacity style={PaymentDetailsStyle.btnContainer}>
                    <SvgXml xml={svgs.sms} width={22} height={22} />
                    <Text style={PaymentDetailsStyle.contentText}>SMS</Text>
                  </TouchableOpacity>
                )}
              </Box>

              <Box style={PaymentDetailsStyle.paymentOptionsContainer}>
                <Text style={PaymentDetailsStyle.grayText}>{t("profile")}</Text>
                <DropdownButton
                  expanded={expanded}
                  setExpanded={setExpanded}
                  setProfileType={setProfileType}
                  profileType={profileType}
                />
              </Box>
            </View>

            {/* OPTIONS CONTAINER */}

            <Box style={PaymentDetailsStyle.bottomTextContainer}>
              <Text style={PaymentDetailsStyle.mediumBoldText}>
                {t("total_amount")}
              </Text>
              {!expanded && (
                <Text style={PaymentDetailsStyle.bigBoldText}>
                  {parkingsData.parkingForm.totalAmounts}{" "}
                  {parkingsData.parkingDetails.currencyType}
                </Text>
              )}
            </Box>

            <View>
              <ButtonComponent
                text={t("confirm_and_pay").toUpperCase()}
                onPress={handlePay}
              />
              <Text style={PaymentDetailsStyle.disclaimerTxt}>
                {t("purchase_disclaimer")}
              </Text>
            </View>
          </View>

          {/* PAYMENT OPTIONS MODAL */}
          <Modal isFullScreen={true} modalVisible={modalVisible}>
            <PaymentOptions
              onCardPress={handleSelectCardFromList}
              onExitPress={handleModal}
              onSmsPress={handleModal}
              isFromPaymentDetails={true}
              profileType={profileType}
            />
            <Toast
              ref={toastRef}
              style={{
                zIndex: 3,
                elevation: 3,
              }}
            />
          </Modal>
          <Modal isFullScreen={true} modalVisible={addCarModal}>
            {step === 1 ? (
              // <CarsTab
              //   inModal={true}
              //   handleAddCar={handleAddCar}
              //   setAddCarModal={setAddCarModal}
              //   setStep={setStep}
              //   step={step}
              // />
              <SelectCar
                inModal={true}
                closeModal={() => setAddCarModal(false)}
              />
            ) : (
              <AddCar setStep={setStep} step={step} inModal={true} />
            )}
          </Modal>
          <ModalConfirmPayment
            isVisible={isConfirmModalVisible}
            closeModal={() => setIsConfirmModalVisible(false)}
            handleYesButton={handleInitiatePayment}
            profileType={profileType}
            selectedCard={selectedCard?.cardNumber?.substring(8, 16)}
          />

          <Actionsheet
            isOpen={isCardMissing}
            // isOpen={true}
            style={{
              height: "30%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View style={PaymentDetailsStyle.missingCardContainer}>
              <Text style={PaymentDetailsStyle.missingCardTitle}>
                {t("card_missing")}
              </Text>
              <TouchableOpacity
                style={PaymentDetailsStyle.missingCardBtn}
                onPress={() => {
                  setIsCardMissing(false);
                  handleModal();
                }}
              >
                <Text style={PaymentDetailsStyle.missingBtnLabel}>
                  {t("ok").toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </Actionsheet>

          <Modal
            animationType="slide"
            transparent={true}
            visible={activeLoadingScreen}
          >
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={AQUA} />
            </View>
          </Modal>
        </Box>
        {isLoading && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ActivityIndicator size="large" color={BLUE} />
          </View>
        )}
      </>
    );
  } else {
    return (
      <View
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            position: "absolute",
            top: "3%",
            right: "5%",
            zIndex: 100,
          }}
        >
          <NativeBaseBackButton
            style={PaymentDetailsStyle.backButton}
            handleOnPress={() => {
              if (parkingsData.worksWithHub) {
                navigation.navigate("HomeDrawer");
              } else {
                navigation.goBack();
              }
            }}
          />
        </View>
        <WebView
          startInLoadingState={true}
          androidLayerType={"software"}
          style={{
            marginTop: "8%",
            flex: 1,
          }}
          source={{
            html: initiateNetopia?.html,
          }}
        ></WebView>
      </View>
    );
  }
};

export default PaymentDetails;
