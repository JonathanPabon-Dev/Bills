import { useNavigate } from "react-router-dom";
import OnlinePaymentsImg from "../assets/OnlinePaymentsImg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-center text-5xl font-bold uppercase">
          Bills Payment Report
        </h1>
        <div className="my-10 w-[80%] max-w-[500px]">
          <OnlinePaymentsImg />
        </div>
        <div className="flex gap-10">
          <button
            type="button"
            className="rounded-lg border-2 border-indigo-500 px-3 py-2 font-semibold hover:border-indigo-700 hover:bg-indigo-700 hover:text-slate-200"
            onClick={() => {
              navigate("login");
            }}
          >
            Login
          </button>
          <button
            type="button"
            className="rounded-lg border-2 border-indigo-500 bg-indigo-500 px-3 py-2 font-semibold text-slate-200 hover:border-indigo-700 hover:bg-indigo-700"
            onClick={() => {
              navigate("register");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
