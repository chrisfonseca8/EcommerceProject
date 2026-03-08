const jwt = require('jsonwebtoken');


const makingJWTToken=(payload)=>{
    // making the jwt token over here
        return jwt.sign(payload,process.env.JWT_SECRETKEY,{expiresIn:60*60});

}

//veryfing jwt token
const veryfingJWTToken=(req,res,next)=>{
    //each berer token will look like berer token
    //you have to just get the token
  const JwtToken = req.cookies.token;

  // you will get the token form the cookies such as
  // token = req.session.token 
  if(!JwtToken){
    return res.status(402).json({error:'jwt token not found'})
  }
  const decode = jwt.verify(JwtToken,process.env.JWT_SECRETKEY)
  req.user = decode;
  next();
}

module.exports = {makingJWTToken,veryfingJWTToken};