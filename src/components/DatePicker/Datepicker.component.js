import React, { useEffect, useRef, useState } from "react";

import { Box, Text } from "native-base";
import { TextInput, View } from "react-native";
import DatePickerStyle from "./DatePicker.style";
import { GREY } from "../../helpers/style/constants";
import moment from "moment";

// formatare UTC la submit / save
// salvare in componenta individuala

const DatePicker = (props) => {
  const { onChangeDate } = props;
  const [codeDigitValues, setCodeDigitValues] = useState({
    ref1: "",
    ref2: "",
    ref3: "",
  });
  const [invalidDate, setIvalidDate] = useState(false);

  const textRefs = {
    ref1: useRef(),
    ref2: useRef(),
    ref3: useRef(),
  };

  const handleOnChange = ({
    input,
    value,
    maxlength,
    forwardFocusInput,
    prevFocusInput,
    maxNumber,
    minNumber,
  }) => {
    if ((value.length > 1 && value > maxNumber) || value < minNumber) {
      setIvalidDate(true);
    } else {
      setIvalidDate(false);
      setCodeDigitValues((prevValues) => {
        return {
          ...prevValues,
          [input]: value > maxNumber || value < minNumber ? maxNumber : value,
        };
      });

      if (value.length === 0) {
        prevFocusInput?.current.focus();
      } else if (
        value.length >= maxlength &&
        (input === "ref2" || input === "ref1")
      ) {
        forwardFocusInput?.current.focus();
      }
    }
  };

  useEffect(() => {
    if (
      codeDigitValues.ref1 &&
      codeDigitValues.ref2 &&
      codeDigitValues.ref3?.length === 4
    )
      onChangeDate(
        `${codeDigitValues.ref1}/${codeDigitValues.ref2}/${codeDigitValues.ref3}`
      );
  }, [codeDigitValues]);

  const minYear = new Date().getFullYear();

  return (
    <View>
      {invalidDate && (
        <Text style={DatePickerStyle.validationText}>Invalid date</Text>
      )}

      <Box style={DatePickerStyle.wrap}>
        <TextInput
          placeholder={"DD"}
          placeholderTextColor={GREY}
          maxLength={2}
          selectTextOnFocus={true}
          ref={textRefs.ref1}
          style={DatePickerStyle.text}
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChange({
              input: "ref1",
              value,
              ref: textRefs.ref1,
              forwardFocusInput: textRefs.ref2,
              prevFocusInput: null,
              maxlength: 2,
              maxNumber: 31,
              minNumber: 1,
            });
          }}
          key={`1-mimi`}
        />

        <Text style={DatePickerStyle.separator}>/</Text>

        <TextInput
          placeholder={"MM"}
          maxLength={2}
          placeholderTextColor={GREY}
          selectTextOnFocus={true}
          ref={textRefs.ref2}
          style={DatePickerStyle.text}
          keyboardType="numeric"
          onChangeText={(value) => {
            if (moment(new Date()).format("MM") > value) {
              setIvalidDate(true);
            } else {
              handleOnChange({
                input: "ref2",
                value: value,
                ref: textRefs.ref2,
                forwardFocusInput: textRefs.ref3,
                prevFocusInput: textRefs.ref1,
                maxlength: 2,
                maxNumber: 12,
                minNumber: 1,
              });
            }
          }}
          key={`2-mimi`}
          // value={codeDigitValues.ref2}
        />

        <Text style={DatePickerStyle.separator}>/</Text>

        <TextInput
          placeholder={"YYYY"}
          maxLength={4}
          placeholderTextColor={GREY}
          selectTextOnFocus={true}
          ref={textRefs.ref3}
          style={DatePickerStyle.text}
          keyboardType="numeric"
          onChangeText={(value) => {
            handleOnChange({
              input: "ref3",
              value,
              ref: textRefs.ref3,
              forwardFocusInput: null,
              prevFocusInput: textRefs.ref2,
              maxlength: 4,
              minNumber: minYear,
            });
          }}
          key={`3-mimi`}
        />
      </Box>
    </View>
  );
};

export default DatePicker;
