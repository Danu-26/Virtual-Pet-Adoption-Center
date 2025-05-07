const express =require('express')
const router=express.Router();
const petController = require('../controllers/petController.js')
const { authMiddleware, adminOnly } = require('../middleware/auth')

router.post("/add-pet", authMiddleware, adminOnly, petController.addPet)
router.get("/get-all-pets", authMiddleware, petController.getAllPet)
router.get("/get-a-pet/:id", authMiddleware, petController.getOnePet)
router.put("/update-pet/:id", authMiddleware, adminOnly, petController.petUpdate)
router.delete("/delete-pet/:id", authMiddleware, adminOnly, petController.petDelete)
router.get("/filter", authMiddleware,petController.petFilterByMood)
router.put("/adopt/:id", authMiddleware, petController.petAdopt)
module.exports=router;