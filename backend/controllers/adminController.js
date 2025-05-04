const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createNewAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admins only." });
        }

        const existAdmin = await User.findOne({ email });
        if (existAdmin) {
            return res.status(400).json({ message: "Admin already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
        })

        await newAdmin.save();

        res.status(201).json({ message: "Successfully created an Admin" });

    } catch (err) {
        console.error("Error during admin creation:", err); 
        res.status(500).json({ message: "Server Error" });

    }
};

module.exports = { createNewAdmin }


