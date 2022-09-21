import React, { useContext } from "react";
import classnames from "classnames";
import  io  from "socket.io-client";
import {SimplePeer as Peer} from 'simple-peer';
// hooks
import { useProfile, useRedux } from "../../hooks/index";

// hooks
import { useConversationUserType } from "../../hooks/index";

// component
import Leftbar from "./Leftbar";
import ConversationUser from "./ConversationUser/index";
import UserProfileDetails from "./UserProfileDetails/index";
import Welcome from "./ConversationUser/Welcome";
import { getChannels, getDirectMessages, setChatUserConversation, setSocket, setStreamInfo } from "../../redux/actions";
import { SocketContext } from "../../context";
import VideoCallModal from "../../components/VideoCallModal";
import VideoCallAlert from "../../components/VideoCallAlert";
import AudioCallAlert from "../../components/AudioCallAlert";

interface IndexProps {}
const Index = (props: IndexProps) => {
  
  
  // global store
  const { useAppSelector,dispatch } = useRedux();
  const {userProfile} = useProfile()


  const {  callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, leaveCall,socket } = useContext(SocketContext);

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));

  React.useEffect(() => {
    //socket.io
    if(socket){
      dispatch(setSocket(socket));
      socket.emit("addUser", userProfile._id)

      socket.on("newGroup", () => {
        dispatch(getChannels());
      });
    }

    return () => {
      socket.removeAllListeners('newGroup');
    }
  }, []);

  React.useEffect(() => {
    if(socket){
     socket.on("getMessage", (data: {sender: string,text: string}) => {
        
        if(data.sender == selectedChat)
          dispatch(setChatUserConversation(data))
        else
        {
          dispatch(getDirectMessages(userProfile._id));
        }
      });
    }

    return () => {
      socket.removeAllListeners('getMessage');
    }

  }, [selectedChat]);

 

  const { isChannel } = useConversationUserType();
  console.log('Is Channel', isChannel);

  const onClose = ()=> {
    leaveCall();
  }

  return (
    <>
      <Leftbar />

      <div
        className={classnames("user-chat", "w-100", "overflow-hidden", {
          "user-chat-show": selectedChat,
        })}
        id="user-chat"
      >
        <div className="user-chat-overlay" id="user-chat-overlay"></div>
        {selectedChat !== null ? (
          <div className="chat-content d-lg-flex">
            <div className="w-100 overflow-hidden position-relative">
              <ConversationUser isChannel={isChannel} />
            </div>
            <UserProfileDetails isChannel={isChannel} />
          </div>
        ) : (
          <Welcome />
        )}

        <VideoCallAlert user={userProfile} isOpen={call.isReceivingCall  && !call.isAudio } onClose={onClose}/>

        <AudioCallAlert user={userProfile} isOpen={call.isReceivingCall && call.isAudio } onClose={onClose}/>
      </div>
    </>
  );
};

export default Index;
