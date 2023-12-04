import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-test-renderer";
import { parkingsApi } from "../../../services";

const initialState = {
  parkingsState: {
    test: false,
    worksWithHub: false,
    isParkingSelected: false,
    searchLocation: {
      latitude: 0.1,
      longitude: 0.1,
      latitudeDelta: 0.0008,
      longitudeDelta: 0.009,
    },
    parkingDetails: {
      amenities: [],
      isOpened: false,
      noLots: 0,
      parkingLongitude: 0.1,
      parkingLatitude: 0.1,
      pricePerHour: 1,
      currencyType: "RON",
      parkingShortTitle: "Parking short description/address",
      parkingSchedules: [
        {
          startHour: "00:00",
          endHour: "11:00",
          dayOfWeek: 8,
        },
      ],
      parkingGroups: [],
      parkingId: 0,
      externalParkingId: null,
      ShortNumber: "",
      Code: "",
    },
    parkingForm: {
      minutes: 0,
      parkingId: 0,
      totalAmounts: 0,
      carId: 1,
      startTime: "",
      endTime: "",
      groupId: 0,
      code: "",
      shortNumber: "",
    },
    nearByParkings: [],
    parkingGroups: [],
    reservationDetails: {
      reservationId: null,
      startTime: null,
      endTime: null,
    },
    carLocation: {
      latitude: 0.1,
      longitude: 0.1,
    },
    history: {
      count: 0,
      parkingPlaces: [],
    },
    reservedPolygon: null,
    parkingProducts: [],
    historyDetails: {},
    currentReservations: [],
    showCounter: false,
    sensors: null,
    hasSensors: false,
    reservedSensor: null,
    selectedSensor: null,
    isMiniPark: false,
    isLoading: false,
  },
};

export const parkingsSlice = createSlice({
  name: "parkings",
  initialState,
  reducers: {
    setSearchLocation: (state, action) => {
      state.parkingsState.searchLocation = action.payload;
    },
    setParkingDetails: (state, action) => {
      state.parkingsState.parkingDetails = action.payload;
    },
    setIsParkingSelected: (state, action) => {
      const { isParkingSelected, parkingId } = action.payload;
      state.parkingsState.isParkingSelected = isParkingSelected;
      state.parkingsState.parkingForm = {
        ...state.parkingsState.parkingForm,
        parkingId: parkingId,
      };
    },
    setParkingForm: (state, action) => {
      state.parkingsState.parkingForm = action.payload;
      state.parkingsState.parkingDetails.currencyType =
        action.payload.currencyType;
    },
    setNearByParkings: (state, action) => {
      state.parkingsState.nearByParkings = action.payload;
    },
    setPolygonParkingGroups: (state, action) => {
      state.parkingsState.parkingGroups = action.payload;
    },
    setReservationDetails: (state, action) => {
      state.parkingsState.reservationDetails = {
        ...state.parkingsState.reservationDetails,
        reservationId: action.payload.reservationId,
        startTime: action.payload.start,
        endTime: action.payload.end,
        car: action.payload.car,
      };
    },

    setCarLocationSlice: (state, action) => {
      state.parkingsState.carLocation = {
        ...state.parkingsState.carLocation,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    setReservedPolygon: (state, action) => {
      state.parkingsState.reservedPolygon = action.payload;
    },
    setWorksWithHub: (state, action) => {
      state.parkingsState.worksWithHub = action.payload;
    },
    resetParkingState: (state) => {
      return initialState;
    },
    setCurrentReservations: (state, action) => {
      state.parkingsState.currentReservations = action.payload;
    },
    setShowCounter: (state, action) => {
      state.parkingsState.showCounter = action.payload;
    },
    setGroupId: (state, action) => {
      state.parkingsState.parkingForm = {
        ...state.parkingsState.parkingForm,
        groupId: action.payload,
      };
    },
    setSensorParking: (state, action) => {
      state.parkingsState.sensors = action.payload.sensors;
      state.parkingsState.hasSensors = action.payload.hasSensors;
    },
    setUpdateSensorList: (state, action) => {
      state.parkingsState.sensors = action.payload;
    },
    setReservedSensor: (state, action) => {
      state.parkingsState.reservedSensor = action.payload;
    },
    setIsMiniPark: (state, action) => {
      state.parkingsState.isMiniPark = action.payload;
    },
    setSelectedSensor: (state, action) => {
      state.parkingsState.selectedSensor = action.payload;
    },
    setSelectedPolygonDetails: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUnselectParking: (state, action) => {
      state.parkingsState.isParkingSelected = false;
      state.parkingsState.reservedPolygon = null;
    },
    setIsLoading: (state, action) => {
      state.parkingsState.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      parkingsApi.endpoints.getHistoryList.matchFulfilled,
      (state, { payload }) => {
        const prakingPlaces = [...payload.parkingPlaces];
        state.parkingsState.history = {
          count: payload.count,
          parkingPlaces: prakingPlaces,
        };
      }
    );

    builder.addMatcher(
      parkingsApi.endpoints.getParkingProducts.matchFulfilled,
      (state, { payload }) => {
        state.parkingsState.parkingProducts = [...payload];
      }
    );

    builder.addMatcher(
      parkingsApi.endpoints.getHistoryDetails.matchFulfilled,
      (state, { payload }) => {
        state.parkingsState.historyDetails = payload;
      }
    );

    builder.addMatcher(
      parkingsApi.endpoints.getCurrentReservations.matchFulfilled,
      (state, { payload }) => {
        state.parkingsState.currentReservations = payload;
      }
    );

    builder.addMatcher(
      parkingsApi.endpoints.extendReservation.matchFulfilled,
      (state, { payload }) => {
        state.parkingsState.reservationDetails = {
          ...state.parkingsState.reservationDetails,
          reservationId: payload.parkingPlaces[0].reservationId,
          start: payload.parkingPlaces[0].startTime,
          end: payload.parkingPlaces[0].endTime,
        };
      }
    );

    builder.addMatcher(
      parkingsApi.endpoints.getSensors.matchFulfilled,
      (state, { payload }) => {
        // const sensorsArr = [];
        // for (const [key, value] of Object.entries(payload)) {
        //   value.map((item) => sensorsArr.push(item));
        // }
        state.parkingsState.sensors = payload;
        if (payload.length > 0) {
          state.parkingsState.hasSensors = true;
        }
      }
    );

    // builder.addMatcher(
    //   parkingsApi.endpoints.nearbyParkings.matchRejected,
    //   (state, { payload }) => {
    //     response = payload.json();
    //   }
    // );
  },
});

export const parkingsState = (state) => state.parkings.parkingsState;

export const {
  setSearchLocation,
  setParkingDetails,
  setIsParkingSelected,
  setParkingForm,
  setNearByParkings,
  setPolygonParkingGroups,
  setReservationDetails,
  setCarLocationSlice,
  setReservedPolygon,
  setWorksWithHub,
  resetState,
  setCurrentReservations,
  resetParkingState,
  setShowCounter,
  setGroupId,
  setSensorParking,
  setReservedSensor,
  setIsMiniPark,
  setSelectedSensor,
  setUpdateSensorList,
  setSelectedPolygonDetails,
  setUnselectParking,
  setIsLoading,
} = parkingsSlice.actions;

export default parkingsSlice.reducer;
