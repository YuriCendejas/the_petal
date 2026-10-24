import {Router} from "express";

import { createTask} from "../controllers/projectCon.js";

const router= Router();

router.post("/",createTask); 




 export default router;