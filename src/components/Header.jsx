import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Header = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const result = await signOut();

      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <header className="flex bg-slate-700 px-4 py-2 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div>Menu</div>
          <div className="flex items-center gap-5">
            <p className="font-semibold text-slate-100">
              {session?.user?.email}
            </p>
            <button
              onClick={handleSignOut}
              className="size-7 rounded border border-red-500 font-bold text-white hover:border-red-600 hover:bg-red-600"
              title="Sign Out"
            >
              <FontAwesomeIcon icon={faSignOut} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
