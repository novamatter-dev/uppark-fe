import { createSlice } from "@reduxjs/toolkit";
import { carsApi } from "../../../services";

const initialState = {
  cars: [],
  activeCarId: null,
  activeCar: null,
  selectingCar: false,
};

export const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setActiveCarId: (state, action) => {
      state.activeCarId = action.payload.activeCarId;
    },
    setActiveCar: (state, action) => {
      state.activeCar = action.payload;
    },
    setSelectingCar: (state, action) => {
      state.selectingCar = action.payload;
    },
    resetCarsState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      carsApi.endpoints.getCars.matchFulfilled,
      (state, { payload }) => {
        state.cars = [...payload.userCars];
        if (!state.activeCar && state.cars.length != 0) {
          state.activeCar = payload.userCars[0];
          state.activeCarId = payload.userCars[0].carId;
        }
      }
    );
  },
});

export const activeCarState = (state) => state.cars.activeCar;

export const { setActiveCarId, setActiveCar, setSelectingCar, resetCarsState } =
  carsSlice.actions;

export default carsSlice.reducer;
