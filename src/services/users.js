import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authURL, url } from "../config";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/api/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const { jwt } = state.auth;
      // const jwt = token;
      if (jwt) {
        headers.set("Authorization", `Bearer ${jwt}`);
      }

      headers.set("X-engage-initiator", "frontend");
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (payload) => ({
        url: "Users/Get/Details",
        method: "GET",
        body: payload,
      }),
    }),

    updateUser: builder.mutation({
      query: (reqBody) => ({
        url: `Users/Put/Details`,
        method: "POST",
        body: reqBody,
      }),
    }),
    updatePersonalProfile: builder.mutation({
      query: (payload) => ({
        url: `Users/Put/PersonalProfileDetails`,
        method: "PUT",
        body: payload,
      }),
    }),
    getPersonalProfile: builder.mutation({
      query: () => ({
        url: `Users/Get/PersonalProfile`,
        method: "GET",
      }),
    }),
    updateBusinessProfile: builder.mutation({
      query: (payload) => ({
        url: `Users/Put/BusinessProfileDetails`,
        method: "PUT",
        body: payload,
      }),
    }),
    getBusinessProfile: builder.mutation({
      query: () => ({
        url: `Users/Get/BusinessProfile`,
        method: "GET",
      }),
    }),
    getSettings: builder.mutation({
      query: () => ({
        url: `Settings/Get`,
        method: "GET",
      }),
    }),
    updateSettings: builder.mutation({
      query: (reqBody) => ({
        url: `Settings/Put`,
        method: "PUT",
        body: reqBody,
      }),
    }),
    updateDrivingLincense: builder.mutation({
      query: (reqBody) => ({
        url: `Users/UpdateDrivingLicense`,
        method: "POST",
        body: reqBody,
      }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({
        url: `Users/Get/DeleteAccount`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserMutation,
  useUpdateUserMutation,
  useUpdatePersonalProfileMutation,
  useGetPersonalProfileMutation,
  useUpdateBusinessProfileMutation,
  useGetBusinessProfileMutation,
  useGetSettingsMutation,
  useUpdateSettingsMutation,
  useUpdateDrivingLincenseMutation,
  useDeleteAccountMutation,
} = usersApi;
