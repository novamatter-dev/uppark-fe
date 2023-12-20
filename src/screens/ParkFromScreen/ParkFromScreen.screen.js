// @ts-nocheck
import React, {useState, useEffect} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
//assets & style
import {partialyFreeProducts} from '../../constants/products';
import {BLACK, BLUE, PLATINUM, WHITE} from '../../helpers/style/constants';
import ParkFromScreenStyle from './ParkFromScreen.style';
//components
import {
  ButtonComponent,
  NativeBaseBackButton,
  Title,
  Toast,
} from '../../components';
import {Tabs} from '../../components';
//libraries
import {useNavigation} from '@react-navigation/native';
import {Box, Text} from 'native-base';
import {useToast} from 'native-base';
import moment from 'moment';
import {t} from 'i18next';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {
  setParkingForm,
  setIsParkingSelected,
  setReservedPolygon,
  setSensorParking,
  resetParkingState,
} from '../../redux/features/parkings/parkingsSlice';

import LeftArrowIcon from '../../assets/icons/LeftArrowIcon.png';
import RightArrowIcon from '../../assets/icons/RightArrowIcon.png';

const ParkFromScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toast = useToast();
  // const parkingsData = useSelector(parkingsState);
  const {currentReservations, parkingDetails, parkingForm, parkingProducts} =
    useSelector(state => state.parkings.parkingsState);

  const [payload, setPayload] = useState({
    values: {
      id: null,
      title: '',
      time: 0,
      totalAmounts: '',
      type: '',
      startTime: '',
      endTime: '',
      index: 0,
      code: '',
      shortNumber: '',
    },
  });
  const [tab, setTab] = useState(0);
  const [productDisclaimer, setProductDisclaimer] = useState({
    isVisible: false,
    text: '',
  });

  const today = new Date();

  const handleSetPayload = data => {
    const find = () => {
      return currentReservations?.some(
        obj => obj.parkingId === parkingDetails?.parkingId,
      );
    };

    if (find()) {
      const reservations = [];

      const filter = currentReservations?.filter(
        currentReservations =>
          // reservations.push(
          (currentReservations.parkingId === currentReservations.lenght) === 1
            ? currentReservations[0].parkingId
            : parkingForm?.parkingId,
        // )
      );

      const startTime = moment(filter[0]?.endTime).format(
        'yyyy-MM-DDTHH:mm:ss',
      );
      const endTime = moment(filter[0]?.endTime)
        .add(data?.time / 60, 'hours')
        .format('yyyy-MM-DDTHH:mm:ss');

      const body = {
        minutes: data?.time,
        // totalAmounts: (data.time / 60) * parkingsData.parkingDetails.pricePerHour,
        totalAmounts: data?.price,
        startTime: startTime,
        endTime: endTime,
        parkingId: parkingForm?.parkingId,
        currencyType: data?.currencyType,
        productId: data?.id,
        code: data?.code,
        shortNumber: data?.shortNumber,
      };

      dispatch(setParkingForm(body));
    } else {
      const startTime = moment(today).format('yyyy-MM-DDTHH:mm:ss');
      const endTime = moment(startTime)
        .add(data?.time / 60, 'hours')
        .format('yyyy-MM-DDTHH:mm:ss');
      const body = {
        minutes: data?.time,
        // totalAmounts: (data.time / 60) * parkingsData.parkingDetails.pricePerHour,
        totalAmounts: data?.price,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        parkingId: parkingForm?.parkingId,
        currencyType: data?.currencyType,
        productId: data?.id,
        code: data?.code,
        shortNumber: data?.shortNumber,
      };
      dispatch(setParkingForm(body));
    }
  };

  const handleOnPress = () => {
    navigation.navigate('PaymentDetails');
  };

  const handleSuccessToast = () => {
    toast.show({
      placement: 'top',
      duration: 1500,
      render: () => {
        return <Toast message={t('select_product')} type={'danger'} />;
      },
    });
  };

  // const handleAutoSelect = (product) => {
  //   console.log("de cate ori intru aici ?", product);
  //   setPayload((payload) => ({
  //     ...payload,
  //     values: {
  //       ...payload.values,
  //       id: product?.productId,
  //       title:
  //         product?.durationMinutes > 60
  //           ? `${Math.floor(product?.durationMinutes / 60)} H`
  //           : `${product?.durationMinutes} Min`,
  //       time: product?.time,
  //       // time: 1,
  //       totalAmounts: `${product?.price} ${product?.currency}`,
  //       type: product?.type,
  //       code: product?.code,
  //       shortNumber: product?.shortNumber,
  //     },
  //   }));
  // };

  const handleSelectProduct = item => {
    if (item) {
      const hasGracePeriod = partialyFreeProducts?.find(
        product => product === item.code,
      );
      if (hasGracePeriod) {
        setProductDisclaimer({
          isVisible: true,
          text: t('partially_free_product_disclaimer'),
        });
      } else {
        setProductDisclaimer({
          isVisible: false,
          text: '',
        });
      }
      handleSetPayload(item);
      setPayload(payload => ({
        ...payload,
        values: {
          ...payload.values,
          id: item?.id,
          title: item?.title,
          time: item?.time,
          totalAmounts: `${item.price} ${item?.currencyType}`,
          type: item?.type,
          index: item?.idx,
          code: item?.code,
          shortNumber: item?.shortNumber,
        },
      }));
    }
  };

  function convertMinutes(minutes) {
    const secondsPerMin = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerWeek = 7;
    const daysPerMonth = 30;

    // const months = minutes / (minutesPerHour * hoursPerDay * daysPerMonth);
    // if (months >= 1) {
    //   return Math.floor(months) + ' LUNA'; // L pentru luni
    // }

    // const weeks = minutes / (minutesPerHour * hoursPerDay * daysPerWeek);
    // if (weeks >= 1) {
    //   return Math.floor(weeks) + ' SAPT'; // S pentru săptămâni
    // }

    const days = minutes / (minutesPerHour * hoursPerDay);
    if (days > 1) {
      return Math.floor(days) + ' ZILE'; // Z pentru zile
    }

    const hours = minutes / minutesPerHour;
    if (hours >= 1) {
      return Math.floor(hours) + ' H'; // H pentru ore
    }

    return minutes + 'Min';
  }

  const renderItem = ({item, index}) => {
    const hasGracePeriod = partialyFreeProducts?.find(
      product => product === item.code,
    );
    return (
      <TouchableOpacity
        onPress={() => {
          handleSelectProduct(item);
        }}
        style={{
          ...ParkFromScreenStyle.timeBtn,
          backgroundColor: item.id === payload.values.id ? BLUE : WHITE,
          marginLeft: index === 0 ? 0 : 10,
        }}>
        <Text
          style={{
            ...ParkFromScreenStyle.timeTitle,
            color: item.id === payload.values.id ? WHITE : BLACK,
          }}>
          {/* {item.title} */}
          {convertMinutes(item?.time)}
        </Text>
        {hasGracePeriod && (
          <Text
            style={{
              ...ParkFromScreenStyle.availableZones,
              position: 'absolute',
              top: '15%',
              right: '15%',
              zIndex: 10,
              fontSize: 16,
            }}>
            *
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleShowProducts = () => {
    const cardItem = parkingProducts.filter(product =>
      tab === 0 ? product.currency === 'RON' : product.currency === 'EURO',
    );
    const sortedProducts = cardItem.sort(
      (a, b) => a.durationMinutes - b.durationMinutes,
    );
    // handleAutoSelect(sortedProducts[0]);

    return sortedProducts.map((item, index) => {
      return {
        id: item.productId,
        title:
          item.durationMinutes < 60
            ? `${item.durationMinutes} m`
            : `${Math.ceil(item.durationMinutes / 60)}H`,
        time: item.durationMinutes,
        type: item.durationMinutes < 60 ? 'minutes' : 'hours',
        currencyType: item.currency,
        price: item.price,
        idx: index,
        code: item.code,
        shortNumber: item.shortNumber,
      };
    });
  };

  const handleBackBtn = () => {
    // dispatch(resetParkingState());
    dispatch(setIsParkingSelected(false));
    dispatch(setReservedPolygon([]));
    dispatch(
      setSensorParking({
        sensors: null,
        hasSensors: false,
      }),
    );
    navigation.navigate('HomeDrawer');
  };

  const handleTab = val => {
    setTab(val);
  };

  // useEffect(() => {
  //   const cardItem = parkingProducts.filter((product) =>
  //     tab === 0 ? product.currency === "RON" : product.currency === "EURO"
  //   );
  //   const sortedProducts = cardItem.sort(
  //     (a, b) => a.durationMinutes - b.durationMinutes
  //   );
  //   handleAutoSelect(sortedProducts[0]);
  // }, [parkingProducts, tab]);
  useEffect(() => {
    setPayload(payload => ({
      ...payload,
      values: {
        ...payload.values,
        id: null,
        title: '',
        time: 0,
        totalAmounts: '',
        type: '',
        startTime: '',
        endTime: '',
        index: 0,
        code: '',
        shortNumber: '',
      },
    }));
  }, [tab]);

  return (
    <Box style={ParkFromScreenStyle.container}>
      <NativeBaseBackButton
        isLoading={false}
        style={ParkFromScreenStyle.backButton}
        handleOnPress={() => handleBackBtn()}
      />
      <Title
        label={t('parking_form_title')}
        style={ParkFromScreenStyle.title}
      />
      <Box style={ParkFromScreenStyle.listContainer}>
        <Tabs tab={tab} handleTab={handleTab} />
        <View style={ParkFromScreenStyle.timelineTitleContainer}>
          <Image source={LeftArrowIcon} style={ParkFromScreenStyle.icon} />
          <Text style={ParkFromScreenStyle.text}>{t('quick_time_slots')}</Text>
          <Image source={RightArrowIcon} style={ParkFromScreenStyle.icon} />
        </View>
        <View style={ParkFromScreenStyle.productsWrapper}>
          <FlatList
            style={ParkFromScreenStyle.flatList}
            data={handleShowProducts()}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={payload.values.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          {/* TODO: verify this hardcoded values */}
          {payload.values.totalAmounts === '399 RON' && (
            <Text style={ParkFromScreenStyle.availableZones}>
              Valabilitate: Zona 0, Zona 1, Zona 2, Zona 3
            </Text>
          )}
          {payload.values.totalAmounts === '199 RON' && (
            <Text style={ParkFromScreenStyle.availableZones}>
              Valabilitate: Zona 0, Zona 1
            </Text>
          )}
          {productDisclaimer?.isVisible && (
            <Text style={ParkFromScreenStyle.availableZones}>
              {productDisclaimer?.text}
            </Text>
          )}
        </View>
      </Box>
      <Box style={ParkFromScreenStyle.priceContainer}>
        <Box style={ParkFromScreenStyle.textBox}>
          <Text style={ParkFromScreenStyle.timeSlotText}>{t('time_slot')}</Text>
          <Text style={ParkFromScreenStyle.toBePaidText}>
            {t('amount_to_be_paid')}
          </Text>
        </Box>
        <Box style={ParkFromScreenStyle.textBox}>
          <Text style={ParkFromScreenStyle.timeText}>
            {/* {payload.values.title} */}
            {convertMinutes(payload.values.time)}
          </Text>
          <Text style={ParkFromScreenStyle.equalsText}>=</Text>
          <Text style={ParkFromScreenStyle.ammountText}>
            {payload?.values?.totalAmounts}{' '}
            {/* {parkingDetails?.currencyType?.toUpperCase()} */}
          </Text>
        </Box>

        <Box style={ParkFromScreenStyle.sliderContainer}>
          {/* <Box style={ParkFromScreenStyle.confirmBtnContainer}> */}

          <ButtonComponent
            text={t('confirm').toUpperCase()}
            onPress={() => {
              if (!payload?.values?.id) {
                handleSuccessToast();
              } else {
                handleOnPress();
              }
            }}
            isDisabled={false}
            color={PLATINUM}
            labelColor={BLACK}
          />
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ParkFromScreen;
