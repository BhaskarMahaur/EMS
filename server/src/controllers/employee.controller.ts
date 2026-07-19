import {
  Response
} from "express";

import {
  AuthRequest
} from "../middleware/auth.middleware";


import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "../services/employee.service";



// CREATE
export const addEmployee = async (
  req:AuthRequest,
  res:Response
)=>{

  try{

    const employee =
      await createEmployee(
        req.body
      );


    res.status(201).json({

      success:true,

      employee

    });


  }catch(error){

    res.status(400).json({

      success:false,

      message:
      error instanceof Error
      ? error.message
      : "Creation failed"

    });

  }

};



// GET ALL
export const getAllEmployees = async (
  req:AuthRequest,
  res:Response
  )=>{

    const data = await getEmployees(
      req.query
    );


    res.json({
      success:true,

      data

    });

};



// GET ONE
export const getSingleEmployee = async (
  req:AuthRequest,
  res:Response
)=>{

  try{

    const employee =
    await getEmployeeById(
        req.params.id as string
    );


    res.json({

      success:true,

      employee

    });


  }catch(error){

    res.status(404).json({

      success:false,

      message:"Employee not found"

    });

  }

};



// UPDATE
export const editEmployee = async (
  req:AuthRequest,
  res:Response
)=>{

  try{

    const employee =
      await updateEmployee(
        req.params.id as string,
        req.body
      );


    res.json({

      success:true,

      employee

    });


  }catch(error){

    res.status(400).json({

      success:false,

      message:"Update failed"

    });

  }

};



// DELETE
export const removeEmployee = async (
  req:AuthRequest,
  res:Response
)=>{

  try{

    await deleteEmployee(
      req.params.id as string,
    );


    res.json({

      success:true,

      message:
      "Employee deleted"

    });


  }catch(error){

    res.status(400).json({

      success:false,

      message:
      "Delete failed"

    });

  }

};