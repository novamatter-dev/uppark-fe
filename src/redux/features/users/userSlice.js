import {createSlice} from '@reduxjs/toolkit';
import {usersApi, walletsApi, notificationsApi} from '../../../services';
import svgs from '../../../assets/svgs';

const initialState = {
  personal: {
    firstName: {
      label: 'First Name',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'first_name',
    },
    lastName: {
      label: 'Last Name',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'last_name',
    },
    address: {
      label: 'Address',
      value: null,
      svg: svgs.location,
      placeholder: 'address',
    },
    city: {
      label: 'City',
      value: null,
      svg: svgs.location,
      placeholder: 'city',
    },
    county: {
      label: 'County',
      value: null,
      svg: svgs.location,
      placeholder: 'county',
    },
    email: {
      label: 'Email for receipt',
      value: null,
      svg: svgs.mail,
      placeholder: 'email_for_receipt',
    },
    cardNumber: {
      label: 'Default Payment',
      value: '123',
      svg: svgs.copy,
      isDisabled: true,
      placeholder: 'default_payment',
    },
    phoneNumber: {
      label: 'Phone Number',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'phone_number_placeholder',
    },
  },
  business: {
    companyName: {
      label: 'Company Name',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'company_name',
    },
    cui: {
      label: 'CUI',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'cui',
    },
    address: {
      label: 'Address',
      value: null,
      svg: svgs.location,
      placeholder: 'address',
    },
    city: {
      label: 'City',
      value: null,
      svg: svgs.location,
      placeholder: 'city',
    },
    county: {
      label: 'County',
      value: null,
      svg: svgs.location,
      placeholder: 'county',
    },
    email: {
      label: 'Email for receipt',
      value: null,
      svg: svgs.mail,
      placeholder: 'email_for_receipt',
    },
    registryCom: {
      label: 'Registry Com No.',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'registry_com_no',
    },
    iban: {
      label: 'IBAN',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'iban',
    },
    bankName: {
      label: 'Bank Name',
      value: null,
      svg: svgs.drivingLicense,
      placeholder: 'bank_name',
    },
    cardNumber: {
      label: 'Default Payment',
      value: null,
      svg: svgs.wallet,
      placeholder: 'default_payment',
    },
    phoneNumber: {
      label: 'Phone Number',
      value: null,
      svg: svgs.location,
      placeholder: 'phone_number_placeholder',
    },
  },
  parkingHistory: {},
  expirationDateDrivingLicense: null,
  cards: [],
  defaultCard: {},
  accountSettings: {},
  language: null,
  hasInternetConnection: true,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUserSlice(state, action) {
      state.details = {...initialState.details};
    },
    setPhone: (state, action) => {
      state.phoneNr = action.payload.phone;
    },
    setBusiness: (state, action) => {
      const {business} = action.payload;
      Object.keys(business).forEach(item => {
        business[item] = business[item].value;
      });

      state.business = {...business};
    },
    setPersonalEntry: (state, action) => {
      const {type, label, value} = action.payload;
      state.personal[type] = {...state.personal[type], value};
    },
    setBusinessEntry: (state, action) => {
      const {type, label, value} = action.payload;
      state.business[type] = {...state.business[type], value};
    },
    setLicense: (state, action) => {
      state.expirationDateDrivingLicense = action.payload;
    },
    setParkingHistory: (state, action) => {
      state.parkingHistory = action.payload;
    },
    setAccountSettings: (state, action) => {
      state.accountSettings = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    resetUserState: () => {
      return initialState;
    },
    setInternetConnection: (state, action) => {
      state.hasInternetConnection = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      usersApi.endpoints.getUser.matchFulfilled,
      (state, {payload}) => {
        state.details = {...state.details, ...payload.data};
      },
    );

    builder.addMatcher(
      usersApi.endpoints.updateUser.matchFulfilled,
      (state, {payload}) => {
        state.details = {...state.details, ...payload.data};
      },
    );

    builder.addMatcher(
      usersApi.endpoints.getPersonalProfile.matchFulfilled,
      (state, {payload}) => {
        Object.keys(state.personal).forEach(item => {
          state.personal[item].value = payload[item];
        });
      },
    );

    builder.addMatcher(
      usersApi.endpoints.getBusinessProfile.matchFulfilled,
      (state, {payload}) => {
        Object.keys(state.business).forEach(item => {
          state.business[item].value = payload[item];
        });
      },
    );

    builder.addMatcher(
      walletsApi.endpoints.getCards.matchFulfilled,
      (state, {payload}) => {
        state.cards = payload;
      },
    );
    builder.addMatcher(
      walletsApi.endpoints.getPersonalDefailtCard.matchFulfilled,
      (state, {payload}) => {
        state.defaultCard = payload;
      },
    );
    builder.addMatcher(
      walletsApi.endpoints.getBusinessDefaultCard.matchFulfilled,
      (state, {payload}) => {
        state.defaultCard = payload;
      },
    );
    builder.addMatcher(
      usersApi.endpoints.getSettings.matchFulfilled,
      (state, {payload}) => {
        state.accountSettings = payload;
      },
    );

    builder.addMatcher(
      notificationsApi.endpoints.updateFcmToken.matchFulfilled,
      (state, {payload}) => {
        // console.log("sucess updatce fcm token >> ", payload);
      },
    );
  },
});

export const {
  clearUserSlice,
  setPhone,
  setBusiness,
  setPersonal,
  setPersonalEntry,
  setBusinessEntry,
  setLicense,
  deletePersonalEntry,
  resetUserState,
  setParkingHistory,
  setAccountSettings,
  setLanguage,
  setInternetConnection,
} = userSlice.actions;

export default userSlice.reducer;
