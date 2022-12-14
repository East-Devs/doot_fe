import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

//images
import { getProfileImage } from "../constants";
import { SocketContext } from "../context";
import { useRedux } from "../hooks";
interface AudioCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
}

const AudioCallModal = ({ isOpen, onClose, user }: AudioCallModalProps) => {
  const {  callAccepted, myVideo, userVideo, callEnded, stream, setStream, callUser, updateAudioStatus } = useContext(SocketContext);

  const { useAppSelector,dispatch } = useRedux();
  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));
  const [audioOff, setAudioOff] = useState(false);

  const handleAudioOff = () => {
    updateAudioStatus(audioOff);
    setAudioOff(!audioOff);
  }

  const [soundOff, setSoundOff] = useState(false);

  const handleSoundOff = () => {
    setSoundOff(!audioOff);

  }

  useEffect(() => {
    if(!isOpen) return;
      navigator.mediaDevices
      .getUserMedia({ audio: true })
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
        callUser(selectedChat, true);
      })

  }, [isOpen])



  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      tabIndex={-1}
      centered
      className="audiocallModal"
      contentClassName="shadow-lg border-0"
    >
      <ModalBody className="p-0">
        <div className="text-center p-4 pb-0">
          <div className="avatar-xl mx-auto mb-4">
            <img
              src={getProfileImage(user?.profileImage)}
              alt=""
              className="img-thumbnail rounded-circle"
              crossOrigin="anonymous"
            />

            {callAccepted && !callEnded && (<audio playsInline autoPlay muted={soundOff} ref={userVideo} />)}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-4">
            <div className="avatar-md h-auto">
              <Button
                type="button"
                color="light"
                className="avatar-sm rounded-circle"
                onClick={handleAudioOff}
              >
                <span className="avatar-title bg-transparent text-muted font-size-20">
                  <i className={`bx bx-microphone${audioOff ? '-off': ''}`}></i>
                </span>
              </Button>
              <h5 className="font-size-11 text-uppercase text-muted mt-2">
                Mute
              </h5>
            </div>
            <div className="avatar-md h-auto">
              <Button
                type="button"
                color="light"
                className=" avatar-sm rounded-circle"
                onClick={handleSoundOff}
              >
                <span className="avatar-title bg-transparent text-muted font-size-20">
                  <i className={`bx bx-volume${soundOff ? '': '-full'}`}></i>
                </span>
              </Button>
              <h5 className="font-size-11 text-uppercase text-muted mt-2">
                Speaker
              </h5>
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              className="btn btn-danger avatar-md call-close-btn rounded-circle"
              color="danger"
              onClick={onClose}
            >
              <span className="avatar-title bg-transparent font-size-24">
                <i className="mdi mdi-phone-hangup"></i>
              </span>
            </Button>
          </div>
        </div>

        <div className="p-4 bg-soft-primary mt-n4">
          <div className="mt-4 text-center">
            <h5 className="font-size-18 mb-0 text-truncate">
            {`Calling ${user?.fullname}`}
            </h5>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AudioCallModal;
