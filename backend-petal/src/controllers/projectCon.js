import projects from "../models/projectModels.js"; // save to and read from the projects collection in mongodb

const createTask = async (req,res, next) =>{
    try {
        const {title,deadline } = req.body; 

        const project = await projects.create({title,deadline}); // only pass title or dealine for else keep it default pending

       return res.status(201).json(project);


    } catch (error) {
        console.error(error); // print error in terminal
        next(error); // hands error to express or else itll just hang there in postmon ,.
    }
};

const soonestTask = async (req,res,next) => {
    try {
        const list = await projects.find().sort({deadline:1}); 
        /* find() with no filter returns everything and ,
        sort({deadline:1}) should give me the soonest */ 
        return res.json(list);
        
    } catch (error) {
        console.error(error);
        next(error); 
    }
    };


    const complete = async (req,res,next) => { // when you send PATCH using :id/complete
        try {
            
            const project = await projects.findById(req.params.id); // :id in the route is supposed to become req.params.id

            if (!project){
                return res.status(404).json({message:"task not found !"});
            }

            project.status = "done"; // some pending to done
            project.completeAt = new Date(); // saying when it was completed on
            await project.save(); 
            return res.json(project);


        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    const deleteTask = async (req,res,next) => {
        try {
            const project = await projects.findByIdAndDelete(req.params.id);

            if(!project){
                return res.status(404).json({message:"Not found!"});

            }
            
            return res.json({message:"Deleted!",id: project._id}); // found the id you wanted to delete and showing it was deleted with "id:project._id"
        } catch (error) {
            console.error(error);
            next(error); // it should say 404 with this next error
        }
    };



export {createTask,soonestTask,complete,deleteTask};