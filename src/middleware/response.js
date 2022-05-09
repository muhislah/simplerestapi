module.exports.errorResponse = (err, req, res, next)=> {
    if (err){
        res.status(err.status).json({
            status : err.statusCode,
            message : err.message
        });
    }
    next();
};

module.exports.notFound = (req,res,next) => {
    res.status(404).json({
        status : 404,
        message : "Page Not Found"
    });
    next();
};