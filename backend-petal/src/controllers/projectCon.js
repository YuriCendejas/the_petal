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

export {createTask};