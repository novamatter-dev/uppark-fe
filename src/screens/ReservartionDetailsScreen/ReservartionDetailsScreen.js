import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  // Share,
  Alert,
  Button,
  PermissionsAndroid,
} from "react-native";
//style && assets
import style from "./reservationStyle";
import svgs from "../../assets/svgs";
//libraries
import { SvgXml } from "react-native-svg";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import Share from "react-native-share";

//components
import {
  NativeBaseBackButton,
  Title,
  NativeBaseButton,
  Modal,
  ButtonComponent,
} from "../../components";
import { DownloadRecepitApple, DownloadReceiptAndroid } from "./Components";
//redux
import { useSelector } from "react-redux";
import { useGetInvoiceMutation } from "../../services/parkings";
import PaymentOptionsStyle from "../PaymentDetails/components/PaymentOptions/PaymentOptions.style";
import { Box, ScrollView } from "native-base";
import Pdf from "react-native-pdf";
import reservationStyle from "./reservationStyle";
import { t } from "i18next";

// const source = require("./application.pdf");

const ReservartionDetailsScreen = () => {
  const navigation = useNavigation();
  const { historyDetails } = useSelector(
    (state) => state.parkings.parkingsState
  );
  const { parkingHistory } = useSelector((state) => state.users);
  const [getInvoice] = useGetInvoiceMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState("");

  const source = { uri: `data:application/pdf;base64,${response}` };

  const startTime = moment(parkingHistory.startTime).format("HH:mm");
  const startDate = moment(parkingHistory.startTime).format("dd, MMM DD");

  const endTime = moment(parkingHistory.endTime).format("HH:mm");
  const endDate = moment(parkingHistory.endTime).format("dd, MMM DD");

  const permissionFunc = async (data) => {
    if (Platform.OS == "ios") {
      actualDownload(data);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload(data);
        } else {
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  console.log("historyDetails", historyDetails);

  const actualDownload = async (data) => {};

  const handleSubmit = async () => {
    setModalVisible(true);
    const { parkingReservationProductId } = parkingHistory;
    await getInvoice({ parkingReservationProductId })
      .then((answer) => {
        permissionFunc(answer?.data?.invoice);
        setResponse(answer?.data?.invoice);
      })
      .catch((err) => {
        console.log("GET INVOICE ERROR >>>", err);
      });
  };

  const onShare = async () => {
    try {
      Share.open({
        title: "title",
        message: "message",
        url: `data:application/pdf;base64,${response}`,
        saveToFiles: true,
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={style.container}>
      <NativeBaseBackButton
        style={style.backButton}
        handleOnPress={() => navigation.goBack()}
      />
      <Title label={t("parking_details")} style={style.title} />

      <View style={style.amountContainer}>
        <Text style={style.greyText}>{t("amount_paid")}</Text>
        {historyDetails.products && (
          <Text style={style.amountText}>
            {/* {historyDetails?.totalAmount} */}
            {parkingHistory?.totalPrice}{" "}
            {/* {historyDetails.products[0].currency} */}
            {parkingHistory?.currency}
          </Text>
        )}
      </View>

      <View style={style.timeContainer}>
        <View style={style.startTimeContainer}>
          <View style={style.item}>
            <Text style={style.greyText}>{t("start_time")}</Text>
            <Text style={style.bigBoldText}>{startTime}</Text>
            <Text style={style.smallBoldText}>{startDate}</Text>
          </View>
          <View style={style.iconAlignment}>
            <SvgXml xml={svgs.arrowRightDisabled} />
          </View>
        </View>

        <View style={style.item}>
          <Text style={style.greyText}>{t("end_time")}</Text>
          {/* TODO: change this after backend updated */}
          <Text style={style.bigBoldText}>{endTime}</Text>
          <Text style={style.smallBoldText}>{endDate}</Text>
        </View>
      </View>

      <View style={style.infoBox}>
        <View style={style.infoItem}>
          <Text style={style.greyText}>
            {parkingHistory?.ticketIdentifier ? "Ticket" : t("vehicle")}
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                ...style.mediumBoldText,
                ...style.licensePlateText,
              }}
            >
              {parkingHistory?.ticketIdentifier
                ? parkingHistory?.ticketIdentifier
                : historyDetails?.plateNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.infoItem}>
          <Text style={style.greyText}>{t("address")}</Text>
          <Text style={style.mediumBoldText}>
            {historyDetails?.parkingShortTitle}
          </Text>
        </View>
      </View>

      {/* TODO: change this after backend updated */}
      <View style={style.infoBox}>
        <View style={style.infoItem}>
          <Text style={style.greyText}>{t("payments_method")}</Text>
          <TouchableOpacity>
            <Text
              style={{
                ...style.mediumBoldText,
                ...style.licensePlateText,
              }}
            >
              {parkingHistory?.currency === "RON"
                ? historyDetails?.cardNumber
                : "SMS"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={style.infoItem}>
          <Text style={style.greyText}>{t("profile")}</Text>
          <Text style={style.mediumBoldText}>
            {historyDetails?.paymentProfileType === "PersonalProfile"
              ? "Personal"
              : historyDetails?.paymentProfileType === "BusinessProfile"
              ? "Business"
              : ""}
          </Text>
        </View>
      </View>

      <View style={style.floatingContainer}>
        <ButtonComponent
          text={t("download_receipt")}
          isDisabled={false}
          onPress={handleSubmit}
        />
      </View>

      <Modal isFullScreen={true} modalVisible={modalVisible}>
        <Box style={PaymentOptionsStyle.container}>
          <NativeBaseBackButton
            handleOnPress={() => setModalVisible(false)}
            style={PaymentOptionsStyle.exitButton}
            iconType={"exit"}
          />
          <Title label={t("receipt_title")} style={PaymentOptionsStyle.title} />
          <View style={style.amountContainer}>
            {Platform.OS === "ios" ? (
              <DownloadRecepitApple onShare={onShare} />
            ) : (
              <DownloadReceiptAndroid
                response={response}
                parkingHistory={parkingHistory}
              />
            )}
          </View>
          <View style={reservationStyle.pdfContainer}>
            <Pdf
              source={source}
              onLoadComplete={(numberOfPages, filePath) => {}}
              onPageChanged={(page, numberOfPages) => {}}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={reservationStyle.pdf}
            />
          </View>
        </Box>
      </Modal>
    </View>
  );
};

export default ReservartionDetailsScreen;
