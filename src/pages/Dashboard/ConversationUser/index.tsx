import React, { useEffect, useState } from "react";

// hooks
import { useRedux } from "../../../hooks/index";

// actions
import {
  toggleUserDetailsTab,
  getChatUserConversations,
  onSendMessage,
  receiveMessage,
  readMessage,
  receiveMessageFromUser,
  deleteMessage,
  deleteUserMessages,
  toggleArchiveContact,
} from "../../../redux/actions";

// hooks
import { useProfile } from "../../../hooks";

// components
import UserHead from "./UserHead";
import Conversation from "./Conversation";
import ChatInputSection from "./ChatInputSection/index";

// interface
import { MessagesTypes } from "../../../data/messages";

// dummy data
import { pinnedTabs } from "../../../data/index";
import { prepareForm } from "../../../utils/datautils";

interface IndexProps {
  isChannel: boolean;
}
const Index = ({ isChannel }: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();

  const {
    chatUserDetails,
    selectedChat,
    chatUserConversations,
    isUserMessageSent,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
    socket,
    directMessages
  } = useAppSelector(state => ({
    chatUserDetails: state.Chats.chatUserDetails,
    selectedChat: state.Chats.selectedChat,
    chatUserConversations: state.Chats.chatUserConversations,
    isUserMessageSent: state.Chats.isUserMessageSent,
    isMessageDeleted: state.Chats.isMessageDeleted,
    isMessageForwarded: state.Chats.isMessageForwarded,
    isUserMessagesDeleted: state.Chats.isUserMessagesDeleted,
    isImageDeleted: state.Chats.isImageDeleted,
    socket:state.Chats.socket,
    directMessages: state.Chats.directMessages
  }));
  const onOpenUserDetails = () => {
    dispatch(toggleUserDetailsTab(true));
  };

  /*
  hooks
  */
  const { userProfile } = useProfile();

  /*
  reply handeling
  */
  const [replyData, setReplyData] = useState<
    null | MessagesTypes | undefined
  >();
  const onSetReplyData = (reply: null | MessagesTypes | undefined) => {
    setReplyData(reply);
  };

  console.log('Chat users', directMessages, directMessages.find((u: any) => u._id == selectedChat));
  
  const currentChatUser = directMessages.find((u: any) => u._id == selectedChat);
  /*
  send message
  */
  const onSend = (data: any) => {
    // debugger;
    //safyan

    var file = null;
    var fName = null;
    if(data.attachments && data.attachments.length > 0)
    {
      file = data.attachments[0];

      let extension = file.name.split(".");
      extension = extension[extension.length - 1];
      fName = Date.now() + Math.floor(Math.random() * 1000) + "." + extension;
    }
      


    let params: any = {
      text: data.text && data.text,
      time: new Date().toISOString(),
      image: data.image && data.image,
      meta: {
        receiver: selectedChat,
        sender: userProfile._id,
      },
      isChannel: chatUserDetails.isChannel,
      isFile: !!file,
      fName
    };

    const form = prepareForm(params, file);

    params.file = fName;

    //  debugger;
    // socket.emit("sendMessage", params);
    dispatch(onSendMessage(form));
   
      setTimeout(() => {
        dispatch(receiveMessage(chatUserDetails.id));
      }, 1000);
      // setTimeout(() => {
      //   dispatch(readMessage(chatUserDetails.id));
      // }, 1500);
    if (!isChannel) {
      setTimeout(() => {
        dispatch(receiveMessageFromUser(chatUserDetails.id));
      }, 2000);
    }
    setReplyData(null);
  };

  useEffect(() => {
    if (
      isUserMessageSent ||
      isMessageDeleted ||
      isMessageForwarded ||
      isUserMessagesDeleted ||
      isImageDeleted
    ) {
      // debugger;
      if(chatUserDetails.isChannel)
        dispatch(getChatUserConversations(selectedChat, null));
      else
        dispatch(getChatUserConversations(userProfile._id, selectedChat));
    }
  }, [
    dispatch,
    isUserMessageSent,
    chatUserDetails,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  ]);

  const onDeleteMessage = (messageId: string | number) => {
    dispatch(deleteMessage(chatUserDetails._id, messageId));
  };

  const onDeleteUserMessages = () => {
    dispatch(deleteUserMessages(currentChatUser._id));
  };

  const onToggleArchive = () => {
    dispatch(toggleArchiveContact(currentChatUser._id));
  };

  return (
    <>
      <UserHead
        chatUserDetails={currentChatUser || chatUserDetails}
        pinnedTabs={pinnedTabs}
        onOpenUserDetails={onOpenUserDetails}
        onDelete={onDeleteUserMessages}
        isChannel={isChannel}
        onToggleArchive={onToggleArchive}
      />
      <Conversation
        chatUserConversations={chatUserConversations}
        chatUserDetails={currentChatUser || chatUserDetails}
        onDelete={onDeleteMessage}
        onSetReplyData={onSetReplyData}
        isChannel={isChannel}
      />
      <ChatInputSection
        onSend={onSend}
        replyData={replyData}
        onSetReplyData={onSetReplyData}
        chatUserDetails={currentChatUser || chatUserDetails}
      />
    </>
  );
};

export default Index;
