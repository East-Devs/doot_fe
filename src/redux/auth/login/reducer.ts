import { AuthLoginActionTypes, AuthLoginState } from "./types";

export const INIT_STATE: AuthLoginState = {
  error: "",
  loading: false,
};

const Login = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case AuthLoginActionTypes.API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
        case AuthLoginActionTypes.LOGIN_USER_REDIRECT:
          localStorage.setItem("authUser", JSON.stringify(action.payload.data));
          debugger;
          return {
            ...state,
            user: action.payload.data,
            loading: false,
            isUserLogin: true,
            isUserLogout: false,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          return {
            ...state,
            loading: false,
            isUserLogout: true,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case AuthLoginActionTypes.LOGIN_USER:
        case AuthLoginActionTypes.LOGIN_USER_REDIRECT:
          return {
            ...state,
            error: action.payload.error,
            isUserLogin: false,
            loading: false,
          };
        case AuthLoginActionTypes.LOGOUT_USER:
          return {
            ...state,
            loading: false,
            isUserLogin: false,
            isUserLogout: false,
          };
        default:
          return { ...state };
      }

    case AuthLoginActionTypes.LOGIN_USER:
    case AuthLoginActionTypes.LOGIN_USER_REDIRECT: {
      debugger;

      return {
        ...state,
        loading: true,
        isUserLogin: false,
      };
    }

    case AuthLoginActionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        isUserLogout: false,
      };
    default:
      return { ...state };
  }
};

export default Login;
