import {
  Response
} from "express";


import {
  AuthRequest
} from "../middleware/auth.middleware";


import {
  getDashboardStats
} from "../services/dashboard.service";



export const dashboard =
async(
  req:AuthRequest,
  res:Response
)=>{


  try{


    const stats =
      await getDashboardStats();



    res.json({

      success:true,

      data:stats

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:
      "Dashboard data failed"

    });


  }

};