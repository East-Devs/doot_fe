import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";

//images
import { getProfileImage } from "../constants";
import { SocketContext } from "../context";
import { useRedux } from "../hooks";
interface AudioCallAlertProps {
  isOpen: boolean;
  onClose: () => void;
  user: any | null;
}

const AudioCallAlert = ({ isOpen, onClose, user }: AudioCallAlertProps) => {
  const {  callAccepted, myVideo, userVideo, callEnded, stream, setStream, callUser, updateAudioStatus, call, answerCall} = useContext(SocketContext);

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
      .catch((err) => {
          alert(`Failed to get any stmrea ${err}`);
      })

  }, [isOpen])

  const onAccept = () => {
    answerCall();
  }



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
              src={getProfileImage(call?.profileImage)}
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

          {call.isReceivingCall && callAccepted ? <div className="mt-4">
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
            :
            <div className="mt-4">
              <Button
                color="success"
                type="button"
                className="avatar-md call-close-btn rounded-circle"
                onClick={onAccept}
              >
                <span className="avatar-title bg-transparent font-size-24">
                  <i className="mdi mdi-phone-hangup"></i>
                </span>
              </Button>
            </div>

            }
        </div>

        <div className="p-4 bg-soft-primary mt-n4">
          <div className="mt-4 text-center">
            <h5 className="font-size-18 mb-0 text-truncate">
             {callAccepted? call.name : `${call.name} is calling`}
            </h5>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default AudioCallAlert;
