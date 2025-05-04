const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const petRoutes = require("./petRoutes");
const adminRoutes = require("./adminRoutes");


router.use("/auth", authRoutes); 
router.use("/pets", petRoutes);     
router.use("/admin", adminRoutes);  

module.exports = router;

