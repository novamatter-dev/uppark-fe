import React, { useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
//style && assets
import dtyle from "./style";
//libraries
import PropTypes from "prop-types";
import Toast, { ToastProvider } from "react-native-toast-notifications";
import style from "./style";
import { useNavigation } from "@react-navigation/native";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  useGetParkingDetailsMutation,
  useGetParkingProductsMutation,
  useGetCurrentReservationsMutation,
} from "../../services/parkings";
import {
  setWorksWithHub,
  setParkingDetails,
  setIsParkingSelected,
  setGroupId,
  setCurrentReservation,
} from "../../redux/features/parkings/parkingsSlice";
import ButtonComponent from "../ButtonComponent";
import { AQUA, WHITE } from "../../helpers/style/constants";
import { t } from "i18next";

const NotificationPopup = (props) => {
  const { setIsVisible = () => {} } = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { modalTitle, modalBody, sentTime, messageId, parkingId, type } =
    useSelector((state) => state.notification);
  const [getParkingDetails] = useGetParkingDetailsMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();
  const [getCurrentReservations] = useGetCurrentReservationsMutation();

  const toastRef = useRef();

  const handleExtend = () => {
    setIsVisible(false);
    // dispatch(
    //   setCurrentReservation({
    //     startTime: null,
    //     endTime: null,
    //     parkingReservationId: null,
    //   })
    // );
    handleGetParkingProducts(parkingId);
    navigation.navigate("ParkFromScreen");

    // handleParkingDetails(parkingId);
  };

  const handleGetReservations = async () => {
    await getCurrentReservations();
  };

  const handleParkingDetails = async (id, lat, lng) => {
    const { data, error: apiError } = await getParkingDetails({ id: id });

    if (!apiError) {
      const body = {
        parkingId: id,
        amenities: data?.amenities,
        isOpened: data?.isOpened,
        noLots: data?.noLots,
        parkingLongitude: lng,
        parkingLatitude: lat,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroups,
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(
        setIsParkingSelected({ isParkingSelected: true, parkingId: id })
      );
      dispatch(setGroupId(parkingGroup));
    } else {
      console.log("getParkingDetails apiError: ", apiError);
    }
  };

  const handleGetParkingProducts = async (parkingId) => {
    await getParkingProducts({ parkingId });
  };

  const handleOk = () => {
    handleGetReservations();
    setIsVisible(false);
  };

  //TODO: types to UPPERCASE
  //TODO: get types for all notifications
  return (
    <>
      <View style={style.container}>
        {/* <Text style={style.title}>{modalTitle}</Text> */}
        {type === "YOU_JUST_PARKED" && (
          <Text style={style.title}>{t("you_ve_just_parked")}</Text>
        )}
        {type === "YOU_JUST_EXTEND_CURRENT_PARKING" && (
          <Text style={style.title}>
            {t("YOU_JUST_EXTEND_CURRENT_PARKING")}
          </Text>
        )}
        {type === "YOUR_RESERVATION_EXPIRED" && (
          <Text style={style.title}>{t("YOUR_RESERVATION_EXPIRED")}</Text>
        )}
        {/* {type === "YOUR_RESERVATION_EXPIRED" && (
          <Text style={style.title}>{modalBody}</Text>
        )} */}
        {type === "YOU_JUST_PARKED" ||
          (type === "YOU_JUST_EXTEND_CURRENT_PARKING" && (
            <Text style={style.content}>{t("uppark_services")}</Text>
          ))}

        {type === "YOUR_RESERVATION_EXPIRED" && (
          // <ButtonComponent
          //   onPress={handleExtend}
          //   text={"Extend"}
          //   isDisabled={false}
          //   labelColor="black"
          //   color={WHITE}
          // />
          <TouchableOpacity onPress={handleExtend}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "AzoSans-Bold",
                color: AQUA,
                textTransform: "uppercase",
              }}
            >
              {t("extend")}
            </Text>
          </TouchableOpacity>
        )}

        <ButtonComponent
          onPress={() => handleOk()}
          text={"OK"}
          isDisabled={false}
          labelColor="black"
          color={WHITE}
        />
      </View>
      <Toast
        ref={toastRef}
        style={{
          zIndex: 3,
          elevation: 3,
        }}
      />
    </>
  );
};

NotificationPopup.prototype = {
  setIsVisible: PropTypes.func,
};

export default NotificationPopup;
