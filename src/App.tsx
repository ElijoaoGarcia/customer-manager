import React, { useLayoutEffect, useState } from "react";
import "./assets/styles/App.css";
import CustomerScreen from "./components/customer";
import Home from "./components/home";
import { Customer as ICustomer } from "./services/customer";
import CustomerService from "./services/customer";
import AddCustomer from "./components/addCustomer";
import NavComponent from "./components/navComponent";

const customerService = new CustomerService();
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [customerSelected, setCustomerSelected] = useState<ICustomer>({
    name: "",
    lastName: "",
    uid: "",
    phoneNumber: "",
  });

  useLayoutEffect(() => {
    setIsLoading(true);
    customerService.getOb((snap) => {
      if (snap.empty) {
        setIsLoading(false);
        return;
      }

      const data: any = snap.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
      const customerToSet = data as ICustomer[];
      console.log(customerToSet);
      setCustomers(customerToSet);
      setIsLoading(false);
    });
  }, []);

  const onSelectCustomer = (customer: ICustomer) => {
    setCustomerSelected(customer);
    setShowCustomer(true);
  };

  return (
    <div id="App">
      <NavComponent
        title="customer manager"
        onPressAdd={() => setShowAddCustomer(true)}
      />
      <Home
        onSelectCustomer={onSelectCustomer}
        customers={customers}
        isLoading={isLoading}
      />

      <CustomerScreen
        isVisible={showCustomer}
        customer={customerSelected}
        onClose={() => {
          setShowCustomer(false);
          setCustomerSelected({
            name: "",
            lastName: "",
            uid: "",
            phoneNumber: "",
          });
        }}
      />

      <AddCustomer
        isVisible={showAddCustomer}
        onClose={() => setShowAddCustomer(false)}
      />
    </div>
  );
}

export default App;
