import axios from "axios";
import { BACKEND_URL } from "../constants";
import { APIClient, getLoggedinUser } from "./apiCore";
import * as url from "./urls";

const api = new APIClient();

const getFavourites = () => {
  return api.get(url.GET_FAVOURITES);
};

const getDirectMessages = (id: string | number) => {
  // debugger;
  // safyan
  return axios.get(`${BACKEND_URL}/api/conversations/${id}`);
  // return api.get(url.GET_DIRECT_MESSAGES);
};
const getChannels = () => {
  const userProfileSession = getLoggedinUser();
  return axios.get(`${BACKEND_URL}/api/channels/${userProfileSession._id}`);
};

const addContacts = (contacts: Array<string | number>) => {
  return api.create(url.ADD_CONTACTS, contacts);
};

const createChannel = async (data: any) => {
  console.log("Create Channel", data);
  const userProfileSession = getLoggedinUser();
  data.members.push(userProfileSession._id);
  try {
    const reply = await axios.post(`${BACKEND_URL}/api/channels`, data);

    return "Group Created";
  } catch (error) {
    return "Failed to create";
  }
};

const getChatUserDetails = (id: string | number) => {
  console.log(
    "Hmm getting this user",
    id,
    `${BACKEND_URL}/api/users?userId=${id}`
  );
  return axios.get(`${BACKEND_URL}/api/users?userId=${id}`);
};

const getChatUserConversations = (ids: any) => {
  let url = `${BACKEND_URL}/api/conversations/find/${ids.user1Id}/${ids.user2Id}`;
  console.log("User id,s ", ids);
  if (!ids.user2Id) url = `${BACKEND_URL}/api/channels/messages/${ids.user1Id}`;
  return axios.get(url);
  // return api.get(url.GET_CHAT_USER_CONVERSATIONS + "/" + id, {
  //   params: { id },
  // });
};

const sendMessage = (data: object) => {
  // debugger
  //safyan
  return axios.post(`${BACKEND_URL}/api/messages`, data, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
  // return api.create(url.SEND_MESSAGE, data);
};

const receiveMessage = (id: string | number) => {
  return api.update(url.RECEIVE_MESSAGE + "/" + id, { params: { id } });
};

const readMessage = (id: string | number) => {
  return api.update(url.READ_MESSAGE + "/" + id, { params: { id } });
};

const receiveMessageFromUser = (id: string | number) => {
  return api.get(url.RECEIVE_MESSAGE_FROM_USER + "/" + id, {
    params: { id },
  });
};

const deleteMessage = (userId: number | string, messageId: number | string) => {
  return api.delete(url.DELETE_MESSAGE + "/" + userId + "/" + messageId, {
    params: { userId, messageId },
  });
};

const forwardMessage = (data: object) => {
  return api.create(url.FORWARD_MESSAGE, data);
};

const deleteUserMessages = (userId: number | string) => {
  return api.delete(url.DELETE_USER_MESSAGES + "/" + userId, {
    params: { userId },
  });
};

const getChannelDetails = (id: string | number) => {
  return axios.get(`${BACKEND_URL}/api/channels/find/${id}`);
};

const toggleFavouriteContact = (id: string | number) => {
  return api.update(url.TOGGLE_FAVOURITE_CONTACT + "/" + id, {
    params: { id },
  });
};

/*
archive
*/
const getArchiveContact = () => {
  return api.get(url.GET_ARCHIVE_CONTACT);
};

const toggleArchiveContact = (id: string | number) => {
  return api.update(url.TOGGLE_ARCHIVE_CONTACT + "/" + id, { params: { id } });
};

const readConversation = (id: string | number) => {
  return api.update(url.READ_CONVERSATION + "/" + id, { params: { id } });
};

const deleteImage = (
  userId: number | string,
  messageId: number | string,
  imageId: number | string
) => {
  return api.delete(url.DELETE_IMAGE + "/" + userId + "/" + messageId, {
    params: { userId, messageId, imageId },
  });
};

export {
  getFavourites,
  getDirectMessages,
  getChannels,
  addContacts,
  createChannel,
  getChatUserDetails,
  getChatUserConversations,
  sendMessage,
  receiveMessage,
  readMessage,
  receiveMessageFromUser,
  deleteMessage,
  forwardMessage,
  deleteUserMessages,
  getChannelDetails,
  toggleFavouriteContact,
  getArchiveContact,
  toggleArchiveContact,
  readConversation,
  deleteImage,
};
