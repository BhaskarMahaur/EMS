import {
  Router
} from "express";


import {
  protect
} from "../middleware/auth.middleware";


import {
  authorize
} from "../middleware/role.middleware";


import {
  dashboard
} from "../controllers/dashboard.controller";


const router =
  Router();



router.get(

  "/",

  protect,

  // authorize(
  //   "Super Admin",
  //   "HR Manager"
  // ),

  dashboard

);



export default router;