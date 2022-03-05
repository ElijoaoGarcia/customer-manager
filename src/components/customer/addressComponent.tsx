import React from "react";
import "../../assets/styles/customer.css";
import { Address } from "../../services/address";
import { BsTrashFill } from "react-icons/bs";

interface Props {
  onPress: (id: string) => void;
  address: Address;
}

export default function AddressItem({ onPress, address }: Props) {
  const { addressLine1, addressLine2, alias, city, street, addressReference } =
    address;
  return (
    <div className="addressItemContainer">
      <h3 className="customerName">{alias}</h3>
      <h4>{city}</h4>
      <h4>{street}</h4>
      <h4>{addressLine1}</h4>
      <h4>{addressLine2}</h4>
      <h4>{addressReference}</h4>

      <button
        onClick={() => onPress(address.id)}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border:'none',
          background:'transparent'
        }}
      >
        <BsTrashFill size={25} color="#dc3545" />
      </button>
    </div>
  );
}
