import React, { useContext, useEffect } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

// interface
import { CallItem } from "../data/calls";

//images
import imagePlaceholder from "../assets/images/users/profile-placeholder.png";
import { SocketContext } from "../context";
import { useRedux } from "../hooks";

interface VideoCallModalProps {
  user: CallItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoCallModal = ({ isOpen, onClose, user }: VideoCallModalProps) => {
  const {  callAccepted, myVideo, userVideo, callEnded, stream, setStream, callUser, call } = useContext(SocketContext);

  const { useAppSelector,dispatch } = useRedux();
  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));

  // useEffect(() => {
  //   console.log('Calling Status', callAccepted, callEnded, userVideo);

  // }, [callAccepted, callEnded])

  useEffect(() => {
    if(isOpen)
    {
      let cStream;
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true})
      .then(currentStream => {
        console.log('Caller Stream', myVideo, currentStream);
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      })
      .catch(() => {
        navigator.mediaDevices
        .getUserMedia({ video: {
          deviceId: "XeU8qZBqaTclK8IxIlvGM5xaAgq4nszjOdwQOqE8Svs="
        }})
        .then(currentStream => {
          console.log('Caller Stream', myVideo, currentStream);
          setStream(currentStream);
          myVideo.current.srcObject = currentStream;
        })
        .catch((err) => {
          alert(`Failed to get any stmrea ${err}`);
        })
      }).finally(()=>{
        callUser(selectedChat);
      })
    }
  }, [isOpen])

 
  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      tabIndex={-1}
      centered
      className="videocallModal"
      contentClassName="shadow-lg border-0"
    >
      <ModalBody className="p-0">
        {/* <img
          src={user && user.profileImage ? user.profileImage : imagePlaceholder}
          alt=""
          className="videocallModal-bg"
        /> */}
        {(!(callAccepted && !callEnded) && stream) && (
        <video playsInline muted ref={myVideo} autoPlay className="videocallModal-bg" />
           )}
      {callAccepted && !callEnded && (
        <video playsInline ref={userVideo} autoPlay className="videocallModal-bg" />
        )}
        <div className="position-absolute start-0 end-0 bottom-0">
          <div className="text-center">
            <div className="d-flex justify-content-center align-items-center text-center">
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    <i className="bx bx-microphone-off"></i>
                  </span>
                </Button>
              </div>
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    <i className="bx bx-volume-full"></i>
                  </span>
                </Button>
              </div>
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    <i className="bx bx-video-off"></i>
                  </span>
                </Button>
              </div>
              <div className="avatar-md h-auto">
                <Button
                  color="light"
                  type="button"
                  className="avatar-sm rounded-circle"
                >
                  <span className="avatar-title bg-transparent text-muted font-size-20">
                    <i className="bx bx-refresh"></i>
                  </span>
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <Button
                color="danger"
                type="button"
                className="avatar-md call-close-btn rounded-circle"
                onClick={onClose}
              >
                <span className="avatar-title bg-transparent font-size-24">
                  <i className="mdi mdi-phone-hangup"></i>
                </span>
              </Button>
            </div>
          </div>

          <div className="p-4 bg-primary mt-n4">
            <div className="text-white mt-4 text-center">
              <h5 className="font-size-18 text-truncate mb-0 text-white">
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </h5>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VideoCallModal;
