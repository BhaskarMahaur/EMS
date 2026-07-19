import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { logout, user } = useAuth();
  // console.log('nanananan',user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <header
      className="
      h-16
      bg-white
      shadow
      flex
      items-center
      justify-between
      px-6
      "
    >
      <h2
        className="
        text-xl
        font-semibold
        "
      >
        Employee Management System
      </h2>

      <div
        className="
        flex
        items-center
        gap-4
        "
      >
        <span>{user?.role} </span>

        <button
          onClick={handleLogout}
          className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
