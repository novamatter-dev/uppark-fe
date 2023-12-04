import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import useInterval from "../../hooks/useInterval.hook";
import { useDispatch } from "react-redux";
import { setShowCounter } from "../../redux/features/parkings/parkingsSlice";
import PropTypes from "prop-types";
import { useFocusEffect } from "@react-navigation/native";

const CountdownTimer = (props) => {
  const {
    endTime = "",
    setDisplayCounter = () => {},
    handleGetCurrentReservation = () => {},
    fontSize = 16,
    handleRemoveEntry = () => {},
    textColor = "",
  } = props;
  const dispatch = useDispatch();

  const [inFocus, setInFocus] = useState(false);
  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  var countDownEnd = Date.parse(endTime);

  var now = new Date();

  useFocusEffect(() => {
    setInFocus(true);
    return () => {
      setInFocus(false);
    };
  });

  useInterval(
    () => {
      handleRemoveEntry();
      var distance = countDownEnd - now;
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimer({
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });

      if (distance < 30) {
        dispatch(setShowCounter(false));
        setDisplayCounter(false);
      }
      if (hours < 1 && minutes < 1 && seconds < 1) {
        dispatch(setShowCounter(false));
        setDisplayCounter(false);
        handleGetCurrentReservation();
        handleRemoveEntry();
      }
    },
    countDownEnd - now > 0 ? 1000 : null
  );

  useEffect(() => {
    if (countDownEnd - now < 30) {
      setDisplayCounter(false);
    }
  }, [countDownEnd]);

  return (
    <View>
      <Text
        style={{
          fontSize: fontSize,
          color: "black",
          fontFamily: "AzoSans-Bold",
          marginHorizontal: 10,
          color: textColor,
        }}
      >
        {/* {timer.hours}:{timer.minutes}:{timer.seconds} */}
        {timer.hours}:{timer.minutes}
      </Text>
    </View>
  );
};

CountdownTimer.propTypes = {
  handleRemoveEntry: PropTypes.func,
  endTime: PropTypes.string,
  textColor: PropTypes.string,
  setDisplayCounter: PropTypes.func,
  handleGetCurrentReservation: PropTypes.func,
  fontSize: PropTypes.number,
};

export default CountdownTimer;
