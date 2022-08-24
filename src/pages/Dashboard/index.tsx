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
import { setChatUserConversation, setSocket, setStreamInfo } from "../../redux/actions";
import { SocketContext } from "../../context";
import VideoCallAlert from "../../components/VideoCallAlert";

interface IndexProps {}
const Index = (props: IndexProps) => {
  
  
  // global store
  const { useAppSelector,dispatch } = useRedux();
  const {userProfile} = useProfile()


  const {  callAccepted, myVideo, userVideo, callEnded, stream, setStream, call, leaveCall,socket } = useContext(SocketContext);

  React.useEffect(() => {
    //socket.io
    if(socket){
      dispatch(setSocket(socket));
      // debugger;
      socket.emit("addUser", userProfile._id)
      socket.on("getMessage", (data:{sender: string,text: string}) => {
        // debugger;
        dispatch(setChatUserConversation(data))
      });
    }

    // //simple-peer
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     console.log(currentStream);
    //     // myVideo.current = currentStream;
    //     // dispatch(setStreamInfo(myVideo.current))
    //   });
    //   socketClient.current.on("callUser", ({ from, name: callerName, signal }:any) => {
    //     dispatch(setStreamInfo({isReceivingCall: true, from, name: callerName, signal}))
		// });
  }, []);

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));

  const { isChannel } = useConversationUserType();

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

        <VideoCallAlert isOpen={call.isReceivingCall } onClose={onClose}/>
      </div>
    </>
  );
};

export default Index;
