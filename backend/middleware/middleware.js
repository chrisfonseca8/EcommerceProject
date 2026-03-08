//creating a middleware only such that admis can register 
module.exports.AdminRegister=(req,res,next)=>{
    const data = req.user;
    if(data.role!=="Admin"){
        return res.status(403).json({message:'Do not have access'});
    }
    next();
}

// making a middeleware containg gendral data
module.exports. generalMiddleware = (allowedPersons) => {
    return (req, res, next) => {
        const user = req.user;

        if (allowedPersons.includes(user.role)) {
            return next();
        }

        return res.status(403).json({
            message: "You do not have auth"
        });
    };
};