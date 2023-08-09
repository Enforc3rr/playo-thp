exports.logRequests = (req,res,next)=>{
    console.log(`Request Received at ${req.url}`);
    next();
}