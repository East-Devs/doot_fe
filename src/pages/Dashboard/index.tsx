import React from "react";
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

interface IndexProps {}
const Index = (props: IndexProps) => {
  
  
  // global store
  const { useAppSelector,dispatch } = useRedux();
  const {userProfile} = useProfile()
  
  //safyan
  const socketClient = React.useRef<SocketIOClient.Socket>();
	const myVideo = React.useRef<MediaStream>();

  React.useEffect(() => {
    //socket.io
    socketClient.current = io("ws://localhost:8000");
    if(socketClient.current){
      dispatch(setSocket(socketClient.current));
      // debugger;
      socketClient.current.emit("addUser", userProfile._id)
      socketClient.current.on("getMessage", (data:{sender: string,text: string}) => {
        // debugger;
        dispatch(setChatUserConversation(data))
      });
    }

    //simple-peer
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        debugger;
        console.log(currentStream);
        // myVideo.current = currentStream;
        // dispatch(setStreamInfo(myVideo.current))
      });
      socketClient.current.on("callUser", ({ from, name: callerName, signal }:any) => {
        dispatch(setStreamInfo({isReceivingCall: true, from, name: callerName, signal}))
		});
  }, []);

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));

  const { isChannel } = useConversationUserType();

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
      </div>
    </>
  );
};

export default Index;
