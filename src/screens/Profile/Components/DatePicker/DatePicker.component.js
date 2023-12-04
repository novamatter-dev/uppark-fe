import { Box, Image } from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import DatePickerStyle from "./DatePicker.style";
import PropTypes from "prop-types";
import { NativeBaseButton } from "../../../../components";
import cross from "../../../../assets/icons/cross.png";

const DatePickerComponent = (props) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const { onConfirmPress, isDisabled, isLoading, onCancel } = props;

  return (
    <Box style={DatePickerStyle.container}>
      <TouchableOpacity
        style={DatePickerStyle.closeButton}
        onPress={() => onConfirmPress()}
      >
        <Image
          style={DatePickerStyle.closeButtonImage}
          source={cross}
          alt={"something"}
        />
      </TouchableOpacity>
      <DatePicker
        style={DatePickerStyle.datePicker}
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <NativeBaseButton
        label={"CONFIRM"}
        handleOnPress={onConfirmPress}
        isDisabled={isDisabled}
        isLoading={isLoading}
      />
    </Box>
  );
};

DatePickerComponent.propTypes = {
  onCancel: PropTypes.func,
  onConfirmPress: PropTypes.func,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default DatePickerComponent;
