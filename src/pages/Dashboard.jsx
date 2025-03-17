import Header from "../components/Header";
import PaymentContainer from "../components/PaymentContainer";

const Dashboard = () => {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <main className="container mx-auto px-4">
        <PaymentContainer />
      </main>
    </div>
  );
};

export default Dashboard;
