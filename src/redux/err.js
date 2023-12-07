import {isRejectedWithValue, isFulfilled} from '@reduxjs/toolkit';
import {setError} from './features/auth/authSlice';

export const rtkQueryErrorLogger = api => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isFulfilled(action)) {
    // api.dispatch(
    //   setError({
    //     status: 200,
    //     message: `Success request ${action.meta.arg.endpointName}`,
    //     type: "success",
    //   })
    // );
  }
  if (isRejectedWithValue(action)) {
    // console.warn(api)
    // console.warn('WARN : ', action.payload);
    // console.warn('http status: ', action.payload.status);
    // console.warn('http message: ', action.payload.data.message);
    if (action.payload.status === 401) {
      api.dispatch(
        setError({
          status: action.payload.status,
          message: `Success request ${action.meta.arg.endpointName}`,
          type: 'success',
        }),
      );
    }

    // api.dispatch(
    //   setError({
    //     status: action.payload.status,
    //     message: action.payload.data.message || action.payload.data,
    //     type: "error",
    //   })
    // );

    // console.warn(action);
    // console.warn(action.payload);
    // console.warn(action.payload.data);
    // console.warn('We got a rejected action!')
    // console.warn({ title: 'Async error!', message: action.payload.data.message })
    // console.warn(next)
    // console.warn(action)
  }

  return next(action);
};
