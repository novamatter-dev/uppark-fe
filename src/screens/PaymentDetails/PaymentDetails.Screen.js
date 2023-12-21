import React, {useState, useEffect, useRef} from 'react';
import {Box, Actionsheet} from 'native-base';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  AppState,
} from 'react-native';
//style & assets
import svgs from '../../assets/svgs';
import PaymentDetailsStyle from './PaymentDetails.style';
import visa from '../../assets/icons/visa.png';
import {AQUA, BLUE, WHITE} from '../../helpers/style/constants';
//netopia assets
//components
import CarsTab from '../Profile/Components/CarsTab/CarsTab.screen';
import {ModalConfirmPayment, PaymentOptions, SummaryInfo} from './components';
import {
  NativeBaseBackButton,
  Title,
  Modal,
  DropdownButton,
  ButtonComponent,
  AddPersonal,
} from '../../components';

import {setPersonalEntry} from '../../redux/features/users/userSlice';

//libraries
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {WebView} from 'react-native-webview';
import {useIsFocused} from '@react-navigation/native';
//hooks
import useInterval from '../../hooks/useInterval.hook';
//redux
import {useSelector, useDispatch} from 'react-redux';
import {
  usePostParkingReservationMutation,
  useExtendReservationMutation,
  useInitiatePaymentMutation,
  useChecktransactionMutation,
  useReturnLinkMutation,
} from '../../services/parkings';
import {setSelectingCar} from '../../redux/features/cars/carsSlice';
import {
  parkingsState,
  setNearByParkings,
  setIsParkingSelected,
  setReservationDetails,
} from '../../redux/features/parkings/parkingsSlice';
import {setLoadingScreen} from '../../redux/features/notifications/notificationSlice';
import {
  useGetPersonalDefailtCardMutation,
  useGetBusinessDefaultCardMutation,
} from '../../services/wallets';
import Toast from 'react-native-toast-notifications';
import AddCar from '../AddCar';
import {t} from 'i18next';
import SelectCar from '../SelectCar/SelectCar';
import {
  validatePhoneNumberBusinessData,
  validatePhoneNumberPersonalData,
} from '../../helpers/validateProfileData';
import AddPersonalDataModalContent from '../../components/AddPersonal/AddPersonalDataModalContent';
import AddBusinessModalComponent from '../../components/AddBusiness/AddBusinessDataModalContent';
import {useGetUserMutation} from '../../services/users';

const PaymentDetails = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const parkingsData = useSelector(parkingsState);
  const {activeCar} = useSelector(state => state.cars);
  const {currentReservations, selectedSensor} = useSelector(
    state => state.parkings.parkingsState,
  );
  const {activeLoadingScreen} = useSelector(state => state.notification);
  const personalState = useSelector(state => state.users.personal);
  const businessState = useSelector(state => state.users.business);

  const toastRef = useRef();

  const [postParkingReservation] = usePostParkingReservationMutation();
  const [extendReservation] = useExtendReservationMutation();
  const [getPersonalDefailtCard] = useGetPersonalDefailtCardMutation();
  const [getBusinessDefaultCard] = useGetBusinessDefaultCardMutation();

  const [getUserDetails] = useGetUserMutation();

  const [initiatePayment] = useInitiatePaymentMutation();
  const [checktransaction] = useChecktransactionMutation();
  const [returnLink] = useReturnLinkMutation();

  const {jwt} = useSelector(state => state.auth);

  const [modalVisible, setModalVisible] = useState(false);
  const [profileDataActionSheetVisible, setProfileDataActionSheetVisible] =
    useState(false);
  const [
    businessProfileDataActionSheetVisible,
    setBusinessProfileDataActionSheetVisible,
  ] = useState(false);
  const [addCarModal, setAddCarModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [profileType, setProfileType] = useState('Personal');
  const [selectedCard, setSelectedCard] = useState(null);
  const [step, setStep] = useState(1);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [netopiaVisible, setNetopiaVisible] = useState(false);
  const [initiateNetopia, setInitiateNetopia] = useState({
    html: '',
    transactionId: null,
  });
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardMissing, setIsCardMissing] = useState(false);
  const [isPayButtonDisabled, setIsPayButtonDisabled] = useState(false);

  const [isForeground, setIsForeground] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    getProfileDefaultCard();
  }, [profileType]);

  useEffect(() => {
    if (initiateNetopia.html) {
      setNetopiaVisible(true);
    }
  }, [initiateNetopia]);

  const getProfileDefaultCard = async () => {
    if (profileType === 'Personal') {
      await getPersonalDefailtCard()
        .then(answer => {
          // setSelectedCard(answer?.data?.cardNumber?.substring(8, 16));
          setSelectedCard(answer?.data);
        })
        .catch(err => {
          console.log('err personal card : ', err);
        });
    } else {
      await getBusinessDefaultCard().then(answer => {
        // setSelectedCard(answer?.data?.cardNumber?.substring(8, 16));
        setSelectedCard(answer?.data);
      });
    }
  };

  const handleAddNewCard = () => {
    setModalVisible(!modalVisible);
    setSelectedCard('NEW_CARD');
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelectCardFromList = card => {
    setSelectedCard(card.substring(8, 16));
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
        parkingId: parkingsData.parkingDetails.parkingId,
        groupId: parkingsData?.reservedPolygon?.groupId,
        productId: parkingsData.parkingForm.productId,
        paymentProfileType: `${profileType}Profile`,
        parkingLotId: null, // trebuie doar daca este selectata parcarea de la Iasi !!
        CardId: selectedCard?.id,
      };

      await postParkingReservation(body)
        .then(answer => {
          dispatch(setNearByParkings([]));
          dispatch(setIsParkingSelected(false));
          dispatch(
            setReservationDetails({
              reservationId: answer.data.parkingReservationId,
              start: answer.data.reservedFrom,
              end: answer.data.reservedTo,
            }),
          );
          dispatch(setLoadingScreen(false));

          setIsLoading(false);
          navigation.navigate('PaymentConfirmed', {
            type: 'CONFIRMED',
          });

          return answer;
        })
        .catch(err => {
          setIsLoading(false);
          console.log('parking reservation err: ', err);
          // TODO: Aici s-a intamplat ceva cu crearea de rezervare
          // TODO: Aceasta portiune de cod va disparea
        });
    } else {
      if (parkingsData?.worksWithHub) {
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
        'yyyy-MM-DD HH:mm:ss',
      ), //(acel entryDate) din QrScanner
      amount: parkingsData.parkingForm.totalAmounts, //din QrScanner
      ticketIdentifier: parkingsData?.parkingForm?.ticketId, // din QrScanner
      CardId: selectedCard?.id,
    };

    await postParkingReservation(body)
      .then(answer => {
        navigation.navigate('PaymentConfirmed', {
          type: 'CONFIRMED',
        });
      })
      .catch(err => {
        setIsLoading(false);

        // TODO: Aici s-a intamplat ceva cu crearea de rezervare
        // TODO: Aceasta portiune de cod va disparea
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
      .then(answer => {
        dispatch(setNearByParkings([]));
        dispatch(setIsParkingSelected(false));
        dispatch(
          setReservationDetails({
            reservationId: answer.data.parkingReservationId,
            start: answer.data.reservedFrom,
            end: answer.data.reservedTo,
          }),
        );
        setIsLoading(false);
        dispatch(setLoadingScreen(false));

        // TODO: verify improve payment flow
        // navigation.navigate('SetYourParkPin');
        navigation.navigate('PaymentConfirmation', {
          type: 'CONFIRMED',
        });

        return answer;
      })
      .catch(err => {
        console.log('parking reservation err: ', err);
        setIsLoading(false);
        // navigation.navigate('PaymentConfirmed', {
        //   type: 'REJECTED',
        // });

        // TODO: Aici s-a intamplat ceva cu crearea de rezervare
        // TODO: Aceasta portiune de cod va disparea
      });
  };

  const handleExtendReservation = async () => {
    const body = {
      productId: parkingsData.parkingForm.productId,
      paymentProfileType: `${profileType}Profile`,
    };

    // TODO: improve payment flow
    await extendReservation({
      prakingReservationId: parkingsData.reservationDetails.reservationId,
      reqBody: body,
    })
      .then(() => {
        navigation.navigate('PaymentConfirmation', {
          type: 'EXTEND',
        });
      })
      .catch(err => {
        console.log('err >>> ', err);
        setIsLoading(false);

        // TODO: Aici s-a intamplat ceva cu extinderea de rezervare
        // TODO: Aceasta portiune de cod va disparea

        navigation.navigate('PaymentConfirmed', {
          type: 'REJECTED',
        });
      });
  };

  const handlePayConfirm = () => {
    setIsConfirmModalVisible(false);
    const findId = currentReservations.some(
      item =>
        item.parkingId === parkingsData.parkingDetails.parkingId &&
        item.plateNumber === activeCar.licensePlateNumber,
    );
    if (currentReservations.length >= 1 && findId) {
      handleExtendReservation();
    } else {
      handleOnPress();
    }
  };

  const handlePay = async () => {
    // TODO: verify logic for phone number
    if (parkingsData.parkingDetails.currencyType === 'EURO') {
    } else {
      if (profileType === 'Personal') {
        await getUserDetails().then(answer => {
          if (answer.data.phoneNumber) {
            dispatch(
              setPersonalEntry({
                type: 'phoneNumber',
                label: 'Phone Number',
                value: answer.data.phoneNumber,
              }),
            );

            const updatedPersonalStateLocal = {
              ...personalState,
              phoneNumber: {
                ...personalState.phoneNumber,
                value: answer.data.phoneNumber,
              },
            };

            const personalDataValid = validatePhoneNumberPersonalData(
              updatedPersonalStateLocal,
            );
            if (!personalDataValid) {
              setProfileDataActionSheetVisible(true);
              return;
            }
          }
        });
      } else {
        await getUserDetails().then(answer => {
          if (answer.data.phoneNumber) {
            dispatch(
              setPersonalEntry({
                type: 'phoneNumber',
                label: 'Phone Number',
                value: answer.data.phoneNumber,
              }),
            );

            const updatedBusinessStateLocal = {
              ...businessState,
              phoneNumber: {
                ...personalState.phoneNumber,
                value: answer.data.phoneNumber,
              },
            };

            const businessDataValid = validatePhoneNumberBusinessData(
              updatedBusinessStateLocal,
            );
            if (!businessDataValid) {
              setBusinessProfileDataActionSheetVisible(true);
              return;
            }
          }
        });
      }
    }

    handleInitiatePayment();
    return true;

    // if (parkingsData.parkingDetails.currencyType === 'EURO') {
    //   // setIsConfirmModalVisible(true);
    //   handleInitiatePayment();
    //   return true;
    // } else {
    //   handleInitiatePayment();
    //   return true;
    // }
  };

  const handleInitiatePayment = async () => {
    setIsPayButtonDisabled(true);
    if (parkingsData.parkingDetails.currencyType === 'EURO') {
      Linking.openURL(
        `sms:${parkingsData.parkingForm.shortNumber}?&body=${parkingsData.parkingForm.code}-${activeCar?.licensePlateNumber}`,
      );
    } else {
      if (parkingsData.parkingForm.totalAmounts === 0) {
        handleOnPress();
        return;
      }
      let productId = parkingsData?.parkingForm.productId;
      if (
        parkingsData?.parkingForm.productId ===
          '00000000-0000-0000-0000-000000000000' ||
        parkingsData?.parkingForm.productId ||
        null
      ) {
        productId = 0;
      }

      // TODO: improve payment flow
      const body = {
        Amount: parkingsData?.parkingForm.totalAmounts,
        Currency: parkingsData?.parkingDetails.currencyType,
        ProductId: parkingsData?.worksWithHub
          ? 0
          : parkingsData?.parkingForm.productId,
        ParkingId: parkingsData?.parkingDetails.parkingId,
        isPersonalProfile: profileType === 'Personal' ? true : false,
        CardId:
          selectedCard === 'NEW_CARD'
            ? null
            : selectedCard?.id
            ? selectedCard.id
            : null,

        LicensePlate: activeCar.licensePlateNumber,
        ParkingReservationDto: {
          carId: activeCar?.carId,
          parkingId: parkingsData?.parkingDetails?.parkingId,
          groupId: parkingsData?.reservedPolygon?.groupId,
          productId: parkingsData?.worksWithHub
            ? 0
            : parkingsData?.parkingForm?.productId,
          paymentProfileType: `${profileType}Profile`,
          parkingLotId: null,
          ticketIdentifier: parkingsData?.parkingForm?.ticketId
            ? parkingsData?.parkingForm?.ticketId
            : null,
          amount: parkingsData.parkingForm.totalAmounts
            ? parkingsData.parkingForm.totalAmounts
            : 0,
          // ticketIdentifier: null,
          // amount: 0,
          ReservedFrom: parkingsData?.worksWithHub
            ? moment(parkingsData.parkingForm.startTime).format(
                'YYYY-MM-DD HH:mm:ss',
              )
            : null,
          CardId:
            selectedCard === 'NEW_CARD'
              ? null
              : selectedCard?.id
              ? selectedCard.id
              : null,
        },
      };

      console.log('>>> initiatePayment body:', body);

      // TODO: out of code
      await initiatePayment(body)
        .then(answer => {
          console.log('>>> initiatePayment answer:', answer.data);
          setTransactionInProgress(true);
          setInitiateNetopia({
            html: answer.data.form,
            transactionId: answer.data.transactionId,
          });
        })
        .catch(err => {
          console.log('>>> initiatePayment err:', err);
        });
    }
  };

  const handleCheckTransaction = async () => {
    setIsLoading(true);
    await checktransaction({transactionId: initiateNetopia.transactionId})
      .then(answer => {
        console.log('CheckTransaction answer:', answer.data);
        if (answer.data.status) {
          // TODO: Aici trebuie sa scapam de handlePayConfirm ( rezervarea o va face backend-ul )
          // TODO: Daca e totul ok aici, afisam ecranul de plata confirmata
          // handlePayConfirm();

          if (answer.data.status === 'Cancelled') {
            setNetopiaVisible(false);
            setTransactionInProgress(false);
            dispatch(setLoadingScreen(true));
            navigation.navigate('PaymentConfirmation', {
              type: 'CANCELED',
            });
          } else if (answer.data.status === 'Completed') {
            setNetopiaVisible(false);
            setTransactionInProgress(false);
            dispatch(setLoadingScreen(true));
            navigation.navigate('PaymentConfirmation', {
              type: 'CONFIRMED',
            });
          }
        }
      })
      .catch(err => {
        console.log('handleCheckTransaction err', err);
        // TODO: Aici calin trebuie sa ne intorci pe respnse ca plata a fost rejected !!!
        // TODO: Daca plata a fost rejected, afisam ecranul de plata respinsa
        setIsLoading(false);
        navigation.navigate('PaymentConfirmation', {
          type: 'REJECTED',
        });
      });
  };

  useInterval(
    () => {
      handleCheckTransaction();
    },
    transactionInProgress ? 1000 : null,
  );

  const find = () => {
    return currentReservations.some(
      obj => obj.parkingId === parkingsData.parkingDetails.parkingId,
    );
  };

  // TODO: Verify this function
  const handleAppState = state => {
    setIsForeground(state === 'active');

    if (state === 'active') {
      navigation.navigate('HomeDrawer');
    }
  };

  useEffect(() => {
    if (parkingsData.parkingDetails.currencyType === 'EURO') {
      const subscribe = AppState.addEventListener('change', state =>
        handleAppState(state),
      );

      return () => subscribe.remove();
    }
  }, [isFocused]);

  if (!netopiaVisible) {
    return (
      <>
        <Box style={PaymentDetailsStyle.container}>
          <View>
            <NativeBaseBackButton
              style={PaymentDetailsStyle.backButton}
              handleOnPress={() => {
                if (parkingsData.worksWithHub) {
                  navigation.navigate('HomeDrawer');
                } else {
                  navigation.goBack();
                }
              }}
            />
            <Title
              label={t('payment_details')}
              style={PaymentDetailsStyle.title}
            />
            <SummaryInfo
              startTime={moment(parkingsData.parkingForm.startTime).format(
                'HH:mm',
              )}
              endTime={moment(parkingsData.parkingForm.endTime).format('HH:mm')}
              startDate={moment(parkingsData.parkingForm.startTime).format(
                'dd, MMM DD',
              )}
              endDate={moment(parkingsData.parkingForm.endTime).format(
                'dd, MMM DD',
              )}
              address={parkingsData?.parkingDetails?.parkingShortTitle}
              handleAddCar={handleAddCar}
              isExtend={find}
            />
          </View>

          <View style={{flex: 1}}>
            <View style={PaymentDetailsStyle.buttonContainer}>
              <View style={PaymentDetailsStyle.optionsContainer}>
                <Box style={PaymentDetailsStyle.paymentOptionsContainer}>
                  <Text style={PaymentDetailsStyle.grayText}>
                    {t('payment_options')}
                  </Text>

                  {parkingsData.parkingDetails.currencyType !== 'EURO' && (
                    <TouchableOpacity
                      style={PaymentDetailsStyle.btnContainer}
                      onPress={handleModal}>
                      <Image style={PaymentDetailsStyle.icon} source={visa} />
                      <Text style={PaymentDetailsStyle.contentText}>
                        {selectedCard === 'NEW_CARD'
                          ? t('add_card')
                          : selectedCard?.cardNumber
                          ? `**** ${selectedCard.cardNumber.slice(-4)}`
                          : t('selected_card')}
                      </Text>
                    </TouchableOpacity>
                  )}
                  {parkingsData.parkingDetails.currencyType === 'EURO' && (
                    <TouchableOpacity style={PaymentDetailsStyle.btnContainer}>
                      <SvgXml xml={svgs.sms} width={22} height={22} />
                      <Text style={PaymentDetailsStyle.contentText}>SMS</Text>
                    </TouchableOpacity>
                  )}
                </Box>

                <Box style={PaymentDetailsStyle.paymentOptionsContainer}>
                  <Text style={PaymentDetailsStyle.grayText}>
                    {t('profile')}
                  </Text>
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
                  {t('total_amount')}
                </Text>
                {!expanded && (
                  <Text style={PaymentDetailsStyle.bigBoldText}>
                    {parkingsData.parkingForm.totalAmounts}{' '}
                    {parkingsData.parkingDetails.currencyType}
                  </Text>
                )}
              </Box>
              <ButtonComponent
                text={t('confirm_and_pay').toUpperCase()}
                isDisabled={isPayButtonDisabled}
                onPress={handlePay}
              />
              <Text style={PaymentDetailsStyle.disclaimerTxt}>
                {t('purchase_disclaimer')}
              </Text>
            </View>
          </View>

          {/* PAYMENT OPTIONS MODAL */}
          <Modal isFullScreen={true} modalVisible={modalVisible}>
            <PaymentOptions
              onCardPress={handleSelectCardFromList}
              getProfileDefaultCard={getProfileDefaultCard}
              onExitPress={handleModal}
              onSmsPress={handleModal}
              isFromPaymentDetails={true}
              profileType={profileType}
              handleAddNewCard={handleAddNewCard}
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
              <SelectCar
                inModal={true}
                closeModal={() => setAddCarModal(false)}
              />
            ) : (
              <AddCar setStep={setStep} step={step} inModal={true} />
            )}
          </Modal>
          <Modal
            isFullScreen={true}
            animationType="slide"
            modalVisible={profileDataActionSheetVisible}>
            <AddPersonalDataModalContent
              onClosePress={() => setProfileDataActionSheetVisible(false)}
            />
          </Modal>
          <Modal
            isFullScreen={true}
            animationType="slide"
            modalVisible={businessProfileDataActionSheetVisible}>
            <AddBusinessModalComponent
              onClosePress={() =>
                setBusinessProfileDataActionSheetVisible(false)
              }
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={activeLoadingScreen}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={AQUA} />
            </View>
          </Modal>
        </Box>
        {isLoading && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}>
            <ActivityIndicator size="large" color={BLUE} />
          </View>
        )}
      </>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            position: 'absolute',
            top: '3%',
            right: '5%',
            zIndex: 100,
          }}>
          <NativeBaseBackButton
            style={PaymentDetailsStyle.backButton}
            handleOnPress={() => {
              navigation.navigate('HomeDrawer');
            }}
          />
        </View>
        <WebView
          startInLoadingState={true}
          androidLayerType={'software'}
          style={{
            marginTop: '8%',
            flex: 1,
          }}
          source={{
            html: initiateNetopia?.html,
          }}>
          {/* <NativeBaseBackButton
            style={{
              backgroundColor: WHITE,
              position: "absolute",
              top: 50,
              left: 20,
            }}
            handleOnPress={() => {
              if (parkingsData.worksWithHub) {
                navigation.navigate("HomeDrawer");
              } else {
                navigation.goBack();
              }
            }}
          /> */}
        </WebView>
      </View>
    );
  }
};

export default PaymentDetails;
