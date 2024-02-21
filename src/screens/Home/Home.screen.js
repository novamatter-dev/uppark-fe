import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  Platform,
  ActivityIndicator,
  Modal as NativeModal,
} from 'react-native';
//style & assets
import HomeStyle from './Home.style';
import svgs from '../../assets/svgs';
import WarningImage from '../../assets/images/MaintenanceWarning.png';
import {SvgXml} from 'react-native-svg';
import {AQUA, BLUE, RED, WHITE} from '../../helpers/style/constants';
import ActiveParkingStyle from '../ActiveParking/ActiveParking.style';
//libraries
import {Box, useToast, Actionsheet} from 'native-base';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
//components
import {
  Text,
  Map,
  Modal,
  ButtonComponent,
  CreateCar,
  Toast,
} from '../../components';
import {SearchBar, ParkDetails} from '../../components';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import AddCar from '../AddCar';
import ActionModal from '../../components/ActionModal/ActionModal';
//redux
import {
  parkingsState,
  setCurrentReservations,
  setNearByParkings,
  setSearchLocation,
  setShowCounter,
  setParkingForm,
  setUnselectParking,
  setReservationDetails,
  setPolygonParkingGroups,
  setParkingDetails,
  setIsParkingSelected,
  setWorksWithHub,
  setIsLoading,
} from '../../redux/features/parkings/parkingsSlice';
import {useSelector, useDispatch} from 'react-redux';
import {
  useNearbyParkingsMutation,
  useGetCurrentReservationsMutation,
  useCancelReservationMutation,
  useGetMiniParkDetailsMutation,
  useGetParkingDetailsMutation,
  useGetParkingProductsMutation,
  useGetSensorsMutation,
} from '../../services/parkings';
import {useUpdateFcmTokenMutation} from '../../services/notifications';
import {setActiveCar} from '../../redux/features/cars/carsSlice';
import {setUserId} from '../../redux/features/auth/authSlice';
import {useGetCarsMutation} from '../../services/cars';
import {
  useGetSettingsMutation,
  useUpdateSettingsMutation,
} from '../../services/users';
import {SafeAreaView} from 'react-native';
import store from '../../redux/store';
import {getCookie} from '../../helpers';

const Home = () => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const {t} = useTranslation();

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {cars, activeCar} = useSelector(state => state.cars);
  const {jwt, userId} = useSelector(state => state.auth);
  const {
    currentReservations,
    showCounter,
    hasSensors,
    parkingDetails,
    isParkingSelected,
    isLoading,
  } = useSelector(state => state.parkings.parkingsState);
  const parkingsData = useSelector(parkingsState);
  const {accountSettings} = useSelector(state => state.users);

  let starttimeslice;

  // console.log({jwt});

  const [getCars] = useGetCarsMutation();
  const [nearbyParkings] = useNearbyParkingsMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();
  const [cancelReservation] = useCancelReservationMutation();
  const [updateToken] = useUpdateFcmTokenMutation();
  const [getMiniParkDetails] = useGetMiniParkDetailsMutation();
  const [getSettings] = useGetSettingsMutation();
  const [updateSettings] = useUpdateSettingsMutation();
  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();

  const [getSensors] = useGetSensorsMutation();

  const [isToggled, setIsToggled] = useState(false);
  const [displayCounter, setDisplayCounter] = useState(false);
  const [parkingGroups, setParkingGroups] = useState([]);
  const [showCarModal, setShowCarModal] = useState(false);
  const [noParkings, setNoParkings] = useState(false);
  const [miniparkDisclaimer, setMiniparkDisclaimer] = useState({
    isVisible: false,
    message: '',
  });
  const [showExtend, setShowExtend] = useState(false);
  const [allowNotifications, setAllowNotifications] = useState(false);
  const [startTimeSlice, setStartTimeSlice] = useState(0);

  const getFcmToken = async () => {
    const id = await DeviceInfo.getUniqueId();
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    const body = {
      newFirbaseToken: fcmtoken,
      deviceId: id,
    };
    if (fcmtoken) {
      await updateToken(body)
        .then(() => {})
        .catch(err => {
          console.log('err fcm token ', err);
        });
    }
  };

  const handleGetCars = async () => {
    await getCars()
      .then(answer => {
        if (answer.data.userCars.length > 0) {
          setShowCarModal(false);
          if (activeCar === null) {
            dispatch(setActiveCar(answer.data.userCars[0]));
          }
        } else {
          dispatch(setActiveCar(null));
          setShowCarModal(true);
        }
      })
      .catch(err => {
        console.log('getCars err: ', err);
      });
  };

  // check if there is an activ reservation

  const handleGetCurrentReservation = async () => {
    // await cancelReservation({ parkingReservationId: 10005 });
    await getCurrentReservations()
      .then(answer => {
        // TODO: La iasi trebuie sa-mi apara rezervare loc de parcare
        // const currentTime = new Date();
        // let allExpired = true;
        // let endTimeToSave = null;

        // TODO: should refactor after backend fix
        // for (const reservation of answer.data) {
        //   const endTime = new Date(reservation.endTime);

        //   // Check if the endTime is in the future (not expired)
        //   if (endTime > currentTime) {
        //     allExpired = false;
        //     console.log('AM INTRAT AICI?');
        //     // If the array length is 1, save the endTime
        //     if (answer.data.length === 1) {
        //       endTimeToSave = endTime;
        //       setDisplayCounter(true);
        //     } else {
        //       setDisplayCounter(false);
        //     }
        //   }
        // }

        if (answer?.data?.length === 1) {
          setDisplayCounter(true);
        } else {
          setDisplayCounter(false);
        }

        dispatch(setIsLoading(false));

        if (answer.error) {
          setDisplayCounter(false);
          dispatch(setCurrentReservations([]));
        }
        handleExtendBtn();
      })
      .catch(err => {
        console.log('getCurrentReservations err: ', err);
        dispatch(setCurrentReservations([]));
        dispatch(setIsLoading(false));
      });
  };

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const handleNearbyParkings = async (coords, isAutoSearch) => {
    const body = {
      longitude: coords.longitude,
      latitude: coords.latitude,
      distance: 20000,
    };

    console.log('nearbyParkings body', body);

    await nearbyParkings(body)
      .then(answer => {
        console.log('nearbyParkings answer', answer.data);
        // console.log('nearbyParkings home screen body:', body);
        // console.log('nearbyParkings home screen answer:', answer.data);
        if (answer.data.parkingGroups.length > 0) {
          dispatch(setNearByParkings(answer.data));
          setNoParkings(false);
          // handleGetSensors(answer.data);
        } else {
          if (isAutoSearch) {
            setNoParkings(true);
            dispatch(setUnselectParking());
            if (isToggled) {
              setIsToggled(false);
            }
          }
          // SHOW TOAST
          toast.show({
            placement: 'top',
            duration: 1500,
            render: () => {
              return (
                <Toast message={t('missing_parking_lots')} type={'danger'} />
              );
            },
          });
        }
      })
      .catch(err => {
        console.log('nearby err: ', err);
      });
  };

  // get parking sensors
  const handleGetSensors = async data => {
    const body = data?.parkingGroups
      ?.filter(item => item.hasSensors)
      .map(item => item.parkingId);
    await getSensors(body)
      .then(answer => {})
      .catch(err => {
        console.log('ERR getSensors >>> ', err);
      });
  };

  useEffect(() => {
    handleNearbyParkings(
      {
        latitude: parkingsData?.searchLocation?.latitude,
        longitude: parkingsData?.searchLocation?.longitude,
      },
      true,
    );
    // dispatch(setLoadingScreen(false));
  }, []);

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(position => {
      dispatch(
        setSearchLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      );
    });
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const getparkingDetails = async id => {
    const {data, error: apiError} = await getParkingDetails({id: id});

    if (!apiError) {
      const body = {
        parkingId: id,
        amenities: data?.amenities,
        isOpened: data?.isOpened,
        noLots: data?.noLots,
        parkingLongitude: data.entranceLongitude,
        parkingLatitude: data.entranceLatitude,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroups,
        externalParkingId: data?.externalParkingId,
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(setIsParkingSelected({isParkingSelected: true, parkingId: id}));
      dispatch(
        setReservationDetails({
          reservationId: currentReservations[0]?.parkingReservationId,
          start: currentReservations[0]?.reservedFrom,
          end: currentReservations[0]?.reservedTo,
        }),
      );

      navigation.navigate('ParkFromScreen');
    }
  };

  const handleOnSubmit = () => {
    console.log('parkingsData.lpr', parkingsData.parkingDetails.lprUrl);
    if (parkingsData.worksWithHub) {
      navigation.navigate('QrScanner');
    } else if (parkingsData.isMiniPark) {
      handleMiniparkCheck();
    } else if (parkingsData.parkingDetails.lprUrl) {
      handleLprCheck();
    } else {
      if (showExtend) {
        // getparkingDetails(currentReservations[0].parkingId);
        goToReservations();
        // dispatch(
        //   setReservationDetails({
        //     reservationId: currentReservations[0]?.parkingReservationId,
        //     start: currentReservations[0]?.reservedFrom,
        //     end: currentReservations[0]?.reservedTo,
        //   })
        // );
      } else {
        navigation.navigate('ParkFromScreen');
      }
    }
  };

  const handleLprCheck = async () => {
    const body = {
      plateId: activeCar?.licensePlateNumber,
      lprUrl: parkingsData.parkingDetails.lprUrl,
    };

    // CALIN MI-A ZIS SA FAC FETCH
    var myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');

    myHeaders.append('Authorization', 'Bearer ' + jwt);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      data: body,
    };

    await fetch(
      `${body?.lprUrl}/parking-sessions/get-price-by-license-plate/${body?.plateId}`,
      requestOptions,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('data lpr >>> ', data);
        if (data.price === 0) {
          setMiniparkDisclaimer({
            isVisible: true,
            message: 'Iesire libera',
          });
        } else {
          const endTime = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
          const body = {
            // minutes: data?.data?.minutes,
            totalAmounts: data.price,
            startTime: new Date(endTime).toISOString(),
            // startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(endTime).toISOString(),
            parkingId: parkingsData.parkingForm.parkingId,
            currencyType: 'RON',
            // TODO: verify hardcoded productId
            productId: 236,
          };
          dispatch(setParkingForm(body));
          navigation.navigate('PaymentDetails');
        }
      })
      .catch(err => {
        console.log('err lpr >>> ', err);
      });
  };

  const handleMiniparkCheck = async () => {
    const body = {
      plateId: activeCar?.licensePlateNumber,
      externalParkingId: parkingDetails?.externalParkingId.toString(),
    };

    await getMiniParkDetails({
      plateId: body?.plateId,
      externalParkingId: body?.externalParkingId,
    })
      .then(answer => {
        if (answer.error) {
          switch (answer.error.data.message) {
            // TODO: verify hardcoded text
            case 'MINIPARK_NOT_IN_PARK':
              return setMiniparkDisclaimer({
                isVisible: true,
                message: 'Masina nu se afla in parcare',
              });

            case 'MINIPAR_FREE_TO_EXIT':
              return setMiniparkDisclaimer({
                isVisible: true,
                message: 'Ticket-ul este deja platit',
              });

            case 'MINIPARK_NOTHING_TO_PAY':
              return setMiniparkDisclaimer({
                isVisible: true,
                message: 'Iesire libera',
              });
            default:
              return setMiniparkDisclaimer({
                isVisible: true,
                message: 'Iesire libera',
              });
          }
        } else {
          const endTime = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
          const body = {
            minutes: answer?.data?.minutes,
            totalAmounts: answer?.data?.amount,
            startTime: new Date(answer?.data?.entry_time).toISOString(),
            endTime: new Date(endTime).toISOString(),
            parkingId: parkingsData.parkingForm.parkingId,
            currencyType: 'RON',
            productId: answer?.data?.productId,
          };
          dispatch(setParkingForm(body));
          navigation.navigate('PaymentDetails');
        }
      })
      .catch(err => {
        console.log('err minipark >>> ', err);
      });
  };

  const handleNewParking = () => {
    if (cars.length != 0) {
      handleGetCurrentReservation();
      handleOnSubmit();
    }
  };

  const handleSetUserDetails = () => {
    if (jwt) {
      let userId = jwt_decode(jwt);
      dispatch(setUserId(userId.UserId));

      locateCurrentPosition();
    }
  };

  const goToReservations = () => {
    if (currentReservations.length > 1) {
      handleGetCurrentReservation();
      navigation.navigate('ReservetionsList');
    } else if (currentReservations.length === 1) {
      // handleGetCurrentReservation();
      dispatch(setIsLoading(true));
      hadnleGetCurrentReservationId();
      setShowExtend(true);
      // navigation.navigate("ParkFromScreen");
    }
  };

  const hadnleGetCurrentReservationId = () => {
    handleGetParkingProducts(currentReservations[0]?.parkingId);
    // getparkingDetails(
    //   currentReservations[0]?.parkingId,
    //   currentReservations[0]?.parkingLatitude,
    //   currentReservations[0]?.parkingLongitude
    // );
  };

  const handleGetParkingProducts = async parkingId => {
    await getParkingProducts({parkingId})
      .then(() => {
        dispatch(setIsLoading(false));
        navigation.navigate('ParkFromScreen');
      })
      .catch(err => {
        console.log('getParkingProducts err ', err);
      });
  };

  const handleShowActiveReservations = () => {
    navigation.navigate('ReservetionsList');
  };

  // TODO: Verify if needed
  useEffect(() => {
    if (showCounter) {
      setDisplayCounter(true);
    } else {
      setDisplayCounter(false);
    }
  }, [showCounter]);

  const handleGetAccountSettings = async () => {
    await getSettings()
      .then(answer => {
        if (!answer?.data?.allowPushNotifications) {
          const notifications = true;
          const marketing = answer.data.allowMarketingMaterials;
          const notifyBeforeParking = answer.data.notifyMeBeforeParkingEnds;
          setAllowNotifications(true);
        }
        setAllowNotifications(false);
      })
      .catch(err => {
        console.log('settings err:', err);
      });
  };

  const handleUpdateAccSettings = async (
    notifications,
    marketing,
    notifyBeforeParking,
  ) => {
    const body = {
      allowPushNotifications: notifications,
      allowMarketingMaterials: marketing,
      notifyMeBeforeParkingEnds: notifyBeforeParking,
    };

    await updateSettings(body)
      .then(() => {
        setAllowNotifications(false);
      })
      .catch(err => {
        console.log('update settings err: ', err);
      });
  };

  const handleCheckNotificationAccess = async () => {
    if (
      'allowPushNotifications' in accountSettings
      // && accountSettings?.allowPushNotifications
    ) {
      return;
    } else {
      handleGetAccountSettings();
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(setIsLoading(true));
      handleSetUserDetails();
      handleGetCars();
      handleGetCurrentReservation();
      setDisplayCounter(showCounter);
      getFcmToken();

      if (currentReservations !== 1) {
        dispatch(setShowCounter(false));
      }

      handleCheckNotificationAccess();
    }

    return () => setIsToggled(false);
  }, [isFocused]);

  useEffect(() => {
    const arr = [];
    parkingsData?.nearByParkings?.parkingGroups?.map((el, idx) => {
      // TODO: Iasi parking
      if (el?.parkingId === 65) return;
      arr.push({
        parkings: el?.pointsDto,
        ids: el?.parkingId,
        groupId: el?.groupId,
      });
    });

    setParkingGroups(arr);
    dispatch(setPolygonParkingGroups(arr));
  }, [parkingsData?.nearByParkings]);

  const handleExtendBtn = () => {
    if (currentReservations.length >= 1) {
      if (!isParkingSelected && displayCounter) {
        setShowExtend(true);
      } else if (isParkingSelected) {
        setShowExtend(false);
      }
    } else {
      setShowExtend(false);
    }
  };

  return (
    <>
      {/* <SafeAreaView> */}
      <View
        style={{
          ...HomeStyle.container,
          // paddingTop: Platform.OS === 'ios' ? '10%' : '5%',
        }}>
        <View style={HomeStyle.searchWrapper}>
          <SearchBar
            navigation={navigation}
            handleNearbyParkings={handleNearbyParkings}
            displayCounter={displayCounter}
          />
        </View>

        <View style={HomeStyle.bodyWrapper}>
          {/* <View style={HomeStyle.infoTextWrapper}>
            <Image source={WarningImage} style={HomeStyle.warningImage} />
            <Text style={HomeStyle.redInfoText}>
              {t('be_sure_to_select_correct_zone')}
            </Text>
          </View> */}

          <Box style={HomeStyle.mapSmall}>
            <View style={{overflow: 'hidden', borderRadius: 24}}>
              <Map
                location={{
                  latitude: parkingsData?.searchLocation?.latitude,
                  longitude: parkingsData?.searchLocation?.longitude,
                  latitudeDelta: parkingsData?.searchLocation?.latitudeDelta,
                  longitudeDelta: parkingsData?.searchLocation?.longitudeDelta,
                }}
                polygonGroup={parkingGroups}
                noParkings={noParkings}
                setShowExtend={setShowExtend}
                handleExtendBtn={handleExtendBtn}
                handleNearbyParkings={handleNearbyParkings}
                setIsToggled={setIsToggled}
              />
            </View>
            {displayCounter && currentReservations.length === 1 && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  left: '7%',
                  // width: "37%",
                }}
                onPress={handleShowActiveReservations}>
                <View style={ActiveParkingStyle.timeLeft}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <SvgXml
                      xml={svgs.clock}
                      width={22}
                      height={24}
                      fill={AQUA}
                    />
                  </View>

                  <CountdownTimer
                    endTime={currentReservations[0]?.endTime}
                    startTime={starttimeslice}
                    setDisplayCounter={setDisplayCounter}
                    handleGetCurrentReservation={handleGetCurrentReservation}
                    fontSize={16}
                    textColor={WHITE}
                  />
                </View>
              </TouchableOpacity>
            )}

            {currentReservations.length > 1 && (
              <View style={HomeStyle.leftButton}>
                <TouchableOpacity
                  style={HomeStyle.multipleBtn}
                  onPress={goToReservations}>
                  <Text style={HomeStyle.btnLabel}>
                    {t('show_reservations')}
                  </Text>
                  <View style={HomeStyle.multipleTxtWrapper}>
                    <Text style={{...HomeStyle.btnLabel, color: 'black'}}>
                      {currentReservations.length}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Box>

          <View style={HomeStyle.placeDetailsLarge}>
            <View>
              {parkingsData.isParkingSelected && (
                <TouchableOpacity
                  onPress={handleToggle}
                  style={HomeStyle.showMoreBtn}>
                  <View style={HomeStyle.showMoreContent}>
                    <Text style={HomeStyle.showMoreContentText}>
                      {isToggled ? t('show_less') : t('show_more')}
                    </Text>

                    <SvgXml
                      xml={isToggled ? svgs.arrowDown : svgs.arrowUp}
                      width={22}
                      height={hp(1.23)}
                    />

                    <View style={HomeStyle.dummyFill}></View>
                  </View>
                </TouchableOpacity>
              )}

              <View>
                {parkingsData.isParkingSelected ? (
                  <Text style={HomeStyle.priceText}>
                    {parkingsData.parkingDetails.pricePerHour}{' '}
                    {parkingsData.parkingDetails.currencyType} /h
                  </Text>
                ) : (
                  <Text style={HomeStyle.priceText}>
                    {t('select_parking')}
                    {/* {hasSensors
                    ? "Reservations are only valid for 30 minutes!"
                    : // : "Select a parking lot"}
                      t("select_parking")} */}
                  </Text>
                )}
              </View>
              {!parkingsData.isParkingSelected && (
                <View style={HomeStyle.noParkingSelected}>
                  <Text style={HomeStyle.detailsText}>
                    {t('no_parking_selected')}
                  </Text>
                </View>
              )}

              <Text style={HomeStyle.placeDetailsSubtitle}>
                {parkingsData.isParkingSelected
                  ? parkingsData.parkingDetails.parkingShortTitle
                  : ''}
              </Text>
            </View>

            {isToggled && <ParkDetails />}
          </View>
        </View>

        <View style={HomeStyle.absoluteBottom}>
          <ButtonComponent
            text={
              showExtend
                ? t('extend_time').toUpperCase()
                : t(
                    parkingsData.worksWithHub ? 'scan_ticket' : 'park_now',
                  ).toUpperCase()
            }
            onPress={showExtend ? handleOnSubmit : handleNewParking}
            isDisabled={
              showExtend
                ? false
                : parkingsData.isParkingSelected &&
                  parkingsData.parkingDetails.isOpened
                ? false
                : true
            }
          />
        </View>
      </View>

      <Modal isFullScreen={true} modalVisible={showCarModal}>
        <CreateCar handleClose={() => setShowCarModal(false)} />
      </Modal>

      <Actionsheet
        isOpen={miniparkDisclaimer.isVisible}
        style={{height: '45%', position: 'absolute', bottom: 0}}>
        <ActionModal
          text={miniparkDisclaimer.message}
          handleNo={() =>
            setMiniparkDisclaimer({isVisible: false, message: ''})
          }
          // handleYes={handleYes}
          isAction={false}
        />
      </Actionsheet>
      <Actionsheet
        isOpen={allowNotifications}
        // isOpen={true}
        style={{height: '45%', position: 'absolute', bottom: 0}}>
        <ActionModal
          text={'Allow push notifications ?'}
          handleNo={() => setAllowNotifications(false)}
          handleYes={() => handleUpdateAccSettings(true, false, 5)}
          isAction={true}
          reverseButtons={true}
        />
      </Actionsheet>
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
};

export default Home;
