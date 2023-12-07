import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Image, Box, HStack, Text} from 'native-base';
import HistoryCardStyle from './HistoryCard.style';
import moment from 'moment';
import {useGetHistoryItemImageMutation} from '../../../../services/parkings';
import HistoryPlaceholder from '../../../../assets/icons/HistoryPlaceholder.png';

const HistoryCard = props => {
  const {item} = props;

  const {parkingReservationId, date, parkingShortTitle, price} = item;

  const [getHistoryItemImage] = useGetHistoryItemImageMutation();
  const [image, setImage] = useState({base_64: null});

  const handleGetImage = async () => {
    try {
      await getHistoryItemImage({parkingReservationId})
        .unwrap()
        .then(answer => {
          setImage({base_64: answer.base_64});
        })
        .catch();
    } catch (err) {}
  };

  useEffect(() => {
    handleGetImage();
  }, []);

  return (
    <View style={HistoryCardStyle.dataContainer}>
      <View style={HistoryCardStyle.textContainer}>
        <Text style={HistoryCardStyle.dateText}>
          {moment(item.startTime).format('DD.MM.YYYY - HH:mm')}
        </Text>
        <Text style={HistoryCardStyle.plateText}>
          {item?.ticketIdentifier ? item?.ticketIdentifier : item?.plateNumber}
        </Text>
        <Text style={HistoryCardStyle.locationText}>{parkingShortTitle}</Text>
        {/* TODO: verify hardcoded value */}
        <Text style={HistoryCardStyle.priceText}>{item.totalPrice} RON</Text>
      </View>
      <View>
        {/* {image.base_64 ? (
          <Image
            style={HistoryCardStyle.imageContainer}
            source={HistoryPlaceholder}
            // source={{
            //   uri: `data:image/png;base64,${image.base_64}`,
            // }}
            alt={'...'}
          />
        ) : (
          <Image
            style={HistoryCardStyle.imageContainer}
            // TODO: verify hardcoded value
            source={{
              uri: `data:image/png;base64,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`,
            }}
            alt={'...'}
          />
        )} */}
      </View>
      <View style={HistoryCardStyle.imgContainer}>
        <Image
          style={HistoryCardStyle.img}
          source={HistoryPlaceholder}
          alt={'...'}
        />
      </View>
      {/* <View>
        <Image
          style={HistoryCardStyle.placeholderImage}
          source={HistoryPlaceholder}
        />
      </View> */}
    </View>
  );
};

export default HistoryCard;
