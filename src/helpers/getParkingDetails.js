import { useGetParkingDetailsMutation } from "../services/parkings";

import { useDispatch } from "react-redux";

const [getParkingDetails] = useGetParkingDetailsMutation();

export const getparkingDetailsHelper = async (id) => {
  const { data, error: apiError } = await getParkingDetails({ id: id });
  console.log("interu pe aicisa");
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
    dispatch(setIsParkingSelected({ isParkingSelected: true, parkingId: id }));
  }
};
