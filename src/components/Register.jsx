import { useState } from 'react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log("Register data: ", {email, password, confirmPassword});
  };

  return (
    <div className="bg-slate-50 shadow-md rounded-lg p-8 dark:bg-slate-800">
      <h1 className="w-full text-center text-4xl font-bold uppercase mb-8">Sign Up</h1>
      <form onSubmit={handleSubmitRegister}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline dark:bg-slate-100"
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline dark:bg-slate-100"
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-12">
          <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline dark:bg-slate-100"
            id="confirmPassword"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-slate-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};
  
export default Register;
  