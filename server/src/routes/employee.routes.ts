import { Router } from "express";


import {
  protect
} from "../middleware/auth.middleware";


import {
  authorize
} from "../middleware/role.middleware";


import {
  addEmployee,
  getAllEmployees,
  getSingleEmployee,
  editEmployee,
  removeEmployee
} from "../controllers/employee.controller";

import {
  employeeValidator
} from "../validators/employee.validator";


import {
  validate
} from "../middleware/validate.middleware";



const router = Router();


router.post(
  "/",
  protect,
  authorize(
    "Super Admin",
    "HR Manager"
  ),
  employeeValidator,
  validate,
  addEmployee
);



router.get(
  "/",
  protect,
  // authorize(
  //   "Super Admin",
  //   "HR Manager"
  // ),
  getAllEmployees
);



router.get(
  "/:id",
  protect,
  getSingleEmployee
);



router.put(
  "/:id",
  protect,
  authorize(
    "Super Admin",
    "HR Manager"
  ),
  editEmployee
);



router.delete(
  "/:id",
  protect,
  authorize(
    "Super Admin"
  ),
  removeEmployee
);



export default router;