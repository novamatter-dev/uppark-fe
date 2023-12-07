import React, {useRef, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import SmsConfirmCodeInputsStyle from './SmsConfirmCodeInputs.style';
import {SvgXml} from 'react-native-svg';
import svgs from '../../../../assets/svgs';
import PropTypes from 'prop-types';
import {t} from 'i18next';
import {BLUE, GREY} from '../../../../helpers/style/constants';

const OTPScreen = props => {
  const {handleResend = () => {}, setOTP = () => {}, otp = []} = props;
  // const [otp, setOTP] = useState(["", "", "", ""]);
  const [otpIndex, setOtpIndex] = useState(0);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);
    setOtpIndex(index);
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputDelete = index => {
    const newOTP = [...otp];
    newOTP[index] = '';
    setOTP(newOTP);
    if (otpIndex > -1) {
      setOtpIndex(otpIndex - 1);
    }
    if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const hadnleReset = () => {
    setIsLoading(true);
    handleResend();

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

  return (
    <View style={styles.container}>
      <View style={SmsConfirmCodeInputsStyle.wrap}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={SmsConfirmCodeInputsStyle.text}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={text => handleInputChange(text, index)}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                handleInputDelete(index);
              }
            }}
            value={digit}
            ref={ref => (inputRefs.current[index] = ref)}
            showSoftInputOnFocus={false}
            selectTextOnFocus={false}
            caretHidden={true}
          />
        ))}
      </View>
      <View style={SmsConfirmCodeInputsStyle.resendCodeBox}>
        <TouchableOpacity
          onPress={hadnleReset}
          style={SmsConfirmCodeInputsStyle.resendBtn}
          disabled={isLoading}>
          <View style={SmsConfirmCodeInputsStyle.dummyView} />
          <Text
            style={{
              ...SmsConfirmCodeInputsStyle.resendCodeBoxText,
              color: isLoading ? GREY : BLUE,
            }}>
            {t('resend_code')}
          </Text>
          {isLoading && (
            <View style={SmsConfirmCodeInputsStyle.loadingWrapper}>
              <ActivityIndicator size="small" color={BLUE} />
            </View>
          )}
          {!isLoading && <View style={SmsConfirmCodeInputsStyle.dummyView} />}
        </TouchableOpacity>
      </View>
      <View style={SmsConfirmCodeInputsStyle.keyPadContainer}>
        <View style={styles.row}>
          {/* TODO: Verify hardcoded array logic */}
          {[1, 2, 3].map(key => (
            <TouchableOpacity
              key={key}
              style={SmsConfirmCodeInputsStyle.keyPadItem}
              onPress={() => {
                const nextIndex = otp.findIndex(digit => digit === '');
                if (nextIndex !== -1) {
                  handleInputChange(key.toString(), nextIndex);
                }
              }}>
              <Text style={SmsConfirmCodeInputsStyle.keyPadLabel}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[4, 5, 6].map(key => (
            <TouchableOpacity
              key={key}
              style={SmsConfirmCodeInputsStyle.keyPadItem}
              onPress={() => {
                const nextIndex = otp.findIndex(digit => digit === '');
                if (nextIndex !== -1) {
                  handleInputChange(key.toString(), nextIndex);
                }
              }}>
              <Text style={SmsConfirmCodeInputsStyle.keyPadLabel}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {[7, 8, 9].map(key => (
            <TouchableOpacity
              key={key}
              style={SmsConfirmCodeInputsStyle.keyPadItem}
              onPress={() => {
                const nextIndex = otp.findIndex(digit => digit === '');
                if (nextIndex !== -1) {
                  handleInputChange(key.toString(), nextIndex);
                }
              }}>
              <Text style={SmsConfirmCodeInputsStyle.keyPadLabel}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.row}>
          {['?', 0, '<-'].map(key => (
            <TouchableOpacity
              key={key}
              style={SmsConfirmCodeInputsStyle.keyPadItem}
              onPress={() => {
                const nextIndex = otp.findIndex(digit => digit === '');
                if (nextIndex !== -1 && key !== '<-' && key !== '?') {
                  handleInputChange(key.toString(), nextIndex);
                } else if (key === '<-') {
                  handleInputDelete(otpIndex);
                }
              }}>
              {key === '?' ? (
                <SvgXml xml={svgs.ask} width={26} height={26} />
              ) : key === '<-' ? (
                <SvgXml xml={svgs.backSpace} width={26} height={19} />
              ) : (
                <Text style={SmsConfirmCodeInputsStyle.keyPadLabel}>{key}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

OTPScreen.propTypes = {
  handleResend: PropTypes.func,
  setOTP: PropTypes.func,
  otp: PropTypes.array,
};

export default OTPScreen;
