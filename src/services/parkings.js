// @ts-nocheck
import {authURL, url} from '../config';
import {createApi} from '@reduxjs/toolkit/dist/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const parkingsApi = createApi({
  reducerPath: 'parkingsApi',
  tagTypes: ['Parkings'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}`,
    prepareHeaders: (headers, {getState}) => {
      const state = getState();
      const {jwt} = state.auth;

      if (jwt) {
        headers.set('Authorization', `Bearer ${jwt}`);
      }
      headers.set('X-engage-initiator', 'frontend');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: builder => ({
    getParkingDetails: builder.mutation({
      query: ({id}) => ({
        url: `/api/Parkings/Details/${id}`,
        method: 'GET',
      }),
      providesTags: ['Parkings'],
    }),
    // TODO: In UpPark this api should be only: /api/Parkings/Nearby
    nearbyParkings: builder.mutation({
      query: reqBody => ({
        // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
        // url: '/api/Parkings/NearbyConstanta',
        url: '/api/Parkings/Nearby',
        method: 'POST',
        body: reqBody,
      }),
      invalidatesTags: ['Parkings'],
    }),
    postParkingReservation: builder.mutation({
      query: reqBody => ({
        url: '/api/ParkingReservation',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postUploadScreenshot: builder.mutation({
      query: ({parkingId, reqBody}) => ({
        url: `/api/ParkingReservation/UploadScreenshot/${parkingId}`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    getHistoryList: builder.mutation({
      query: () => ({
        url: `/api/ParkingReservation/History?skip=0&take=50`,
        method: 'GET',
      }),
    }),
    getHistoryItemImage: builder.mutation({
      query: ({parkingReservationId}) => ({
        url: `/api/ParkingReservation/GetScreenshot/${parkingReservationId}`,
        method: 'GET',
      }),
    }),
    getHistoryDetails: builder.mutation({
      query: ({parkingReservationId}) => ({
        url: `/api/ParkingReservation/Details/${parkingReservationId}`,
        method: 'GET',
      }),
    }),
    nearest: builder.mutation({
      query: reqBody => ({
        // TODO: CHANGES BETWEEN UPPARK AND CONSTANTA PARKING:
        url: `/api/Parkings/Nearest`,
        // url: `/api/Parkings/NearestConstanta`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    getGroupDetails: builder.mutation({
      query: ({groupId, parkingId}) => ({
        url: `/api/Parkings/Details/ByGroupId/${groupId}/ByParkingId/${parkingId}`,
        method: 'GET',
      }),
    }),
    getParkingProducts: builder.mutation({
      query: ({parkingId}) => ({
        url: `/api/ParkingProducts/${parkingId}`,
        method: 'GET',
      }),
    }),
    paymentInfoBarcode: builder.mutation({
      query: ({barcode, parkingId}) => ({
        url: `/api/ParkingProducts/PaymentInfoBarcode/${barcode}/${parkingId}`,
        method: 'GET',
      }),
    }),
    getCurrentReservations: builder.mutation({
      query: () => ({
        url: `/api/ParkingReservation/CurrentReservations`,
        method: 'GET',
      }),
    }),
    cancelReservation: builder.mutation({
      query: ({prakingReservationId}) => ({
        url: `/api/ParkingReservation/Put/CancelReservation/${prakingReservationId}`,
        method: 'PUT',
      }),
    }),
    extendReservation: builder.mutation({
      query: ({prakingReservationId, reqBody}) => ({
        url: `/api/ParkingReservation/Extend/${prakingReservationId}`,
        method: 'PUT',
        body: reqBody,
      }),
    }),
    getInvoice: builder.mutation({
      query: ({parkingReservationProductId}) => ({
        url: `/api/ParkingReservation/Get/Invoice/ParkingReservationId/${parkingReservationProductId}`,
        method: 'GET',
      }),
    }),
    getSensors: builder.mutation({
      query: reqBody => ({
        url: `/api/ParkingLots/Post/parkingIds`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    postBookSensor: builder.mutation({
      query: requBody => ({
        url: `/api/ParkingLots/Book`,
        method: 'POST',
        body: requBody,
      }),
    }),
    //payment
    initiatePayment: builder.mutation({
      query: reqBody => ({
        // url: `/api/Payment/initiate-card-payment`,
        url: `/api/Payment/initiate-payment`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    //sms payment
    initiateSmsPayment: builder.mutation({
      query: reqBody => ({
        url: `/api/Payment/initiate-sms-payment`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    checktransaction: builder.mutation({
      query: ({transactionId}) => ({
        url: `/api/Payment/check-transaction/${transactionId}`,
        method: 'GET',
      }),
    }),
    returnLink: builder.mutation({
      query: () => ({
        url: `/api/Payment/ReturnLink`,
        method: 'GET',
      }),
    }),

    //minipark
    getMiniParkDetails: builder.mutation({
      query: ({plateId, externalParkingId}) => ({
        url: `/Get/VehicleMovement/${plateId}/${externalParkingId}`,
        method: 'GET',
      }),
    }),
    searchByKeyword: builder.mutation({
      query: reqBody => ({
        url: `/api/Parkings/search-by-keyword`,
        method: 'POST',
        body: reqBody,
      }),
    }),
  }),
});

export const {
  useNearbyParkingsMutation,
  useGetParkingDetailsMutation,
  usePostParkingReservationMutation,
  useNearestMutation,
  useGetGroupDetailsMutation,
  usePostUploadScreenshotMutation,
  useGetHistoryListMutation,
  useGetHistoryItemImageMutation,
  useGetParkingProductsMutation,
  usePaymentInfoBarcodeMutation,
  useGetHistoryDetailsMutation,
  useGetCurrentReservationsMutation,
  useCancelReservationMutation,
  useExtendReservationMutation,
  useGetInvoiceMutation,
  useGetSensorsMutation,
  useInitiatePaymentMutation,
  useInitiateSmsPaymentMutation,
  useChecktransactionMutation,
  useReturnLinkMutation,
  useGetMiniParkDetailsMutation,
  usePostBookSensorMutation,
  useSearchByKeywordMutation,
} = parkingsApi;
