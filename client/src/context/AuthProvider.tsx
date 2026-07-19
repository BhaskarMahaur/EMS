import {
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  jwtDecode,
} from "jwt-decode";

import {
  AuthContext,
} from "./AuthContext";

import type {
  User,
} from "./AuthContext";


interface JwtPayload {
  id: string;
  role: string;
  exp?: number;
}


interface Props {
  children: ReactNode;
}


export function AuthProvider({
  children,
}: Props) {


  const [token, setToken] =
    useState<string | null>(
      () =>
        localStorage.getItem("token")
    );



  const user =
    useMemo<User | null>(() => {


      if (!token) {
        return null;
      }



      try {


        const decoded =
          jwtDecode<JwtPayload>(
            token
          );



        return {

          id: decoded.id,

          role: decoded.role,

        };


      } catch {


        localStorage.removeItem(
          "token"
        );


        return null;

      }


    }, [token]);




  const login = (
    newToken:string
  ) => {


    localStorage.setItem(
      "token",
      newToken
    );


    setToken(newToken);

  };




  const logout = () => {


    localStorage.removeItem(
      "token"
    );


    setToken(null);

  };




  return (

    <AuthContext.Provider

      value={{

        token,

        user,

        isAuthenticated:
          Boolean(user),

        login,

        logout,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

}