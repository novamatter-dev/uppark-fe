// import axios from "axios";
// import store from "../stores/store";
//
// //TODO: change base url
// const baseURL = "hhtp://url.com";
//
// export const REST = axios.create({
//   baseURL: baseURL,
//   timeout: 10000,
//   headers: {
//     "X-engage-initiator": "frontend",
//     "Content-Type": `application/json`,
//   },
// });
//
// REST.interceptors.request.use(
//   async (config) => {
//     const token = store.getState().session.loggedState.token;
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
//
// export const checkStatus = (status) => {
//   return {
//     is200: status === 200,
//     is202: status === 202,
//     is401: status === 401,
//     is403: status === 403,
//     is405: status === 405,
//     is404: status === 404,
//     is500: status === 500,
//     is501: status === 501,
//   };
// };
//
// REST.interceptors.response.use(
//   (response) => {
//     return new Promise((resolve, reject) => {
//       resolve(response);
//     });
//   },
//   async (error) => {
//     const requestStatus = checkStatus(error.response.status);
//
//     const { dispatch } = store;
//     // the user is not authorized
//     if (requestStatus.is401) {
//       // If token is not valid or expired clear lscache.
//       // Also, here you can do refresh token API call
//     }
//     return Promise.reject(error);
//   }
// );
