import { ChatsActionTypes } from "./types";

// common success
export const chatsApiResponseSuccess = (actionType: string, data: any) => ({
  type: ChatsActionTypes.API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});
// common error
export const chatsApiResponseError = (actionType: string, error: string) => ({
  type: ChatsActionTypes.API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getFavourites = () => ({
  type: ChatsActionTypes.GET_FAVOURITES,
});

export const getDirectMessages = () => ({
  type: ChatsActionTypes.GET_DIRECT_MESSAGES,
});

export const getChannels = () => ({
  type: ChatsActionTypes.GET_CHANNELS,
});

export const addContacts = (contacts: Array<string | number>) => ({
  type: ChatsActionTypes.ADD_CONTACTS,
  payload: contacts,
});

export interface CreateChannelPostData {
  name: string;
  members: Array<string | number>;
  description?: string;
}
export const createChannel = (channelData: CreateChannelPostData) => ({
  type: ChatsActionTypes.CREATE_CHANNEL,
  payload: channelData,
});

export const changeSelectedChat = (selectedChat: string | number | null) => ({
  type: ChatsActionTypes.CHANGE_SELECTED_CHAT,
  payload: selectedChat,
});

export const getChatUserDetails = (selectedChat: string | number | null) => ({
  type: ChatsActionTypes.GET_CHAT_USER_DETAILS,
  payload: selectedChat,
});

export const getChatUserConversations = (
  selectedChat: string | number | null
) => ({
  type: ChatsActionTypes.GET_CHAT_USER_CONVERSATIONS,
  payload: selectedChat,
});

export const toggleUserDetailsTab = (value: boolean) => ({
  type: ChatsActionTypes.TOGGLE_USER_DETAILS_TAB,
  payload: value,
});

export const onSendMessage = (data: any) => ({
  type: ChatsActionTypes.ON_SEND_MESSAGE,
  payload: data,
});
