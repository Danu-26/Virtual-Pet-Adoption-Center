
const mongoose = require("mongoose");
const User = require('../models/User');
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();



const createSuperAdmin = async () => {

    try {

        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("✅Database connected successfully"))
            .catch((err) => console.error("MongoDB connection error : ", err))
        const email = "superadmin@gmail.com";
        const existAdmin = await User.findOne({ email });

        if (existAdmin) {
            console.log("super admin already exist");
            return;
        }
        const hashPassword = await bcrypt.hash("superadmin1999", 10);

        const superAdmin = new User({
            name: "Super Admin",
            email,
            password: hashPassword,
            role: 'admin'
        })

        await superAdmin.save();

        console.log("Super admin created successfully");

        mongoose.disconnect();

    } catch (err) {
        console.error("Error creating super Admin: ", err);
        mongoose.disconnect();
    }


}

createSuperAdmin();