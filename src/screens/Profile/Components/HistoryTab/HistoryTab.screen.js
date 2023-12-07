import React, {useEffect} from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
//style & assets
import ProfileStyle from '../../Profile.style';
//libraries
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
//components
import {HistoryCard} from '../index';
//redux
import {
  useGetHistoryListMutation,
  useGetHistoryDetailsMutation,
} from '../../../../services/parkings';
import {setParkingHistory} from '../../../../redux/features/users/userSlice';
import {useSelector, useDispatch} from 'react-redux';

const HistoryTab = () => {
  // const dispatch = useDispatch();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [getHistoryList] = useGetHistoryListMutation();
  const [getHistoryDetails] = useGetHistoryDetailsMutation();
  const {parkingsState} = useSelector(state => state.parkings);
  const {t} = useTranslation();

  const handleGetHistoryList = async () => {
    try {
      await getHistoryList()
        .unwrap()
        .then(answer => {})
        .catch(err => {
          console.log('ERR CATCH PROMISE: ', err);
        });
    } catch (err) {
      console.log('ERR HISTORY CATCH:', err);
    }
  };

  const handleNav = async item => {
    // console.log('item >>> ', item);
    dispatch(setParkingHistory(item));
    await getHistoryDetails({parkingReservationId: item.parkingReservationId})
      .then(answer => {
        // console.log('answer >>>', answer);
      })
      .catch(err => {
        console.log('err >>> ', err);
      });
    navigation.navigate('ReservartionDetailsScreen');
  };

  useEffect(() => {
    handleGetHistoryList();
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleNav(item)}
        style={ProfileStyle.historyItem}>
        <HistoryCard
          item={item}
          key={`history-card-${String(item.parkingReservationId)}`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={ProfileStyle.historyContainer}>
      {parkingsState?.history?.parkingPlaces.length > 0 && (
        <FlatList
          contentContainerStyle={{
            // flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          }}
          // inverted={true}
          style={ProfileStyle.flatList}
          data={parkingsState?.history?.parkingPlaces}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {parkingsState?.history?.parkingPlaces.length === 0 && (
        <Text
          style={{fontSize: 14, fontFamily: 'AzoSans-Bold', color: 'black'}}>
          {t('no_history_data')}
        </Text>
      )}
    </View>
  );
};

export default HistoryTab;
