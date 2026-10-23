import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({ // the structure for the project
    title:{
    required:true,
    type:String
    },

    deadline: { type:Date,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["pending","done"], // either this or the other but not both . 
        default:"pending" // that way they all start this way . 
    },
},
    {timestamps:true} // makes created At and update At automatically

);
export default mongoose.model("projects",userSchema); 