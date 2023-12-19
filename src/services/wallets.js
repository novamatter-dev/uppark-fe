import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {authURL} from '../config';

export const walletsApi = createApi({
  reducerPath: 'walletsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/api/`,
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
    postNewWallet: builder.mutation({
      query: payload => ({
        url: `/Wallets/Create`,
        method: 'POST',
        body: payload,
      }),
    }),
    getAllWallets: builder.mutation({
      query: payload => ({
        url: `/Wallets/GetAll`,
        method: 'GET',
        body: payload,
      }),
    }),
    getCards: builder.mutation({
      query: () => ({
        url: `/Cards/GetAll`,
        method: 'GET',
      }),
    }),
    createCard: builder.mutation({
      query: reqBody => ({
        url: `/Cards/Create`,
        method: 'POST',
        body: reqBody,
      }),
    }),
    setPersonalDefaultPayment: builder.mutation({
      query: ({cardId}) => ({
        url: `Cards/SetPersonalDefaultCard/${cardId}`,
        method: 'POST',
      }),
    }),
    setBusinessDefaultPayment: builder.mutation({
      query: ({cardId}) => ({
        url: `Cards/SetBusinessDefaultCard/${cardId}`,
        method: 'POST',
      }),
    }),
    getPersonalDefailtCard: builder.mutation({
      query: () => ({
        url: `Cards/GetPersonalDefaultCard`,
        method: 'GET',
      }),
    }),
    getBusinessDefaultCard: builder.mutation({
      query: () => ({
        url: `Cards/GetBusinessDefaultCard`,
        method: 'GET',
      }),
    }),
    deleteCard: builder.mutation({
      query: ({cardId}) => ({
        url: `Cards/Delete/${cardId}`,
        method: 'POST',
      }),
    }),
    editCard: builder.mutation({
      query: ({cardId, reqBody}) => ({
        url: `Cards/Edit/${cardId}`,
        method: 'POST',
        body: reqBody,
      }),
    }),
  }),
});

export const {
  usePostNewWalletMutation,
  useGetAllWalletsMutation,
  useGetCardsMutation,
  useCreateCardMutation,
  useSetPersonalDefaultPaymentMutation,
  useSetBusinessDefaultPaymentMutation,
  useGetPersonalDefailtCardMutation,
  useGetBusinessDefaultCardMutation,
  useDeleteCardMutation,
  useEditCardMutation,
} = walletsApi;
