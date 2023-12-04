import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { Box, ScrollView } from "native-base";
import { ButtonComponent, NativeBaseBackButton } from "../../../../components";
import CarDetailsStyle from "./CarDetails.style";
import PropTypes from "prop-types";
import moment from "moment";
import { RED } from "../../../../helpers/style/constants";
import DatePicker from "react-native-date-picker";
import { SvgXml } from "react-native-svg";
import svgs from "../../../../assets/svgs";
//redux
import { useUpdateCarMutation } from "../../../../services/cars";

const CarDetails = (props) => {
  const { onDeletePress, onClosePress, item, onConfirm = () => {} } = props;
  const {
    carId,
    licensePlateNumber,
    rcaExpirationDate,
    itpExpirationDate,
    rovinietaExpirationDate,
    cascoExpirationDate,
    medicalKitExpirationDate,
    fireExtinguisherExpirationDate,
  } = item;

  const carProps = [
    { id: 0, name: "RCA", shortName: "RCAExpirationDate" },
    { id: 1, name: "ITP", shortName: "ITPExpirationDate" },
    { id: 2, name: "Rovinieta", shortName: "RovinietaExpirationDate" },
    { id: 3, name: "Casco", shortName: "CascoExpirationDate" },
    { id: 4, name: "Medical kit", shortName: "MedicalKitExpirationDate" },
    {
      id: 5,
      name: "Fire extinguisher",
      shortName: "FireExtinguisherExpirationDate",
    },
  ];

  const [updateCar] = useUpdateCarMutation();

  const [data, setData] = useState({
    CarId: carId,
    LicensePlateNumber: licensePlateNumber,
    RCAExpirationDate: rcaExpirationDate,
    ITPExpirationDate: itpExpirationDate,
    RovinietaExpirationDate: rovinietaExpirationDate,
    CascoExpirationDate: cascoExpirationDate,
    MedicalKitExpirationDate: medicalKitExpirationDate,
    FireExtinguisherExpirationDate: fireExtinguisherExpirationDate,
  });
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (e, name) => {
    setData((data) => ({
      ...data,
      [name]: e,
    }));
  };

  const handleBtn = (name) => {
    setOpen(!open);
    setName(name);
  };

  const handleUpdate = async () => {
    const body = {
      CarId: data.CarId,
      LicensePlateNumber: data.LicensePlateNumber,
      RCAExpirationDate: data.RCAExpirationDate,
      ITPExpirationDate: data.ITPExpirationDate,
      RovinietaExpirationDate: data.RovinietaExpirationDate,
      CascoExpirationDate: data.CascoExpirationDate,
      MedicalKitExpirationDate: data.MedicalKitExpirationDate,
      FireExtinguisherExpirationDate: data.FireExtinguisherExpirationDate,
    };
    await updateCar(body).then(() => {
      onConfirm();
    });
  };

  return (
    <SafeAreaView style={CarDetailsStyle.container}>
      <ScrollView>
        <Box style={CarDetailsStyle.boxContainer}>
          <NativeBaseBackButton
            style={CarDetailsStyle.closeButton}
            handleOnPress={onClosePress}
            iconType={"exit"}
          />
          <View style={CarDetailsStyle.carContainer}>
            <View style={CarDetailsStyle.carInfo}>
              <SvgXml xml={svgs.car} width={24} height={24} />
              <Text style={CarDetailsStyle.carText}>{licensePlateNumber}</Text>
            </View>
            <TouchableOpacity
              style={{}}
              onPress={() => onDeletePress({ carId, licensePlateNumber })}
            >
              <SvgXml xml={svgs.deleteIcon} width={24} height={24} fill={RED} />
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%" }}>
            {carProps?.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={CarDetailsStyle.itemWrapper}
                  onPress={() => handleBtn(item.shortName)}
                >
                  <SvgXml xml={svgs.drivingLicense} width={24} height={24} />
                  <Text
                    style={CarDetailsStyle.itemName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                    {":"}
                  </Text>
                  <Text style={CarDetailsStyle.itemShortName}>
                    {data[item.shortName] === null
                      ? "-"
                      : moment(data[item.shortName]).format("DD-MM-yyyy")}
                  </Text>
                  <SvgXml xml={svgs.edit} width={24} height={24} />
                </TouchableOpacity>
              );
            })}
          </View>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={new Date()}
            onConfirm={(date) => {
              handleChange(date, name);
              setOpen(false);
            }}
            onCancel={() => setOpen(false)}
            minimumDate={new Date()}
          />

          <View
            style={{
              display: "flex",
              width: "100%",
              marginVertical: 8,
            }}
          >
            <ButtonComponent text={"CONFIRM"} onPress={handleUpdate} />
          </View>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

CarDetails.propTypes = {
  onClosePress: PropTypes.func,
  carPlate: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default CarDetails;
