import React, { useState, useEffect } from "react";
import { Box } from "native-base";

import SliderStyle from "./Slider.styles";
import SmoothPicker from "react-native-smooth-picker";
import PropTypes from "prop-types";

const Item = ({ selected, item }) => {
  const styles =
    item.durationMinutes >= 60 ? SliderStyle.hourView : SliderStyle.minuteView;
  return (
    <Box
      style={[
        SliderStyle.OptionWrapper,
        {
          borderColor: "transparent",
          backgroundColor: "transparent",
        },
      ]}
    >
      <Box style={selected ? SliderStyle.selectedOption : styles}></Box>
    </Box>
  );
};

const ItemToRender = ({ item, index }, indexSelected) => {
  const selected = index === indexSelected;

  return <Item item={item} selected={selected} />;
};

const Slider = (props) => {
  const { data, handleSelectProduct, idx = 0 } = props;
  const [selected, setSelected] = useState({
    index: 0,
    value: null,
  });

  function handleChange(item, index) {
    setSelected((state) => ({
      ...state,
      index: index,
      value: item,
    }));
  }

  useEffect(() => {
    handleSelectProduct(selected.value);
  }, [selected]);

  return (
    <Box style={SliderStyle.container}>
      <Box style={SliderStyle.wrapperVertical}>
        <SmoothPicker
          initialScrollToIndex={idx}
          onScrollToIndexFailed={() => {}}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          data={data}
          onSelected={({ item, index }) => handleChange(item, index)}
          renderItem={(option) => ItemToRender(option, idx, true)}
          horizontal={true}
          snapToAlignment={"center"}
          // startMargin={140}
          magnet
          scrollAnimation={true}
          activeOpacityButton={0.5}
          style={{ width: 300 }}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </Box>
    </Box>
  );
};

Slider.propTypes = {
  idx: PropTypes.number,
};

export default Slider;
