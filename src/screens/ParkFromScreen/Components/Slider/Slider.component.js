import React, { useState } from "react";
import { Box } from "native-base";
import { picker } from "../../../../constants/objects";
import SliderStyle from "./Slider.style";
import SmoothPicker from "react-native-smooth-picker";

const Item = (({ selected, item }) => {
    const styles =
        item.type === "hours" ? SliderStyle.hourView : SliderStyle.minuteView;
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
});

const ItemToRender = ({ item, index }, indexSelected) => {
    const selected = index === indexSelected;

    return <Item item={item} selected={selected} />;
};

const Slider = () => {
    function handleChange(index) {
        setSelected(index);
    }

    const [selected, setSelected] = useState(1);

    return (
        <Box style={SliderStyle.container}>
            <Box style={SliderStyle.wrapperVertical}>
                <SmoothPicker
                    initialScrollToIndex={selected}
                    onScrollToIndexFailed={() => { }}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    data={picker}
                    scrollAnimation
                    onSelected={({ item, index }) => handleChange(index)}
                    renderItem={(option) => ItemToRender(option, selected, true)}
                    horizontal={true}
                />
            </Box>
        </Box>
    );
};

export default Slider;