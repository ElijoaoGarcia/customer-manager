import React from "react";
import "../../assets/styles/home.css";
import { Customer } from "../../services/customer";
import { phoneNumberPipe } from "../../services/connect";

interface Props {
  onPress: (customer: Customer) => void;
  customer: Customer;
}

export default function CustomerItem({ onPress, customer }: Props) {
  const { name, lastName, phoneNumber } = customer;
  return (
    <button onClick={() => onPress(customer)} className="customerItemContainer">
      <h3 className="customerName">
        {name} {lastName}
      </h3>
      <h4>{phoneNumberPipe(phoneNumber)}</h4>
    </button>
  );
}
