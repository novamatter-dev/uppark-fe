import {authURL} from '../config';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {setError} from '../redux/features/auth/authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/`,
    prepareHeaders: headers => {
      headers.set('X-engage-initiator', 'frontend');
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: builder => ({
    /**
     * Sends SMS and success / failure endpoint status
     * @param {object} reqBody of type {
     *   "phoneNumber": "string",
     * }
     *
     */
    postCreatePhoneNumber: builder.mutation({
      query: reqBody => ({
        url: 'api/Onboarding/Create/PhoneNumber',
        method: 'POST',
        body: reqBody,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        // `onStart` side-effect
        dispatch(setError({status: null, message: null}));
        // try {
        //   // const { data } = await queryFulfilled
        //   // `onSuccess` side-effect
        // } catch (err) {
        //   // `onError` side-effect
        // }
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
      query: reqBody => ({
        url: 'api/Onboarding/Put/ConfirmPhoneNumber',
        method: 'PUT',
        body: reqBody,
      }),
    }),

    postEmailAndPass: builder.mutation({
      query: reqBody => ({
        url: 'api/Onboarding/Create/EmailAndPass',
        method: 'POST',
        body: reqBody,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        // `onStart` side-effect
        dispatch(setError({status: null, message: null}));
        // try {
        //   // const { data } = await queryFulfilled
        //   // `onSuccess` side-effect
        // } catch (err) {
        //   // `onError` side-effect
        // }
      },
    }),
    postLoginWithEmail: builder.mutation({
      query: reqBody => ({
        url: 'api/Onboarding/LogIn/EmailAndPass',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postLoginWithFb: builder.mutation({
      query: reqBody => ({
        url: 'api/Auth/signin-facebook',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postCTLoginWithFb: builder.mutation({
      query: reqBody => ({
        url: 'api/Auth/ct-signin-facebook',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postLoginWithGoogle: builder.mutation({
      query: reqBody => ({
        url: 'api/Auth/signin-google',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postCTLoginWithGoogle: builder.mutation({
      query: reqBody => ({
        url: 'api/Auth/ct-signin-google',
        method: 'POST',
        body: reqBody,
      }),
    }),
    postLoginWithApple: builder.mutation({
      query: reqBody => ({
        url: 'api/Auth/signin-apple',
        method: 'POST',
        body: reqBody,
      }),
    }),
  }),
});

// const secureBaseQuery =
//   ({ baseUrl }) =>
//   async (args, api, extraOptions) => {
//     const config = {
//       baseUrl,
//       prepareHeaders: (headers) => {
//         if (retrieveCookie("token")) {
//           headers.set("Authorization", `Bearer ${retrieveCookie("token")}`);
//         }

//         headers.set("X-engage-initiator", "frontend");
//         headers.set("Content-Type", "application/json");

//         return headers;
//       },
//     };

//     const safeArgs = args.url ? args : { url: args };

//     const baseQuery = fetchBaseQuery({ ...safeArgs, ...config });
//     const result = await baseQuery(
//       { ...safeArgs, ...config },
//       api,
//       extraOptions
//     );

//     api.dispatch(clearErrors());

//     if (result?.error?.data) {
//       api.dispatch(
//         setAuthError({
//           error:
//             result?.error?.data?.title ||
//             result?.error?.data ||
//             "An error occured",
//         })
//       );
//     } else {
//       api.dispatch(
//         setAuthError({
//           error: null,
//         })
//       );
//     }

//     if (result.error && result.error.status === 401) {
//       setSession(null);

//       deleteCookie("token");
//       window.location.replace("/");
//     }

//     return result;
//   };

export const {
  usePostCreatePhoneNumberMutation,
  usePutConfirmPhoneNumberMutation,
  usePostEmailAndPassMutation,
  usePostLoginWithEmailMutation,
  usePostLoginWithFbMutation,
  usePostLoginWithGoogleMutation,
  usePostLoginWithAppleMutation,
  usePostCTLoginWithFbMutation,
  usePostCTLoginWithGoogleMutation,
} = authApi;

// export { secureBaseQuery };
