import { authURL } from "../config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setError } from "../redux/features/auth/authSlice";

const fetchWithTimeout = (url, options, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Request timed out")), timeout);
    }),
  ]);
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/`,
    prepareHeaders: (headers) => {
      headers.set("X-engage-initiator", "frontend");
      headers.set("Content-Type", "application/json");

      return headers;
    },
    fetchFn: (url, args) => fetchWithTimeout(url, args, 20000),
  }),
  endpoints: (builder) => ({
    /**
     * Sends SMS and success / failure endpoint status
     * @param {object} reqBody of type {
     *   "phoneNumber": "string",
     * }
     *
     */
    postCreatePhoneNumber: builder.mutation({
      query: (reqBody) => ({
        url: "api/Onboarding/Create/PhoneNumber",
        method: "POST",
        body: reqBody,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        dispatch(setError({ status: null, message: null }));
        // try {
        //   // const { data } = await queryFulfilled
        //   // `onSuccess` side-effect
        // } catch (err) {
        //   // `onError` side-effect
        // }
      },
    }),

    postCreatePhoneNumber: builder.mutation({
      query: (reqBody) => ({
        url: "api/Onboarding/Create/PhoneNumber",
        method: "POST",
        body: reqBody,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(setError({ status: null, message: null }));
      },
    }),

    /**
     * Returns jwt and success / failure endpoint status
     * @param {object} reqBody of type {
     *   "phoneNumber": "string",
     *   "code": "string",
     *   "device": {
     *     "deviceType": "IOS",
     *     "deviceId": "string",
     *     "firebaseToken": "string",
     *     "brand": "string",
     *     "model": "string",
     *     "resolutionWidth": 0,
     *     "resolutionHeight": 0
     *   }
     * }
     *
     * @returns {object} of type {
     *   "isSucceeded": true,
     *   "needRegenerateCode": true,
     *   "message": "string",
     *   "jwt": "string"
     * }
     */

    putConfirmPhoneNumber: builder.mutation({
      query: (reqBody) => ({
        url: "api/Onboarding/Put/ConfirmPhoneNumber",
        method: "PUT",
        body: reqBody,
      }),
    }),

    postEmailAndPass: builder.mutation({
      query: (reqBody) => ({
        url: "api/Onboarding/Create/EmailAndPass",
        method: "POST",
        body: reqBody,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        dispatch(setError({ status: null, message: null }));
        // try {
        //   // const { data } = await queryFulfilled
        //   // `onSuccess` side-effect
        // } catch (err) {
        //   // `onError` side-effect
        // }
      },
    }),
    postLoginWithEmail: builder.mutation({
      query: (reqBody) => ({
        url: "api/Onboarding/LogIn/EmailAndPass",
        method: "POST",
        body: reqBody,
      }),
    }),
    postLoginWithFb: builder.mutation({
      query: (reqBody) => ({
        url: "api/Auth/signin-facebook",
        method: "POST",
        body: reqBody,
      }),
    }),
    postLoginWithGoogle: builder.mutation({
      query: (reqBody) => ({
        url: "api/Auth/signin-google",
        method: "POST",
        body: reqBody,
      }),
    }),
    postLoginWithApple: builder.mutation({
      query: (reqBody) => ({
        url: "api/Auth/signin-apple",
        method: "POST",
        body: reqBody,
      }),
    }),
  }),
});

export const {
  usePostCreatePhoneNumberMutation,
  usePutConfirmPhoneNumberMutation,
  usePostEmailAndPassMutation,
  usePostLoginWithEmailMutation,
  usePostLoginWithFbMutation,
  usePostLoginWithGoogleMutation,
  usePostLoginWithAppleMutation,
} = authApi;

// export { secureBaseQuery };
