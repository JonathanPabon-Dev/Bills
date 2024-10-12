import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentContainer from "./components/PaymentContainer";
import Page404 from "./components/Page404";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <BrowserRouter basename="/Bills-bck">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="list" element={<PaymentContainer />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default App;
