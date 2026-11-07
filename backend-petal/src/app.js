import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import projectRoutes from "./routes/projectRoutes.js";
import flowerRoutes from "./routes/flowerRoutes.js";


const app = express();
app.use(cors()); // lets react app call this api directly from another adresss
app.use(express.json()); // reads Json reqest bodies

app.get("/",(req,res) => {res.send("Server is working!"); // this will show in the terminal or in the browser when i do the curl test.

    
});

app.use("/api/projects",projectRoutes);
app.use("/api/flower",flowerRoutes);

app.use(errorHandler); //from middleware/errorHandler.js so if something is wrong throw an error
export default app;