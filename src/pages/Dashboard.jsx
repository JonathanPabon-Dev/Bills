import { useState } from "react";
import Header from "../components/Header";
import PaymentContainer from "../components/PaymentContainer";

const Dashboard = () => {
  const [paymentsVisible, setPaymentsVisible] = useState(false);
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="container mx-auto">
        <PaymentContainer />
      </main>
    </div>
  );
};

export default Dashboard;
