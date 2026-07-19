import { Request, Response } from "express";

import {
  loginUser
} from "../services/auth.service";

import {
  generateToken
} from "../utils/generateToken";


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {

      res.status(400).json({
        success:false,
        message:
          "Email and password are required"
      });

      return;
    }


    const employee =
      await loginUser(
        email,
        password
      );


    const token =
      generateToken({
        id: employee._id.toString(),
        role: employee.role
      });


    res.status(200).json({

      success:true,

      message:"Login successful",

      token,

      user:{
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }

    });


  } catch(error) {


    res.status(401).json({

      success:false,

      message:
        error instanceof Error
        ? error.message
        : "Login failed"

    });

  }

};

export const logout = async (
  req:Request,
  res:Response
  )=>{


  res.status(200).json({

    success:true,

    message:
      "Logout successful. Remove token from client."

  });


};