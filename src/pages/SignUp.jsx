import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const SignUp = () => {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Wrong email format");
      return;
    }
    try {
      setLoading(true);
      const result = await signUp(email, password);

      if (result.success) {
        navigate("/signin");
        toast.success("Sign up successful");
        toast.info("Check your email to confirm your user account");
      } else {
        setError(result.error.message);
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailBlur = () => {
    setEmailError(!validateEmail(email) ? "Wrong email format" : "");
  };

  const passwordsMatch =
    password && confirmPassword && password === confirmPassword;

  return (
    <div className="mx-auto flex min-h-screen w-[40%] min-w-80 max-w-md flex-col justify-center gap-3">
      <h2 className="text-center text-2xl">Sign Up</h2>
      <p className="text-center">
        Already have an account?{" "}
        <Link
          to={"/signin"}
          className="text-blue-300 underline underline-offset-2"
        >
          Sign in!
        </Link>
      </p>
      <form onSubmit={handleSignUp}>
        <div className="flex flex-col gap-2">
          <input
            placeholder="Email"
            className={`mt-4 rounded-md p-3 outline-none dark:bg-slate-800 ${emailError ? "border-2 border-red-500" : ""}`}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            onBlur={handleEmailBlur}
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <input
            placeholder="Password"
            className="mt-4 rounded-md p-3 outline-none dark:bg-slate-800"
            type="password"
            onChange={(e) => setPasword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            className={`mt-4 rounded-md p-3 outline-none dark:bg-slate-800 ${
              confirmPassword && !passwordsMatch
                ? "border-2 border-red-500"
                : passwordsMatch
                  ? "border-2 border-green-500"
                  : ""
            }`}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || !passwordsMatch || emailError}
            className={`mt-4 w-full rounded-md bg-slate-600 p-2 ${loading || !passwordsMatch || emailError ? "cursor-not-allowed opacity-50" : "hover:bg-slate-700"}`}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
