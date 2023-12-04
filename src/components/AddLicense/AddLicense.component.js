import React, { useState } from "react";
import { Box, View, useToast } from "native-base";
import { TouchableOpacity, Text, KeyboardAvoidingView } from "react-native";
import {
  ButtonComponent,
  // DatePicker,
  NativeBaseBackButton,
  Title,
} from "../index";
import DatePicker from "react-native-date-picker";
import AddLicenseStyle from "./AddLicense.style";
import PropTypes from "prop-types";
import AddBusinessStyle from "../AddBusiness/AddBusiness.style";
import { AQUA, BLACK, GREY, RED, WHITE } from "../../helpers/style/constants";
import moment from "moment";
import svgs from "../../assets/svgs";
import { SvgXml } from "react-native-svg";
//redux
import { useUpdateDrivingLincenseMutation } from "../../services/users";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

const AddLicense = (props) => {
  const {
    // handleChangeLicenseDate,
    onClosePress,
    onConfirmPress,
    isDisabled,
    isLoading,
    handleGetUserDetails,
  } = props;

  const dispatch = useDispatch();

  const { expirationDateDrivingLicense } = useSelector((state) => state.users);

  const [updateDrivingLicense] = useUpdateDrivingLincenseMutation();

  const [date, setDate] = useState("");
  const [isInvalidDate, setIsinvalidDate] = useState(false);
  const [open, setOpen] = useState(false);

  const toast = useToast();

  const [openModal, setOpenModal] = useState(false);
  const onHandlePress = () => {
    setOpenModal(!openModal);
  };

  const handleChangeLicenseDate = async (value) => {
    const formated = moment(value).format("DD/MM/YYYY");
    const val = formated.split("/");
    // const arr = val.reverse();
    const inputDate = val.join(".");

    // const newDate = new Date(date);

    setDate(inputDate);
  };

  // console.log("date >>> ", date);

  const handleConfirm = async () => {
    const inputDate = moment(date, "DD.MM.YYYY");
    const formatedDate = moment(inputDate).format();

    const currentDate = moment(new Date()).format();
    if (formatedDate > currentDate && date !== "") {
      const body = {
        drivingLicenseDate: date,
      };
      await updateDrivingLicense(body)
        .then(() => {
          handleGetUserDetails();
          handleSuccessToast();
          onConfirmPress();
        })
        .catch((err) => {
          console.log("update license plate err: ", err);
        });
    } else {
      setIsinvalidDate(true);
    }
  };

  const handleUpdateDate = () => {};
  const handleSuccessToast = () => {
    toast.show({
      placement: "top",
      duration: 1500,
      render: () => {
        return (
          <View
            style={{
              backgroundColor: AQUA,
              padding: 16,
              borderRadius: 15,
              shadowColor: AQUA,
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.9,
              shadowRadius: 4,
              elevation: 25,
              shadowColor: AQUA,
            }}
          >
            <Text
              style={{
                color: "#F5F5F5",
                fontSize: 18,
                fontFamily: "AzoSans-Medium",
              }}
            >
              {t("driving_lincense_taost")}!
            </Text>
          </View>
        );
      },
    });
  };

  console.log(
    "expirationDateDrivingLicense >> ",
    expirationDateDrivingLicense?.split(".").join("/")
  );

  return (
    <Box style={AddLicenseStyle.container}>
      <View>
        <TouchableOpacity
          style={AddLicenseStyle.closeButton}
          onPress={onClosePress}
        >
          <NativeBaseBackButton
            style={AddBusinessStyle.closeButton}
            handleOnPress={onClosePress}
            iconType={"exit"}
          />
        </TouchableOpacity>
        <Box style={AddLicenseStyle.inputContainer}>
          <Box style={AddLicenseStyle.title}>
            <Title
              label={t("add_license_exp_title")}
              style={AddLicenseStyle.title}
            />
          </Box>

          {isInvalidDate && (
            <Text
              style={{
                color: RED,
                fontFamily: "AzoSans-Medium",
                fontSize: 14,
              }}
            >
              Please enter a valid date
            </Text>
          )}
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: WHITE,
              borderRadius: 25,
              paddingVertical: 16,
              paddingHorizontal: 20,
              width: "100%",
              marginTop: 16,
            }}
            onPress={() => setOpen(true)}
          >
            <SvgXml
              xml={svgs.drivingLicense}
              width={22}
              height={24}
              fill={AQUA}
              style={{ marginRight: 20, width: "10%" }}
            />
            {date === "" ? (
              <Text
                style={{
                  color: GREY,
                  fontSize: 16,
                  fontFamily: "AzoSans-Bold",
                  width: "90%",
                }}
              >
                {expirationDateDrivingLicense
                  ? expirationDateDrivingLicense?.split(".").join("/")
                  : "DD/MM/YYYY"}
              </Text>
            ) : (
              <Text
                style={{
                  color: BLACK,
                  fontSize: 16,
                  fontFamily: "AzoSans-Bold",
                  width: "90%",
                }}
              >
                {date}
              </Text>
            )}
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={new Date()}
            onConfirm={(date) => {
              handleChangeLicenseDate(date);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
            minimumDate={new Date()}
          />
        </Box>
      </View>

      <View
        style={{
          display: "flex",
          width: "100%",
          position: "absolute",
          bottom: "5%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonComponent
          text={t("confirm").toUpperCase()}
          isDisabled={isDisabled}
          onPress={() => {
            handleConfirm();
          }}
        />
      </View>
    </Box>
  );
};

AddLicense.propTypes = {
  onClosePress: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default AddLicense;
