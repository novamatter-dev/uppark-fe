import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
//style && assets
import SetYourPinStyle from "./SetYourParkPin.style";
//components
import {
  NativeBaseButton,
  Title,
  // Map,
  ButtonComponent,
} from "../../components";
import Map from "./Map/Map";
import { SearchBar } from "../../components";
import Directions from "../../components/Directions/Directions";
//libraries
import { Box } from "native-base";
import { debounce, floor, map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import ViewShot from "react-native-view-shot";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  parkingsState,
  setCarLocationSlice,
  setSearchLocation,
  setShowCounter,
  setIsParkingSelected,
} from "../../redux/features/parkings/parkingsSlice";
import {
  usePostUploadScreenshotMutation,
  useGetCurrentReservationsMutation,
} from "../../services/parkings";
import { useSendParkingConfirmationNotificationMutation } from "../../services/notifications";
import { t } from "i18next";

const SetYourParkPin = () => {
  const { userId } = useSelector((state) => state.auth);
  const { currentReservations, hasSensors, selectedSensor, reservedPolygon } =
    useSelector((state) => state.parkings.parkingsState);
  const parkingsData = useSelector(parkingsState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [postUploadScreenshot] = usePostUploadScreenshotMutation();
  const [confirmNotification] =
    useSendParkingConfirmationNotificationMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const mapRef = useRef();

  const [parkingGroups, setParkingGroups] = useState([]);
  const [carLocation, setCarLocation] = useState({
    latitude: parkingsData?.parkingDetails?.parkingLatitude,
    longitude: parkingsData?.parkingDetails?.parkingLongitude,
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0008;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const handleGetCurrentReservation = async () => {
    await getCurrentReservations().then((answer) => {});
  };

  useEffect(() => {
    locateCurrentPosition();
    handleGetCurrentReservation();
  }, []);

  const handleCarLocation = useCallback(
    debounce((location) => {
      setCarLocation((data) => ({
        ...data,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      setIsDisabled(false);
    }, 800)
  );

  const handleCarLocationSlice = () => {
    dispatch(setCarLocationSlice(carLocation));
    handleSnapshot();
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition((position) => {
      dispatch(
        setSearchLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        })
      );
    });
  };

  const handleUploadScreenshot = (uri) => {
    const uploadScreenshotUri = async () =>
      await postUploadScreenshot({
        parkingId:
          currentReservations[currentReservations.length - 1]
            ?.parkingReservationId,
        reqBody: {
          base_64_Screenshot: uri,
        },
      });

    // console.log(
    //   "b64 image string: ",
    //   parkingsData.reservationDetails.reservationId,
    //   "    /    ",
    //   uri
    // );

    try {
      uploadScreenshotUri()
        .then((answer) => {
          if (answer.data.isSucces) {
            // handleConfirmNotification();
            handleGetCurrentReservation();
            navigation.navigate("HomePage");
          }
        })
        .catch((err) => {
          console.log("PROMISE SCREENSHOT ERR >>>", err);
          navigation.navigate("HomePage");
        });
    } catch (err) {
      console.log("CATCH POST UPLOAD SCREENSHOT ERR >>>", err);
    }
  };

  const handleSnapshot = async () => {
    await mapRef.current.capture().then((uri) => {
      handleUploadScreenshot(uri);
      dispatch(setShowCounter(true));
      dispatch(setIsParkingSelected(false));
    });
  };

  const handleConfirmNotification = async () => {
    try {
      await confirmNotification({ userId: userId })
        .then((answer) => {
          console.log("success notification");
        })
        .catch((err) => {
          console.log("notification err: ", err);
        });
    } catch (err) {
      console.log("notification err: ", err);
    }
  };

  useEffect(() => {
    if (hasSensors) {
      const arr = [
        {
          parkings: [
            {
              latitude: selectedSensor.latitude,
              longitude: selectedSensor.longitude,
              position: 1,
            },
          ],
          ids: parkingsData?.parkingDetails?.groupId,
        },
      ];
      setParkingGroups(arr);
    } else {
      // const arr = [];
      // parkingsData?.parkingDetails?.parkingGroups?.foreach((parking) => {
      //   arr.push({ parkings: parking?.pointsDto, ids: parking.groupId });
      // });
      // setParkingGroups(arr);
    }
  }, [parkingsData?.parkingDetails]);

  return (
    <View style={SetYourPinStyle.container}>
      <View style={SetYourPinStyle.content}>
        <View
          style={{
            display: "flex",
            marginVertical: 16,
          }}
        >
          <Title label={t("set_pin")} style={SetYourPinStyle.title} />
        </View>

        <Box style={SetYourPinStyle.mapSmall}>
          <ViewShot
            ref={mapRef}
            options={{
              fileName: "map-shot",
              format: "jpg",
              quality: 0.2,
              result: "base64",
            }}
          >
            <View style={{ overflow: "hidden", borderRadius: 24 }}>
              <Map
                isPinDraggable={true}
                location={{
                  latitude: parkingsData?.parkingDetails?.parkingLatitude,
                  longitude: parkingsData?.parkingDetails?.parkingLongitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                // polygonGroup={parkingGroups}
                reservedPolygon={reservedPolygon?.parkings}
                handleCarLocation={handleCarLocation}
              />
            </View>
          </ViewShot>
        </Box>
        <Text style={SetYourPinStyle.placeDetailsSubtitle}>
          {parkingsData.parkingDetails.parkingShortTitle}
        </Text>
      </View>

      <View style={SetYourPinStyle.buttonsContainer}>
        <TouchableOpacity
          style={SetYourPinStyle.declineBtn}
          onPress={handleSnapshot}
        >
          <Text style={SetYourPinStyle.declineText}>
            {t("no_thanks").toUpperCase()}!
          </Text>
        </TouchableOpacity>

        <ButtonComponent
          text={t("confirm").toUpperCase()}
          onPress={handleCarLocationSlice}
          isDisabled={isDisabled}
        />
      </View>
    </View>
  );
};

export default SetYourParkPin;
