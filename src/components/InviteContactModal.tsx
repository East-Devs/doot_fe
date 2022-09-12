import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";

interface DataTypes {
  email: string | null;
  name: string | null;
  message: string | null;
}
interface InviteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvite: (data: any) => void;
}
const InviteContactModal = ({
  isOpen,
  onClose,
  onInvite,
}: InviteContactModalProps) => {
  /*
  data input handeling
  */
  const [data, setData] = useState<DataTypes>({
    email: null,
    name: null,
    message: null,
  });
  useEffect(() => {
    setData({
      email: null,
      name: null,
      message: null,
    });
  }, []);

  const onChangeData = (field: "email", value: string) => {
    let modifiedData: DataTypes = { ...data };
    if (value === "") {
      modifiedData[field] = null;
    } else {
      modifiedData[field] = value;
    }
    setData(modifiedData);
  };

  /*
  validation
  */
  const [valid, setValid] = useState<boolean>(false);
  useEffect(() => {
    if (data.email !== null) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [data]);
  return (
    <Modal isOpen={isOpen} toggle={onClose} tabIndex={-1} centered scrollable>
      <ModalHeader className="modal-title-custom" toggle={onClose}>
        Add Contact
      </ModalHeader>
      <ModalBody className="p-4">
        <Form>
          <div className="mb-3">
            <Label htmlFor="AddContactModalemail-input" className="form-label">
              Email
            </Label>
            <Input
              type="email"
              className="form-control"
              id="AddContactModalemail-input"
              placeholder="Enter Email"
              value={data["email"] || ""}
              onChange={(e: any) => {
                onChangeData("email", e.target.value);
              }}
            />
          </div>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="link" className="btn" onClick={onClose}>
          Close
        </Button>
        <Button
          type="button"
          color="primary"
          disabled={!valid}
          onClick={() => onInvite(data)}
        >
          Add
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default InviteContactModal;
