import React, { useState } from "react";
import { Customer } from "../services/customer";
import "../assets/styles/home.css";
import CustomerItem from "./home/customerItem";
import { replaceSpecialChars } from "../services/connect";

interface Props {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  isLoading: boolean;
}

export default function Home({
  onSelectCustomer,
  customers,
  isLoading,
}: Props) {
  const [search, setSearch] = useState("");

  const filter = ({ name, lastName, phoneNumber }: Customer) => {
    if (replaceSpecialChars(name).match(search)) {
      return true;
    }

    if (replaceSpecialChars(lastName).match(search)) {
      return true;
    }

    if (phoneNumber.match(search)) {
      return true;
    }

    return false;
  };

  return (
    <div id="HomeContainer">
      <input
        placeholder="search..."
        className="input"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="homeContent">
        {isLoading && (
          <div
            style={{
              width: "100%",
              height: 70,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        )}

        {!isLoading && !customers.length && (
          <div
            style={{
              width: "100%",
              height: 70,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            There isn't any customer yet.
          </div>
        )}

        {!isLoading &&
          customers.length &&
          customers
            .filter(filter)
            .map((customer, index) => (
              <CustomerItem
                key={index}
                customer={customer}
                onPress={onSelectCustomer}
              />
            ))}
      </div>
    </div>
  );
}
