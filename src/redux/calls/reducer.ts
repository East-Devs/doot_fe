// types
import { CallsActionTypes, CallsState } from "./types";

export const INIT_STATE: CallsState = {
  calls: [],
  streamInfo:{
    stream: {},
    currentStream:{},
    anyVideo: undefined
  },
};

const Calls = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case CallsActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case CallsActionTypes.GET_CALLS:
          return {
            ...state,
            calls: action.payload.data,
            isCallsFetched: true,
            getCallsLoading: false,
          };
        default:
          return { ...state };
      }

    case CallsActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case CallsActionTypes.GET_CALLS:
          return {
            ...state,
            isCallsFetched: false,
            getCallsLoading: false,
          };

        default:
          return { ...state };
      }

    case CallsActionTypes.GET_CALLS: {
      return {
        ...state,
        getCallsLoading: true,
        isCallsFetched: false,
      };
    }

    // case CallsActionTypes.SET_STREAM_INFO: {
    //   console.log("setStreamInfo", action.payload);
    //   return {
    //     ...state,
    //     streamInfo:{myVideo:action.payload},
    //     //   ...state.streamInfo,
    //     //   ...action.payload
    //     // },
    //     getCallsLoading: true,
    //     isCallsFetched: false,
    //   };
    // }

    default:
      return { ...state };
  }
};

export default Calls;
