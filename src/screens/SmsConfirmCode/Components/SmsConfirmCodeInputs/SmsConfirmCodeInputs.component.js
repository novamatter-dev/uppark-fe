import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity, Text as Txt, View } from "react-native";
import { Box, Text } from "native-base";
import SmsConfirmCodeInputsStyle from "./SmsConfirmCodeInputs.style";
import { t } from "i18next";
import { SvgXml } from "react-native-svg";
import svgs from "../../../../assets/svgs";

const SmsConfirmCodeInputs = (props) => {
  const {
    totalDigits,
    setCodeDigitValues,
    isResend,
    handleOnSubmit,
    handleResend,
    codeDigitValues,
  } = props;

  const textRefs = {
    ref1: useRef(null),
    ref2: useRef(null),
    ref3: useRef(null),
    ref4: useRef(null),
  };

  const [focuesInput, setFocusedInput] = useState(1);

  // const txtRef1 = useRef(2);
  // const txtRef2 = useRef("");
  // const txtRef3 = useRef(null);
  // const txtRef4 = useRef(null);

  const btns = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: "?" },
    { value: 0 },
    { value: "back" },
  ];

  const handleSetInputValue = ({ input, focusInput = null, value }) => {
    setCodeDigitValues((prevValues) => {
      return {
        ...prevValues,
        [input]: value,
      };
    });
    focusInput?.current.focus();
  };

  const isBackspace = (nativeEvent) => {
    return nativeEvent.key === "Backspace";
  };

  return (
    <Box style={SmsConfirmCodeInputsStyle.container}>
      <Box style={SmsConfirmCodeInputsStyle.wrap}>
        {/* <View style={SmsConfirmCodeInputsStyle.text} ref={txtRef1}>
          <Txt style={SmsConfirmCodeInputsStyle.keyPadLabel}>
            {codeDigitValues.ref1.value}
          </Txt>
        </View>
        <View style={SmsConfirmCodeInputsStyle.text}>
          <Txt>{codeDigitValues.ref2.value}</Txt>
        </View>
        <View style={SmsConfirmCodeInputsStyle.text}>
          <Txt>{codeDigitValues.ref3.value}</Txt>
        </View>
        <View style={SmsConfirmCodeInputsStyle.text}>
          <Txt>{codeDigitValues.ref4.value}</Txt>
        </View> */}
        <TextInput
          maxLength={1}
          selectTextOnFocus={true}
          ref={textRefs.ref1}
          style={SmsConfirmCodeInputsStyle.text}
          keyboardType="numeric"
          onKeyPress={({ nativeEvent }) => {
            handleSetInputValue({
              input: "ref1",
              focusInput: isBackspace(nativeEvent) ? null : textRefs.ref2,
              value: isBackspace(nativeEvent) ? "" : nativeEvent.key,
            });
          }}
          key={`1-mimi`}
          showSoftInputOnFocus={false}
          onFocus={() => setFocusedInput("ref1")}
          value={codeDigitValues.ref1}
        />
        <TextInput
          maxLength={1}
          selectTextOnFocus={true}
          ref={textRefs.ref2}
          style={SmsConfirmCodeInputsStyle.text}
          keyboardType="numeric"
          onKeyPress={({ nativeEvent }) => {
            handleSetInputValue({
              input: "ref2",
              focusInput: isBackspace(nativeEvent)
                ? textRefs.ref1
                : textRefs.ref3,
              value: isBackspace(nativeEvent) ? "" : nativeEvent.key,
            });
          }}
          key={`2-mimi`}
          showSoftInputOnFocus={false}
          onFocus={() => setFocusedInput("ref2")}
          value={codeDigitValues.ref2}
        />
        <TextInput
          maxLength={1}
          selectTextOnFocus={true}
          ref={textRefs.ref3}
          style={SmsConfirmCodeInputsStyle.text}
          keyboardType="numeric"
          onKeyPress={({ nativeEvent }) => {
            handleSetInputValue({
              input: "ref3",
              focusInput: isBackspace(nativeEvent)
                ? textRefs.ref2
                : textRefs.ref4,
              value: isBackspace(nativeEvent) ? "" : nativeEvent.key,
            });
          }}
          key={`3-mimi`}
          showSoftInputOnFocus={false}
          onFocus={() => setFocusedInput("ref3")}
        />
        <TextInput
          maxLength={1}
          selectTextOnFocus={true}
          ref={textRefs.ref4}
          style={SmsConfirmCodeInputsStyle.text}
          keyboardType="numeric"
          onKeyPress={({ nativeEvent }) => {
            handleSetInputValue({
              input: "ref4",
              focusInput: isBackspace(nativeEvent) ? textRefs.ref3 : null,
              value: isBackspace(nativeEvent) ? "" : nativeEvent.key,
            });
          }}
          key={`4-mimi`}
          showSoftInputOnFocus={false}
          onFocus={() => setFocusedInput("ref4")}
        />
      </Box>
      <Box style={SmsConfirmCodeInputsStyle.resendCodeBox}>
        <TouchableOpacity onPress={handleResend}>
          <Text style={SmsConfirmCodeInputsStyle.resendCodeBoxText}>
            {t("resend_code")}
          </Text>
        </TouchableOpacity>
      </Box>
      {isResend && (
        <Box>
          <Text>Code is expired, you must resend.</Text>
        </Box>
      )}

      <Box style={SmsConfirmCodeInputsStyle.keyPadContainer}>
        {btns?.map((item) => {
          return (
            <TouchableOpacity
              style={SmsConfirmCodeInputsStyle.keyPadItem}
              key={item.value}
              // onPress={() => handlePress(item.value)}
              // onPress={() => handlePress(item.value)}
              ref={textRefs.ref1}
              onPress={({ nativeEvent }) => {
                handleSetInputValue({
                  input: "ref1",
                  focusInput:
                    item.value === "back" ? textRefs.ref2 : textRefs.ref4,
                  value: item.value === "back" ? "" : item.value,
                });
              }}
            >
              {item.value === "?" ? (
                <SvgXml xml={svgs.ask} width={26} height={26} />
              ) : item.value === "back" ? (
                <SvgXml xml={svgs.backSpace} width={26} height={19} />
              ) : (
                <Txt style={SmsConfirmCodeInputsStyle.keyPadLabel}>
                  {item.value}
                </Txt>
              )}
            </TouchableOpacity>
          );
        })}
      </Box>
    </Box>
  );
};

export default SmsConfirmCodeInputs;
