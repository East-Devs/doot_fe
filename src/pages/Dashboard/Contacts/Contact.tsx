import React, { useState } from "react";
import classnames from "classnames";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//utils
import { DivideByKeyResultTypes } from "../../../utils";

// interfaaces
import { ContactTypes } from "../../../data/contacts";
import { getProfileImage } from "../../../constants";

interface ContactItemProps {
  contact: ContactTypes;
  onSelectChat: (id: string | number, isChannel?: boolean) => void;
}
const ContactItem = ({ contact, onSelectChat }: ContactItemProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const fullName = `${contact.fullname}`;
  const shortName = `${contact.fullname?.charAt(0)}`;
  const colors = [
    "bg-primary",
    "bg-danger",
    "bg-info",
    "bg-warning",
    "bg-secondary",
    "bg-pink",
    "bg-purple",
  ];
  const [color] = useState(Math.floor(Math.random() * colors.length));

  return (
    <li onClick={() => onSelectChat(contact._id)}>
      <div className="d-flex align-items-center">
        <div className="flex-shrink-0 me-2">
          <div className="avatar-xs">
            {contact.profileImage ? (
              <img
                src={getProfileImage(contact.profileImage)}
                alt=""
                className="img-fluid rounded-circle"
                crossOrigin="anonymous"
              />
            ) : (
              <span
                className={classnames(
                  "avatar-title",
                  "rounded-circle",
                  "font-size-10",
                  "text-uppercase",
                  colors[color]
                )}
              >
                {shortName}
              </span>
            )}
          </div>
        </div>
        <div className="flex-grow-1">
          <h5 className="font-size-14 m-0">{fullName}</h5>
        </div>
      </div>
    </li>
  );
};
interface CharacterItemProps {
  letterContacts: DivideByKeyResultTypes;
  index: number;
  onSelectChat: (id: string | number, isChannel?: boolean) => void;
}
const CharacterItem = ({
  letterContacts,
  index,
  onSelectChat,
}: CharacterItemProps) => {
  return (
    <div className={classnames({ "mt-3": index !== 0 })}>
      <div className="contact-list-title">{letterContacts.letter}</div>

      <ul className="list-unstyled contact-list">
        {(letterContacts.data || []).map((contact: any, key: number) => (
          <ContactItem
            contact={contact}
            key={key}
            onSelectChat={onSelectChat}
          />
        ))}
      </ul>
    </div>
  );
};

export default CharacterItem;
