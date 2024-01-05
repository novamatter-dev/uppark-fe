import {t} from 'i18next';
import {Box} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Text} from '../../components';
import {parkingsState} from '../../redux/features/parkings/parkingsSlice';
import ParkDetailsStyle from './ParkDetails.style';

const ParkDetails = () => {
  const parkingsData = useSelector(parkingsState);
  const {parkingDetails} = useSelector(state => state.parkings.parkingsState);

  const startHour =
    parkingsData.parkingDetails.parkingSchedules[0].startHour.split(':');
  startHour.splice(-1);

  const endHour =
    parkingsData.parkingDetails.parkingSchedules[0].endHour.split(':');
  endHour.splice(-1);

  return (
    <Box>
      <Text style={ParkDetailsStyle.placeDetailsEntry}>
        <Text style={ParkDetailsStyle.placeDetailsEntryTitle}>
          {t('worktime')} &bull;{' '}
          <Text
            style={
              parkingsData.parkingDetails.isOpened === true
                ? ParkDetailsStyle.opened
                : ParkDetailsStyle.closed
            }>
            {parkingsData.parkingDetails.isOpened === true
              ? t('opened')
              : t('closed')}
          </Text>
        </Text>
      </Text>

      <Text style={ParkDetailsStyle.placeDetailsEntryContent}>
        <Text>
          {parkingsData.parkingDetails.parkingSchedules[0].dayOfWeek === 8
            ? 'Non Stop'
            : t('monday_to_friday')}
        </Text>
        <Text> &bull; </Text>
        <Text>
          {startHour.join(':')}
          {/* {parkingsData.parkingDetails.parkingSchedules[0].startHour} -{" "} */}
          {' - '}
          {/* {parkingsData.parkingDetails.parkingSchedules[0].endHour} */}
          {endHour.join(':')}
        </Text>
      </Text>

      {parkingDetails?.amenities.length > 0 ||
      (parkingDetails?.amenities.length === 0 &&
        parkingsData.parkingDetails.isAvailable === false) ? (
        <Text style={ParkDetailsStyle.placeDetailsEntry}>
          <Text style={ParkDetailsStyle.placeDetailsEntryTitle}>
            {t('amenities')}
          </Text>
        </Text>
      ) : null}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          flexWrap: 'wrap',
        }}>
        {parkingDetails?.amenities.map((parking, index) => {
          if (parking !== 'Plata prin card') {
            return (
              <Text
                style={ParkDetailsStyle.placeDetailsEntryContent}
                key={parking}>
                <Text style={ParkDetailsStyle.detailsText}>
                  {parking === 'Locuri pentru handicapati'
                    ? t('disabled_parking')
                    : parking === 'Plata prin card'
                    ? t('card_pay')
                    : parking === 'Plata Parcometru'
                    ? t('parcomat_payment')
                    : t(parking)}
                </Text>
                {index !== parkingDetails?.amenities.length - 1 && (
                  <Text style={ParkDetailsStyle.placeDetailsEntryBullet}>
                    {' '}
                    &bull;{' '}
                  </Text>
                )}
              </Text>
            );
          } else if (
            parking === 'Plata prin card' &&
            parkingsData.parkingDetails.isAvailable
          ) {
            return (
              <Text
                style={ParkDetailsStyle.placeDetailsEntryContent}
                key={parking}>
                <Text style={ParkDetailsStyle.detailsText}>
                  {t('card_payment')}
                </Text>
                {index !== parkingDetails?.amenities.length - 1 && (
                  <Text style={ParkDetailsStyle.placeDetailsEntryBullet}>
                    {' '}
                    &bull;{' '}
                  </Text>
                )}
              </Text>
            );
          }
        })}
        {!parkingsData.parkingDetails.isAvailable && (
          <Text
            style={ParkDetailsStyle.placeDetailsEntryContentRed}
            key={'unavailable-parking'}>
            {t('parking_card_payment_unavailable')}
          </Text>
        )}
      </View>
    </Box>
  );
};

export default ParkDetails;
