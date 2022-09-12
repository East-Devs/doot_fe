import { BACKEND_URL } from "../constants";
import { APIClient, getLoggedinUser } from "./apiCore";
import axios from "axios";

const getContacts = async (filters?: object) => {
  const userProfileSession = getLoggedinUser();
  return axios.get(
    `${BACKEND_URL}/api/users/friends/${userProfileSession._id}`
  );
};

const inviteContact = (data: object) => {
  const userProfileSession = getLoggedinUser();

  return axios.put(
    `${BACKEND_URL}/api/users/${userProfileSession._id}/follow`,
    data
  );
};
export { getContacts, inviteContact };
