import React, { useState, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from "react-native";
//style & assets
import style from "./style";
import { BLUE } from "../../helpers/style/constants";
//components
import {
  ScreenLayout,
  Header,
  CustomSearchBox,
  ButtonComponent,
  NativeBaseBackButton
} from "../../components";
//libs
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
//redux
import { useSelector, useDispatch } from "react-redux";
import {
  useSearchByKeywordMutation,
  useGetParkingProductsMutation,
  useGetParkingDetailsMutation,
} from "../../services/parkings";
import {
  setWorksWithHub,
  setParkingDetails,
  setIsParkingSelected,
} from "../../redux/features/parkings/parkingsSlice";

const ParkingsList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchByKeyword] = useSearchByKeywordMutation();
  const [getParkingProducts] = useGetParkingProductsMutation();
  const [getParkingDetails] = useGetParkingDetailsMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [parkings, setParkings] = useState([]);
  const [selectedParking, setSelectedParking] = useState(null);

  const timeoutRef = React.useRef(null);

  const handleNav = () => {
    navigation.navigate("SelectCar");
  };

  const handleSearchByTerm = async (term) => {
    const body = {
      keyword: term,
    };
    await searchByKeyword(body)
      .then((answer) => {
        setLoading(false);
        setParkings(answer.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSearch = useCallback((searchText) => {
    if (searchText.length > 2) {
      setLoading(true);
      // Simulăm un apel API de căutare cu o întârziere de 1 secundă
      setTimeout(() => {
        console.log("Searching for:", searchText);
        handleSearchByTerm(searchText);
      }, 1000);
    }
  }, []);

  const debounce = (callback, delay) => {
    return function (...args) {
      console.log("timeoutId", ...args);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    };
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [
    handleSearch,
  ]);

  const handleInputChange = (text) => {
    setSearchTerm(text);
    debouncedSearch(text);

    if (text.length < 1) {
      setParkings([]);
    }
  };

  const handleParkingDetails = async (id) => {
    const { data, error: apiError } = await getParkingDetails({ id: id });

    if (!apiError) {
      const body = {
        parkingId: id,
        amenities: data?.amenities,
        isOpened: data?.isOpened,
        noLots: data?.noLots,
        parkingLongitude: data.entranceLongitude,
        parkingLatitude: data.entranceLatitude,
        pricePerHour: data?.pricePerHour,
        currencyType: data?.currencyType,
        parkingShortTitle: data?.parkingShortTitle,
        parkingSchedules: data?.parkingSchedules,
        parkingGroups: data?.parkingGroups,
        externalParkingId: data?.externalParkingId,
      };

      dispatch(setWorksWithHub(data.worksWithHub));
      dispatch(setParkingDetails(body));
      dispatch(
        setIsParkingSelected({ isParkingSelected: true, parkingId: id })
      );
    }
  };

  const handleSelectParking = async (parking) => {
    setSelectedParking(parking.parkingId);
    await getParkingProducts({ parkingId: parking.parkingId });
    handleParkingDetails(parking.parkingId);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {/* <SafeAreaView> */}
      <ScreenLayout>
        <View>
          <View style={style.headerWrapper}>
            <NativeBaseBackButton
              isLoading={false}
              style={style.backButton}
              handleOnPress={() => navigation.navigate("ReservetionsList")}
            />
            <Text style={style.headerTitle}>{t("select_parking")}</Text>

          </View>
          <View style={style.searchContainer}>
            <CustomSearchBox
              placeholder={t("search_parking")}
              handleChange={(event) => handleInputChange(event)}
              value={searchTerm}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={style.bodyContainer}>
            {parkings?.map((item, index) => {
              return (
                <TouchableOpacity
                  style={{
                    ...style.parkingItem,
                    borderWidth: 2,
                    borderColor:
                      item.parkingId === selectedParking ? BLUE : "transparent",
                  }}
                  key={item?.parkingId}
                  onPress={() => handleSelectParking(item)}
                >
                  <Text style={style.itemTitle}>{item?.title}</Text>
                  {/* <Text style={style.itemPrice}>5 RON/H</Text> */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <ButtonComponent
            text={t("confirm").toUpperCase()}
            onPress={handleNav}
            isDisabled={selectedParking ? false : true}
          />
        </View>
      </ScreenLayout>

      {/* </SafeAreaView> */}
    </TouchableWithoutFeedback>
  );
};

export default ParkingsList;
