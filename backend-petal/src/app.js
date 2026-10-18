import express from "express";

const app = express();
app.use(express.json());

app.get("/",(req,res) => {res.send("Server is working!"); // this will show in the terminal when i do the curl test.

});

export default app;