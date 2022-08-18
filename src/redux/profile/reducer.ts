// types
import { ProfileActionTypes, ProfileState } from "./types";

export const INIT_STATE: ProfileState = {
  profileDetails: {
    basicDetails:{}
  },
};

const Profile = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case ProfileActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case ProfileActionTypes.GET_PROFILE_DETAILS:
          return {
            ...state,
            profileDetails:{
              basicDetails: action.payload
            },
            isProfileFetched: true,
            getProfileLoading: false,
          };
        default:
          return { ...state };
      }

    case ProfileActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case ProfileActionTypes.GET_PROFILE_DETAILS:
          return {
            ...state,
            isProfileFetched: false,
            getProfileLoading: false,
          };

        default:
          return { ...state };
      }

    case ProfileActionTypes.GET_PROFILE_DETAILS: {
      // debugger;
      // safyan 42 payload added
      return {
        ...state,
        profileDetails:{
          basicDetails: action.payload
        },
        getProfileLoading: true,
        isProfileFetched: false,
      };
    }

    default:
      return { ...state };
  }
};

export default Profile;
