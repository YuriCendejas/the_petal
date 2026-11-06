import {Router} from "express";

import {createTask,soonestTask,complete,deleteTask} from "../controllers/projectCon.js";

const router= Router();

router.post("/",createTask); 
router.get("/",soonestTask);
router.patch("/:id",complete); // nothing in "/" bc it doesnt need a name for this
router.delete("/:id",deleteTask); // i made duplicates and i wanted to delete them 



 export default router;