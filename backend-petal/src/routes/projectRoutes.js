import {Router} from "express";

import { createTask,soonestTask} from "../controllers/projectCon.js";

const router= Router();

router.post("/",createTask); 
router.get("/",soonestTask);




 export default router;