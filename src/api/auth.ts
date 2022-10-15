import axios from "axios";
import { BACKEND_URL } from "../constants";
import { APIClient } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

// postForgetPwd
const postFakeForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// postForgetPwd
const postJwtForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

const postFakeLogin = (data: any) => {
  //safyan
  debugger;
  return axios.post(`${BACKEND_URL}/api/auth/login`, data);
  // return api.create(url.POST_FAKE_LOGIN, data);
};

// redirect from social: doot
const postloginRedirect = (data: string) => {
  //safyan
  debugger;
  axios.defaults.headers.common["Authorization"] = "Bearer " + data;
  return axios.get(`${BACKEND_URL}/api/v1/user/loginRedirect/me`);
  // return api.create(url.POST_FAKE_LOGIN, data);
};
const postJwtLogin = (data: any) => {
  return api.create(url.POST_FAKE_JWT_LOGIN, data);
};

// Register Method
const postFakeRegister = (data: any) => {
  return api.create(url.POST_FAKE_REGISTER, data);
};

// Register Method
const postJwtRegister = (data: any) => {
  return api.create(url.JWT_REGISTER, data);
};
const changePassword = (data: object) => {
  return api.update(url.USER_CHANGE_PASSWORD, data);
};

// postSocialLogin
const postSocialLogin = (data: any) => api.create(url.SOCIAL_LOGIN, data);

export {
  postFakeForgetPwd,
  postJwtForgetPwd,
  postFakeLogin,
  postJwtLogin,
  postFakeRegister,
  postJwtRegister,
  changePassword,
  postSocialLogin,
  postloginRedirect,
};
