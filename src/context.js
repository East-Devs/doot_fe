import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:8000");
// const socket = io("https://warm-wildwood-81069.herokuapp.com");

const SocketProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef({});
  const userVideo = useRef({});
  const connectionRef = useRef();

  useEffect(() => {
    socket.on("me", id => {
      console.log("My Id", id);
      setMe(id);
    });

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log(`Rec call from ${callerName}`);
      setCall({
        isReceivingCall: true,
        from,
        name: callerName,
        signal: signal,
      });
    });
  }, []);

  const answerCall = () => {
    console.log("Before accept stream", myVideo.current.srcObject);
    setCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myVideo.current.srcObject,
    });

    peer.on("signal", data => {
      console.log("Call Rec Signal", data, call.from);
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", currentStream => {
      console.log("Caller Stream", currentStream);
      userVideo.current.srcObject = currentStream;
    });

    peer.on("track", (track, stream) => {
      console.log("Caller track", stream);
      userVideo.current.srcObject = stream;
    });

    console.log("The oringal signal rec", call.signal);
    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = id => {
    console.log("Before call stream", myVideo.current.srcObject);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myVideo.current.srcObject,
    });

    peer.on("signal", data => {
      console.log("Calling User Signal: ", id, call.from);
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
      });
    });

    peer.on("stream", currentStream => {
      console.log("Other User Stream", currentStream);
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal }) => {
      console.log("Accepted the call", signal);
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    setCall({});

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setStream,
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
