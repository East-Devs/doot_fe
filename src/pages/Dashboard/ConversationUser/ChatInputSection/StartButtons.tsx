import React, { useState } from "react";

import { Button, UncontrolledTooltip, PopoverBody, Popover, Input, Label } from "reactstrap";

// emoji picker
import Picker from "emoji-picker-react";

interface StartButtonsProps {
  onToggle: () => void;
  onChange: (value: string) => void;
  onSelectImages: (images: Array<any>) => void;
  onSelectFiles: (files: Array<any>) => void;
  text: null | string;
}
const StartButtons = ({ onToggle, onChange, text, onSelectFiles, onSelectImages }: StartButtonsProps) => {
  /*
  emoji handeling
  */
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleEmoji = () => {
    setIsOpen(!isOpen);
  };

  const onEmojiClick = (event: any, emojiObject: any) => {
    onChange(text + emojiObject.emoji);
  };

  const onSelect = (e: any) => {
    const files = [...e.target.files];
    if (files) {
      // const src = URL.createObjectURL(files[0]);
      onSelectImages(files);
      onToggle();
    }
  };

  const onSelectF = (e: any) => {
    const files = [...e.target.files];
    if (files) {
      onSelectFiles(files);
      onToggle();
    }
  };


  return (
    <div className="chat-input-links me-md-2">
      <div className="links-list-item" id="more-menu">
        <div>
          <Input
            id="attachedfile-input"
            type="file"
            className="d-none"
            onChange={(e: any) => onSelectF(e)}
          />
          <Label
            htmlFor="attachedfile-input"
            className="avatar-sm mx-auto"
          >
            <span className="avatar-title font-size-18 rounded-circle">
              <i className="bx bx-paperclip"></i>
            </span>
          </Label>
        </div>
        <UncontrolledTooltip target="more-menu" placement="top">
        Attach
        </UncontrolledTooltip>
      </div> 
      <div className="links-list-item" id="emoji">
        <Button
          type="button"
          className="btn btn-link text-decoration-none btn-lg waves-effect emoji-btn"
          id="emoji-btn"
          color="none"
          onClick={onToggleEmoji}
        >
          <i className="bx bx-smile align-middle"></i>
        </Button>
      </div>
      <UncontrolledTooltip target="emoji" placement="top">
        Emoji
      </UncontrolledTooltip>
      <Popover
        trigger="focus"
        placement="bottom"
        target="emoji-btn"
        isOpen={isOpen}
        toggle={onToggleEmoji}
      >
        <PopoverBody className="p-0">
          <div>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default StartButtons;
