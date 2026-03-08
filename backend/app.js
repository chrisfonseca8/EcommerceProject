require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./database/Schemas/UserSchema')
const cookie_Paser = require('cookie-parser')
const { UserRoutes, ItemRoutes, OrderRouter } = require('./routes/index');
const session = require('express-session');
const cors = require("cors");
import path from "path"

app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url)
  next()
})

app.use(
    cors({
        origin: "http://localhost:5173", // Vite default
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const _dirname = path.resolve();

app.use(cookie_Paser());
app.use(passport.initialize());
passport.use(
    new LocalStrategy(
        { usernameField: "email" },
        User.authenticate()
    )
);
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB connected"))
  .catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('first ecommerce site');
})

app.use('/items', ItemRoutes);
app.use('/user', UserRoutes);
app.use('/order', OrderRouter);

app.use((err, req, res, next) => {
  console.log("ERROR:", err)
  res.status(500).send(err.message)
})

app.use(express.static(path.join(_dirname,'/frontend/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'));
})
app.listen(3000, () => {
    console.log('litning on port 3000');
})
