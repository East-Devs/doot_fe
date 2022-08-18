import { CallsActionTypes } from "./types";

// common success
export const callsApiResponseSuccess = (actionType: string, data: any) => ({
  type: CallsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const callsApiResponseError = (actionType: string, error: string) => ({
  type: CallsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getCalls = () => ({
  type: CallsActionTypes.GET_CALLS,
});

export const setStreamInfo = (data:any) => ({
  type: CallsActionTypes.SET_STREAM_INFO,
  payload: data
});
