import { Router } from "express";
import { getFlower } from "../controllers/flowerCon.js";

const router = Router();

router.get("/", getFlower);

export default router;