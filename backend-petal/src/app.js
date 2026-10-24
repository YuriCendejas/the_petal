import express from "express";
import projectRoutes from "./routes/projectRoutes.js";
const app = express();
app.use(express.json());

app.get("/",(req,res) => {res.send("Server is working!"); // this will show in the terminal when i do the curl test.

    
});

app.use("/api/projects",projectRoutes);

export default app;