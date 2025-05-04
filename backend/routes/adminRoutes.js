const express =require('express')
const router=express.Router();
const adminController = require('../controllers/adminController')
const { authMiddleware, adminOnly }=require('../middleware/auth')

router.post("/create-admin", authMiddleware, adminOnly, adminController.createNewAdmin,)


module.exports=router;