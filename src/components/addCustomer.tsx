import React, { useState, ChangeEvent } from "react";
import "../assets/styles/addCustomer.css";
import NavComponent from "./navComponent";
import CustomerService from "../services/customer";

const service = new CustomerService();

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export default function AddAddress({ isVisible, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const replaceText = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  const onChangeInputText = (input: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;

    if (name === "name") {
      return setName(value.toLowerCase());
    }

    if (name === "lastName") {
      return setLastName(value.toLowerCase());
    }

    return setPhoneNumber(replaceText(value));
  };

  const onSubmit = async () => {
    if (!name || !lastName || !phoneNumber) {
      console.log(name, lastName, phoneNumber);
      return alert("All fields are required");
    }

    const isPhoneNumberOK = await service.isPhoneNumberAvailable(phoneNumber);
    if (isPhoneNumberOK !== "ok") {
      return alert("phone number unavailable");
    }

    setIsLoading(true);
    const create = await service.create({
      name,
      lastName,
      phoneNumber,
      uid: "",
    });
    setIsLoading(false);

    if (create === "missingValue") {
      return alert("please check the fields");
    }

    if (create === "systemError") {
      return alert("something went wrong, please try in a few minutes");
    }

    alert("customer created");
    onClose();
  };

  if (!isVisible) {
    return <div></div>;
  }

  return (
    <div id="AddCustomer">
      <NavComponent title="add customer" onPressBack={onClose} />

      <div className="addContent">
        <input
          type="text"
          name="name"
          onChange={onChangeInputText}
          className="input"
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="lastName"
          onChange={onChangeInputText}
          className="input"
          placeholder="Last Name"
          required
        />
        <input
          type="number"
          name="phoneNumber"
          onChange={onChangeInputText}
          className="input"
          placeholder="Phone Number"
          required
        />
      </div>

      <button className="footerButton" onClick={onSubmit}>
        {isLoading ? "creating" : "create"}
      </button>
    </div>
  );
}

