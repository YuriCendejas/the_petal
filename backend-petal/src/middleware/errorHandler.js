export const errorHandler = (err,req,res,next)=>{ // when you see 4 parameters express knows its a error handler
    console.error(err); // keeps the full error in the terminal for debugging

    if (err.name === "ValidationError") {
        return res.status(400).json({error:err.message}); // if mongodb validation fails then throw an error
    }
    if(err.name === "CastError"){
        return res.status(400).json({error: "Invaild id"}); // if the url id like "api/projects/not real /complete" is spelled wrong or just not a name etc throw an error
    
    }

    return res.status(500).json({error: " My bad!, something went wrong"});

};