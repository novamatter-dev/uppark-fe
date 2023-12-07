import {authURL} from '../config';
import {createApi} from '@reduxjs/toolkit/query/react';
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  tagTypes: ['Notifications'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/api/`,
    prepareHeaders: (headers, {getState}) => {
      const state = getState();
      const {jwt} = state.auth;

      // const jwt = token;
      if (jwt) {
        headers.set('Authorization', `Bearer ${jwt}`);
      }
      headers.set('X-engage-initiator', 'frontend');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: builder => ({
    //de scos
    sendParkingConfirmationNotification: builder.mutation({
      query: ({userId}) => ({
        url: `/Debugging/Post/Notification/ToUser/${userId}?notificationType=YOU_JUST_PARKED`,
        method: 'POST',
      }),
    }),
    sendReservationExpiredNotification: builder.mutation({
      query: ({userId}) => ({
        url: `/Debugging/Post/Notification/ToUser/${userId}?notificationType=YOUR_RESERVATION_EXPIRED`,
        method: 'POST',
      }),
    }),
    updateFcmToken: builder.mutation({
      query: reqBody => ({
        url: `Firebase/UpdateToken`,
        method: 'PUT',
        body: reqBody,
      }),
    }),
    checkForUpdates: builder.mutation({
      query: reqBody => ({
        url: `Settings/version-source`,
        method: 'POST',
        body: reqBody,
      }),
    }),
  }),
});

export const {
  useSendParkingConfirmationNotificationMutation,
  useSendReservationExpiredNotificationMutation,
  useUpdateFcmTokenMutation,
  useCheckForUpdatesMutation,
} = notificationsApi;
