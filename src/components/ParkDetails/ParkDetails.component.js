import { Text } from "../../components";
import ParkDetailsStyle from "./ParkDetails.style";
import { Box } from "native-base";
import React from "react";
import { parkingsState } from "../../redux/features/parkings/parkingsSlice";
import { useSelector } from "react-redux";
import { t } from "i18next";

const ParkDetails = () => {
  const parkingsData = useSelector(parkingsState);
  const { parkingDetails } = useSelector(
    (state) => state.parkings.parkingsState
  );

  const startHour =
    parkingsData.parkingDetails.parkingSchedules[0].startHour.split(":");
  startHour.splice(-1);

  const endHour =
    parkingsData.parkingDetails.parkingSchedules[0].endHour.split(":");
  endHour.splice(-1);

  return (
    <Box>
      <Text style={ParkDetailsStyle.placeDetailsEntry}>
        <Text style={ParkDetailsStyle.placeDetailsEntryTitle}>
          {t("worktime")} &bull;{" "}
          <Text
            style={
              parkingsData.parkingDetails.isOpened === true
                ? ParkDetailsStyle.opened
                : ParkDetailsStyle.closed
            }
          >
            {parkingsData.parkingDetails.isOpened === true
              ? "Opened"
              : "Closed"}
          </Text>
        </Text>
      </Text>

      <Text style={ParkDetailsStyle.placeDetailsEntryContent}>
        <Text>
          {parkingsData.parkingDetails.parkingSchedules[0].dayOfWeek === 8
            ? "Non Stop"
            : "Monday - Friday"}
        </Text>
        <Text> &bull; </Text>
        <Text>
          {startHour.join(":")}

          {" - "}

          {endHour.join(":")}
        </Text>
      </Text>

      {parkingDetails?.amenities.length > 0 && (
        <Text style={ParkDetailsStyle.placeDetailsEntry}>
          <Text style={ParkDetailsStyle.placeDetailsEntryTitle}>
            {t("amenities")}
          </Text>
        </Text>
      )}
      {parkingDetails?.amenities.map((parking, index) => {
        console.log("parking >>>> ", parking);
        return (
          <Text style={ParkDetailsStyle.placeDetailsEntryContent} key={parking}>
            <Text style={ParkDetailsStyle.detailsText}>
              {parking === "Locuri pentru handicapati"
                ? t("disabled_parking")
                : t(parking)}
            </Text>
            {index !== parkingDetails?.amenities.length - 1 && (
              <Text style={ParkDetailsStyle.placeDetailsEntryBullet}>
                {" "}
                &bull;{" "}
              </Text>
            )}
          </Text>
        );
      })}
    </Box>
  );
};

export default ParkDetails;
