import { authURL } from "../config";
import { createApi } from "@reduxjs/toolkit/query/react";
// import { secureBaseQuery } from "../services/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import { getCookie } from "../helpers";

// let token = null;
// getCookie({ key: "jwt" }).then((answer) => {
//   token = answer;
// });

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["Cars"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${authURL}/api/Cars`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState();
      const { jwt } = state.auth;
      // console.log(jwt);

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
    getCars: builder.mutation({
      query: () => "/GET",
      providesTags: ["Cars"],
    }),
    addCar: builder.mutation({
      query: (reqBody) => ({
        url: "/Create",
        method: "POST",
        body: reqBody,
      }),
      invalidatesTags: ["Cars"],
    }),
    deleteCar: builder.mutation({
      query: ({ id }) => ({
        url: `/Delete/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Cars"],
    }),
    updateCar: builder.mutation({
      query: (reqBody) => ({
        url: `/Update`,
        method: "PUT",
        body: reqBody,
      }),
      invalidatesTags: ["Cars"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarsMutation,
  useAddCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation,
} = carsApi;
