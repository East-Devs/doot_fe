import avatar1 from "../assets/images/users/avatar-1.jpg";
import avatar2 from "../assets/images/users/avatar-2.jpg";
import avatar3 from "../assets/images/users/avatar-3.jpg";
import avatar4 from "../assets/images/users/avatar-4.jpg";
import avatar5 from "../assets/images/users/avatar-5.jpg";
import avatar6 from "../assets/images/users/avatar-6.jpg";
import avatar7 from "../assets/images/users/avatar-7.jpg";
import avatar8 from "../assets/images/users/avatar-8.jpg";
import avatar9 from "../assets/images/users/avatar-9.jpg";
import avatar10 from "../assets/images/users/avatar-10.jpg";
import img1 from "../assets/images/small/img-1.jpg";
import img2 from "../assets/images/small/img-2.jpg";
import img3 from "../assets/images/small/img-3.jpg";
import img4 from "../assets/images/small/img-4.jpg";

// interfaces
import { ChannelTypes } from "./chat";
import { MediaTypes, AttachedfileTypes } from "./myProfile";
import { STATUS_TYPES } from "../constants";
export interface ContactTypes {
  _id: string | number;
  firstName: string;
  lastName: string;
  fullname?: string | null | undefined;
  profileImage?: any;
  email: string;
}
let contacts: ContactTypes[] = [
  {
    _id: "614ecab426f59ce2863e106e",
    firstName: "Sanford",
    lastName: "Phelps",
    email: "adc@123.com",
  },

  {
    _id: "614ecab463eda97c2df4fe9a",
    firstName: "Norris",
    lastName: "Decker",
    profileImage: avatar2,
    email: "adc@123.com",
  },

  {
    _id: "614ecab463eda97c2df4fe93",
    firstName: "Fake",
    lastName: "Decker",
    profileImage: avatar3,
    email: "adc@123.com",
  },
  {
    _id: "614ecab463eda97c2df4fe94",
    firstName: "Fake",
    lastName: "Boy",
    profileImage: avatar3,
    email: "adc@123.com",
  },
];

const onChangeContacts = (newData: Array<ContactTypes>) => {
  contacts = newData;
};
export { contacts, onChangeContacts };
