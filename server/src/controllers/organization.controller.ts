import {
  Response
} from "express";

import {
  AuthRequest
} from "../middleware/auth.middleware";


import {

  assignManager,

  getReportees,

  getOrganizationTree

} from "../services/organization.service";



// Assign manager

export const updateManager = async(
  req:AuthRequest,
  res:Response
)=>{


  try{


    const employee =
      await assignManager(

        req.params.id as string,

        req.body.managerId

      );


    res.json({

      success:true,

      employee

    });


  }catch(error){


    res.status(400).json({

      success:false,

      message:
      error instanceof Error
      ? error.message
      : "Failed"

    });

  }

};



// Direct reports

export const reportees = async(
  req:AuthRequest,
  res:Response
)=>{


  const employees =
    await getReportees(
      req.params.id as string
    );


  res.json({

    success:true,

    employees

  });

};



// Tree

export const organizationTree =
async(
 req:AuthRequest,
 res:Response
)=>{


 const tree =
   await getOrganizationTree();


 res.json({

  success:true,

  tree

 });

};