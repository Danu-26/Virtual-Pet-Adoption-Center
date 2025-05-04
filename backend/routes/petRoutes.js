const express =require('express')
const router=express.Router();
const petController = require('../controllers/petController.js')
const { authMiddleware, adminOnly } = require('../middleware/auth')

router.post("/add-pet", authMiddleware, adminOnly, petController.addPet)
router.get("/get-all-pets", petController.getAllPet)
router.get("/get-a-pet/:id", petController.getOnePet)
router.put("/update-pet/:id", authMiddleware, adminOnly, petController.petUpdate)
router.delete("/delete-pet/:id", authMiddleware, adminOnly, petController.petDelete)
router.get("/filter", petController.petFilterByMood)
router.put("/adopt/:id", petController.petAdopt)
module.exports=router;