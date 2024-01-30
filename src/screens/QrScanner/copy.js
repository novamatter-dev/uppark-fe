import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  BackHandler,
} from 'react-native';
//style
import style from './camera.style';
//components
import {NativeBaseBackButton, Toast} from '../../components';
//libraries
import {runOnJS} from 'react-native-reanimated';
import {useNavigation, useIsFocused} from '@react-navigation/core';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  BarcodeFormat,
  scanBarcodes,
  useScanBarcodes,
} from 'vision-camera-code-scanner';
import moment from 'moment';
import {Spinner, useToast} from 'native-base';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {usePaymentInfoBarcodeMutation} from '../../services/parkings';
import {setParkingForm} from '../../redux/features/parkings/parkingsSlice';
import {t} from 'i18next';

const QrScanner = () => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState(false);
  const [closeCamera, setCloseCamera] = useState(false);
  const dispatch = useDispatch();
  const {parkingDetails} = useSelector(state => state.parkings.parkingsState);
  const toast = useToast();

  const navigate = useNavigation();
  const devices = useCameraDevices();
  let device = devices?.back;

  const [paymentInfoBarcode] = usePaymentInfoBarcodeMutation();

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {checkInverted: true},
  );

  // TODO: only one call

  const handleScan = async qr => {
    console.log('qr', qr, '   ', parkingDetails?.parkingId);
    await paymentInfoBarcode({
      barcode: qr,
      parkingId: parkingDetails?.parkingId,
    })
      .then(answer => {
        // console.log('answer QR : ', answer);
        const endTime = moment(new Date()).format('yyyy-MM-DDTHH:mm:ss');
        const body = {
          minutes: Math.floor(answer?.data?.duration / 60000),
          totalAmounts: answer?.data?.amount,
          startTime: new Date(answer?.data?.entryDate).toISOString(),
          endTime: new Date(endTime).toISOString(),
          parkingId: parkingDetails?.parkingId,
          currencyType: 'RON',
          productId: null,
          ticketId: answer?.data?.ticketID,
        };
        if (answer?.data?.amount > 0) {
          dispatch(setParkingForm(body));
          setCloseCamera(false);
          navigate.pop();
          navigate.navigate('PaymentDetails');
        } else {
          toast.show({
            placement: 'top',
            duration: 2000,
            render: () => {
              return <Toast message={t('Total de plata 0')} type={'succes'} />;
            },
          });
          handleBackBtn();
        }
      })
      .catch(err => {
        console.log('scan qr err: ', err);
        toast.show({
          placement: 'top',
          duration: 2000,
          render: () => {
            return <Toast message={t('invalid_ticket')} type={'danger'} />;
          },
        });
        setCloseCamera(false);
        handleBackBtn();
        // navigate.goBack();
      });
  };

  const handleBackBtn = () => {
    // dispatch(setIsParkingSelected(false));
    // dispatch(setReservedPolygon([]));

    navigate.pop();
    navigate.navigate('HomeDrawer');
  };

  useEffect(() => {
    if (isFocused) {
      (async () => {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'authorized');
      })();
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      handleBackBtn();
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        handleBackBtn();
      });
    };
  }, [isFocused]);

  useEffect(() => {
    if (barcodes[0]?.content?.data) {
      // navigate.navigate("PaymentDetails");
      setCloseCamera(true);
      handleScan(barcodes[0]?.content?.data);
    }
  }, [barcodes]);

  return (
    <View>
      {device != null && hasPermission && (
        <View>
          {/* // TODO: style this and maybe add an input */}
          {closeCamera ? (
            <View style={style.loadingContainer}>
              <Spinner size="lg" />
              <Text style={style.loadingText}>{t('Loading')} ...</Text>
            </View>
          ) : (
            <>
              <View style={style.backBtnContainer}>
                <NativeBaseBackButton
                  isLoading={false}
                  handleOnPress={() => handleBackBtn()}
                />
              </View>
              <Camera
                style={style.camera}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                frameProcessorFps={1}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

export default QrScanner;