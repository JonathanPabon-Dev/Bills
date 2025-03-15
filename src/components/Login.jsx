import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log("Login data: ", { email, password });
  };

  return (
    <div className="rounded-lg bg-slate-50 p-8 shadow-md dark:bg-slate-800">
      <h1 className="mb-8 w-full text-center text-4xl font-bold uppercase">
        Sign In
      </h1>
      <form onSubmit={handleSubmitLogin}>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-slate-700 shadow focus:outline-none dark:bg-slate-100"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <label className="mb-2 block text-sm font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="focus:shadow-outline w-full rounded border px-3 py-2 text-slate-700 shadow focus:outline-none dark:bg-slate-100"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="focus:shadow-outline rounded bg-indigo-500 px-4 py-2 font-bold text-slate-50 hover:bg-indigo-700 focus:outline-none"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
