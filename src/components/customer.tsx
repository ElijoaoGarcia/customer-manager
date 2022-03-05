import React, { useState, Fragment, useEffect } from "react";
import { Customer } from "../services/customer";
import AddAdress from "./addAddress";
import EditAddress from "./editAddress";
import "../assets/styles/customer.css";
import NavComponent from "./navComponent";
import AddressService, { Address } from "../services/address";
import CustomerService from "../services/customer";
import AddressComponent from "./customer/addressComponent";

const service = new AddressService();
const customerService = new CustomerService();

interface Props {
  isVisible: boolean;
  customer: Customer;
  onClose: () => void;
}

export default function CustomerScreen({
  isVisible,
  customer,
  onClose,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [onRefrehs, setOnRefrehs] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setAddress([]);
    service.getOb(customer.uid, (snap) => {
      if (snap.empty) {
        setIsLoading(false);
        return;
      }

      const dataSnap: any = snap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const toSet = dataSnap as Address[];
      setAddress(toSet);
      setIsLoading(false);
    });
  }, [showAddAddress, isVisible, onRefrehs]);

  const onCloseAddAddress = () => {
    setShowAddAddress(false);
  };

  const onDeleteCustomer = async () => {
    if (
      window.confirm("you are going to delete this customer, are you sure?")
    ) {
      setIsLoading(true);
      const deleteCustomer = await customerService.deleteById(customer.uid);
      setIsLoading(true);
      if (
        deleteCustomer === "missingValue" ||
        deleteCustomer === "systemError"
      ) {
        return alert("Something went wrong, try it in a few minutes");
      }

      alert("Customer deleted.");

      onClose();
    }
  };

  const onDeleteAddress = async (id: string) => {
    if (
      window.confirm("you are going to delete this customer, are you sure?")
    ) {
      setIsLoading(true);
      const deleteAddress = await service.deleteById(id);
      setIsLoading(false);
      if (deleteAddress === "missingValue" || deleteAddress === "systemError") {
        return alert("Something went wrong, try it in a few minutes");
      }
      setOnRefrehs(onRefrehs + 1);
      alert("Address deleted.");
    }
  };

  if (!isVisible) {
    return <div></div>;
  }
  return (
    <Fragment>
      <div id="Customer">
        <NavComponent
          title={`${customer.name} ${customer.lastName}`}
          onPressAddAddress={() => setShowAddAddress(true)}
          onPressBack={onClose}
          onPressDelete={
            isLoading ? false : address.length ? false : onDeleteCustomer
          }
        />

        <div className="addressContent">
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

          {!isLoading && !address.length && (
            <div
              style={{
                width: "100%",
                height: 70,
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              There isn't any address yet.
            </div>
          )}

          {!isLoading &&
            address.map((add, index) => (
              <AddressComponent
                key={index}
                onPress={onDeleteAddress}
                address={add}
              />
            ))}
        </div>
      </div>
      <EditAddress isVisible={showEditAddress} />
      <AddAdress
        isVisible={showAddAddress}
        customer={customer}
        onClose={onCloseAddAddress}
      />
    </Fragment>
  );
}
