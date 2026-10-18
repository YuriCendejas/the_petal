import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config({ path:"./.env"});

const PORT = process.env.PORT || 8117; 
// so if forwhatever reasons Ports not wokring then fall back on 8117 being the port 

const startServer = async () => {
    try {
        await connectDB();
        const server =app.listen(PORT,() =>{
            console.log(`servers running on ${PORT}`);
        }); 
        //starts express

        server.on("error",(error) => {
            console.error("Error!:",error);
            process.exit(1);
        }); //takes care of server errors like when a PORT is taken.




    } catch (error) {
        console.error("server setup failed! ",error.message);
    }
};

startServer();