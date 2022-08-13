import { ProfileActionTypes } from "./types";

// common success
export const profileApiResponseSuccess = (actionType: string, data: any) => ({
  type: ProfileActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const profileApiResponseError = (actionType: string, error: string) => ({
  type: ProfileActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getProfileDetails = (data:any) => {
  debugger;
  return {
    type: ProfileActionTypes.GET_PROFILE_DETAILS,
    payload:data
  }
};
