
import React, { useState, ChangeEvent, FormEvent } from "react";
import "../assets/styles/addCustomer.css";
import NavComponent from "./navComponent";
import { Customer } from "../services/customer";
import AddressService, { Address } from "../services/address";

const service = new AddressService();

interface Props {
  isVisible: boolean;
  customer: Customer;
  onClose: () => void;
}

export default function AddCustomer({ isVisible, onClose, customer }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [alias, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressReference, setAddressReference] = useState("");

  const onChangeInputText = (input: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = input.target;

    if (name === "alias") {
      return setName(value.toLowerCase());
    }

    if (name === "street") {
      return setStreet(value.toLowerCase());
    }

    if (name === "city") {
      return setCity(value.toLowerCase());
    }

    if (name === "addressLine1") {
      return setAddressLine1(value.toLowerCase());
    }

    if (name === "addressLine2") {
      return setAddressLine2(value.toLowerCase());
    }

    return setAddressReference(value);
  };

  const onSubmit = async () => {
    if (!alias || !street || !city || !addressLine1) {
      return alert("All fields are required");
    }

    setIsLoading(true);
    const create = await service.create(customer.uid, {
      alias,
      street,
      city,
      addressLine1,
      addressLine2,
      addressReference,
      uid: customer.uid,
      id: "",
    });
    setIsLoading(false);

    if (create === "missingValue") {
      return alert("please check the fields");
    }

    if (create === "systemError") {
      return alert("something went wrong, please try in a few minutes");
    }

    alert("address created");
    onClose();
  };

  if (!isVisible) {
    return <div></div>;
  }

  return (
    <div id="AddCustomer">
      <NavComponent title="add Address" onPressBack={onClose} />

      <div className="addContent">
        <input
          type="text"
          name="alias"
          onChange={onChangeInputText}
          value={alias}
          className="input"
          placeholder="Alias"
          required
        />
        <input
          type="text"
          name="street"
          onChange={onChangeInputText}
          className="input"
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="city"
          onChange={onChangeInputText}
          className="input"
          placeholder="City"
          required
        />
        <input
          type="text"
          name="addressLine1"
          onChange={onChangeInputText}
          className="input"
          placeholder="Address line 1"
          required
        />
        <input
          type="text"
          name="addressLine2"
          onChange={onChangeInputText}
          className="input"
          placeholder="Address line 2"
          required
        />
        <input
          type="text"
          name="addressReference"
          onChange={onChangeInputText}
          className="input"
          placeholder="Address reference"
          required
        />
      </div>

      <button className="footerButton" onClick={onSubmit}>
        {isLoading ? "creating" : "create"}
      </button>
    </div>
  );
}
