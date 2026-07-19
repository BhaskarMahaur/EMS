import { Router, Response } from "express";

import authRoutes from "./auth.routes";

import {
  protect,
  AuthRequest
} from "../middleware/auth.middleware";

import {
  authorize
} from "../middleware/role.middleware";

import employeeRoutes from "./employee.routes";

import organizationRoutes 
from "./organization.routes";

import dashboardRoutes
from "./dashboard.routes";

const router = Router();


router.use("/",
 organizationRoutes
);

router.use("/auth",
  authRoutes
);


// Test protected route
router.get("/profile",
  protect,
  (
    req: AuthRequest,
    res: Response
  ) => {

    res.json({

      success: true,

      message:
        "Protected route working",

      user: req.user

    });

  }
);

router.get("/admin-test",
  protect,
  authorize("Super Admin"),
  (req:AuthRequest,res:Response)=>{

    res.json({

      success:true,

      message:
        "Super Admin access granted",

      user:req.user

    });

  }
);


router.use("/employees",
  employeeRoutes
);


router.use("/dashboard",
  dashboardRoutes
);

export default router;