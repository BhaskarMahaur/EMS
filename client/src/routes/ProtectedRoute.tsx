import {
  Navigate,
  Outlet,
} from "react-router-dom";
import type {
  ReactNode,
} from "react";

import {
  useAuth,
} from "../context/AuthContext";



interface Props {
  roles?: string[];
  children?: ReactNode;
}

function ProtectedRoute({roles,}: Props) {
  const {
    user,
  } = useAuth();

console.log('propro', user, roles);

  // Not logged in

  if(!user){

    return (

      <Navigate

        to="/login"

        replace

      />

    );

  }




  // Role check

  if(

    roles &&

    !roles.includes(
      user.role
    )

  ){

    return (

      <Navigate

        to="/dashboard"

        replace

      />

    );

  }




  return (

    <Outlet />

  );

}



export default ProtectedRoute;