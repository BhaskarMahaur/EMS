import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside
      className="
      w-64
      min-h-screen
      bg-gray-900
      text-white
      p-5
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        EMS
      </h1>

      <nav
        className="
        space-y-3
        "
      >
        <NavLink
          to="/dashboard"
          className="
          block
          p-3
          rounded
          hover:bg-gray-700
          "
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className="
          block
          p-3
          rounded
          hover:bg-gray-700
          "
        >
          Employees
        </NavLink>

        <NavLink
          to="/organization"
          className="
          block
          p-3
          rounded
          hover:bg-gray-700
          "
        >
          Organization
        </NavLink>
      </nav>

      <div
        className="
        mt-10
        text-sm
        text-gray-400
        "
      >
        Role:
        <br />
        {user?.role}
      </div>
    </aside>
  );
}

export default Sidebar;
