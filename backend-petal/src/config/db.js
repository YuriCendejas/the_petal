
import mongoose from "mongoose";
//talks to mongodb


const connectDB = async () => {
    try { await mongoose.connect(process.env.MONGODB_URI);
console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed !",error.message);
        process.exit(1); // 1 means something went wrong and 0 means everythings fine and process.exit(1) shuts down the program

    }
};

export default connectDB;