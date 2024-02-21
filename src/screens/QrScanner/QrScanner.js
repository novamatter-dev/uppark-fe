import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View, BackHandler, } from 'react-native';
import { Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { Camera } from 'react-native-vision-camera';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import { NativeBaseBackButton, Toast } from '../../components';
import { usePaymentInfoBarcodeMutation } from '../../services/parkings';
import { setParkingForm } from '../../redux/features/parkings/parkingsSlice';
import moment from 'moment';
import { Alert, useToast } from 'native-base';
import { useTranslation } from 'react-i18next';
import { t } from "i18next";

const QrScanner = () => {
  const device = useCameraDevice('back');
  const { parkingDetails } = useSelector(state => state.parkings.parkingsState);
  const isFocused = useIsFocused();
  const isActive = isFocused;
  const [paymentInfoBarcode] = usePaymentInfoBarcodeMutation();
  const [torch, setTorch] = useState(false);
  const [isScanningAllowed, setIsScanningAllowed] = useState(true);
  const scanTimeoutRef = useRef(null);
  const toast = useToast();
  const isShowingAlert = useRef(false);
  const navigate = useNavigation();
  const [code, setCode] = useState("");
  const { i18n } = useTranslation();
  const [hasPermission, setHasPermission] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (code?.length > 0) {
      handleScan(code);
    }
  }, [code])

  const onCodeScanned = useCallback((codes) => {
    const value = codes[0]?.value;
    console.log(`Scanned value`, value);
    if (value == null || !isScanningAllowed) return;
    setCode(value)
  }, []);

  const handleScan = async (qr) => {
    setIsScanningAllowed(false)
    let payload = {
      barcode: qr,
      parkingId: parkingDetails?.parkingId,
    }
    console.log("API payload", payload)
    await paymentInfoBarcode({
      barcode: qr,
      parkingId: parkingDetails?.parkingId,
    })
      .then(answer => {
        console.log('answer QR : ', answer);
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
          navigate.pop();
          navigate.navigate('PaymentDetails');
        } else {
          toast.show({
            placement: 'top',
            duration: 1500,
            render: () => {
              return (
                <Toast message={t('Total de plata 0')} type={'succes'} />
              );
            },
          });
          handleBackBtn();
        }
      })
      .catch(err => {
        console.log("Error: ", err);
        toast.show({
          placement: 'top',
          duration: 1500,
          render: () => {
            return (
              <Toast message={t('invalid_ticket')} type={'danger'} />
            );
          },
        });
        setTimeout(() => {
          setIsScanningAllowed(true)
        }, 5000)
      });
  }

  const codeScanner = useCodeScanner({
    codeTypes: [
      'aztec',
      'codabar',
      'code-128',
      'code-39',
      'code-93',
      'data-matrix',
      'ean-13',
      'ean-8',
      'itf',
      'pdf-417',
      'qr',
      'upc-e',
    ],
    onCodeScanned: onCodeScanned,
  });

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

  return (
    <View style={styles.container}>
      {device != null && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
          torch={torch ? 'on' : 'off'}
          enableZoomGesture={true}
        />
      )}

      {/* <StatusBarBlurBackground /> */}

      {/* <View style={styles.rightButtonRow}>
        <TouchableOpacity style={styles.button} onPress={() => setTorch(!torch)} disabledOpacity={0.4}>
          <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} />
        </TouchableOpacity>
      </View> */}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackBtn}>
        <NativeBaseBackButton
          isLoading={false}
          handleOnPress={() => handleBackBtn()}
        />
      </TouchableOpacity>
    </View>
  );
}

export default QrScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: 30,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: 30,
    top: 30,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? "7%" : "5%",
    left: "8%",
    zIndex: 1,
  },
});
