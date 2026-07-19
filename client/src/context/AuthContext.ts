import { createContext } from "react";
import {
  useContext,
} from "react";


export interface User {
  id: string;
  role: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );
  
export function useAuth(){

  const context =
    useContext(
      AuthContext
    );


  if(!context){

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;

}