const bcrypt = require('bcryptjs');
const User = require('../models/User')
const generateToken=require('../utils/generateToken')


const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const UserExist = await User.findOne({ email });
        if (UserExist) {
            return res.status(400).json({ message: "User Already registered with this email Id" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: 'user',
        })
        await user.save();
        res.status(201).json({ message: "User registered successfully" })

    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        res.json({
            token, user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name, 
            },
})
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = { register, login };