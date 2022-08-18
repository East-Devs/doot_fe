export enum CallsActionTypes {
  API_RESPONSE_SUCCESS = "@@calls/API_RESPONSE_SUCCESS",
  API_RESPONSE_ERROR = "@@calls/API_RESPONSE_ERROR",

  GET_CALLS = "@@calls/GET_CALLS",
  SET_STREAM_INFO = "@@calls/SET_STREAM_INFO",
}
export interface CallsState {
  calls: Array<any>;
  streamInfo: {
    stream: any;
    currentStream:{};
    anyVideo:MediaStream | undefined;
  };
}
