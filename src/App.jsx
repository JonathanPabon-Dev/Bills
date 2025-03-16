import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen w-full flex-col bg-slate-200 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <ToastContainer theme="dark" />
      </div>
    </AuthProvider>
  );
};

export default App;
