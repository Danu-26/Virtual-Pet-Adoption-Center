const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
require("dotenv").config();
const cors = require('cors');
const mainRoute = require('../backend/routes/index.js')


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

//Connecting mongodb 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅Database connected successfully"))
    .catch((err) => console.error("MongoDB connection error : ", err))



//Base path route
app.use('/petshop', mainRoute);




//Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log("☑️Server started successfully on port : " + port);
})