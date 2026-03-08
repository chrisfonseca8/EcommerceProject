const { makingJWTToken, veryfingJWTToken } = require('./JwtFunctions');
//const Users = require('../database/Schemas/UserSchema');
const User = require('../database/Schemas/UserSchema');


//making registering User
module.exports.registerUser = async (req, res) => {
    try {
        const { username, password, email, role, addresses } = req.body;
        const NewUser = new User({
            username,
            email,
            addresses,
            role
        })
        const registerdUser = await User.register(NewUser, password);

        res.status(200).json(registerdUser);
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something went wrong"
        });
    }
}

// login user 
module.exports.LoginUser = async (req, res) => {

    console.log('logion route has been hit')
    try {

        const payLoad = {
            role: req.user.role,
            id: req.user._id
        }

        const token = makingJWTToken(payLoad);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 // 1 hour
        })

        res.status(200).json({
            message:'logged in',
            user: {
                id: req.user._id,
                username: req.user.username,
                role: req.user.role
            },
            token: token
        });
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }

}