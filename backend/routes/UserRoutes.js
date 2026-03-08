const express = require('express');
const router = express.Router();
const Users = require('../database/Schemas/UserSchema');
const passport = require('passport')
const { registerUser, LoginUser } = require('../Auth/AuthFunctions');
const { veryfingJWTToken } = require('../Auth/JwtFunctions');
const { AdminRegister } = require('../middleware/middleware');

// gettig all users
router.get('/', async (req, res) => {
  const AllUsers = await Users.find({});
  res.status(200).json(AllUsers);
})

// depending upon the query can find
router.get('/find', async (req, res) => {
  const { role } = req.query;
  const users = await Users.find({ role });
  return res.status(200).json(users);
})


router.post('/register/customer', registerUser)
router.post('/register/seller', registerUser)
router.post('/register/admin', veryfingJWTToken, AdminRegister, registerUser)


router.post('/login',
  passport.authenticate('local', { session: false }),
  LoginUser
);

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
});

// get current logged-in user (used by checkout page) — must be before /:id
router.get("/me", veryfingJWTToken, (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

//get user by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const User = await Users.findById(id);
  res.status(200).json(User);
})



module.exports = router