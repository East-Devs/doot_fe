import React from "react";
import classnames from "classnames";
import  io  from "socket.io-client";

// hooks
import { useRedux } from "../../hooks/index";

// hooks
import { useConversationUserType } from "../../hooks/index";

// component
import Leftbar from "./Leftbar";
import ConversationUser from "./ConversationUser/index";
import UserProfileDetails from "./UserProfileDetails/index";
import Welcome from "./ConversationUser/Welcome";
import { setSocket } from "../../redux/actions";

interface IndexProps {}
const Index = (props: IndexProps) => {
  
  
  // global store
  const { useAppSelector,dispatch } = useRedux();
  
  //safyan
  const socketClient = React.useRef<SocketIOClient.Socket>();
  React.useEffect(() => {
    socketClient.current = io("ws://localhost:8000");
    if(socketClient.current){
      dispatch(setSocket(socketClient.current));
      // socketClient.current.on("getMessage", (data:{senderId:String,text:String}) => {
        // setArrivalMessage({
        //   sender: data.senderId,
        //   text: data.text,
        //   createdAt: Date.now(),
        // });
      // });
    }
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
