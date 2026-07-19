import { Router } from "express";


import {
 protect
} from "../middleware/auth.middleware";


import {
 authorize
} from "../middleware/role.middleware";


import {

 updateManager,

 reportees,

 organizationTree

} from "../controllers/organization.controller";


const router = Router();



router.patch(
 "/employees/:id/manager",
 protect,
 authorize(
  "Super Admin"
 ),
 updateManager
);



router.get(
 "/employees/:id/reportees",
 protect,
 reportees
);



router.get(
 "/organization/tree",
 protect,
 organizationTree
);



export default router;