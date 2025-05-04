const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Access denied, No token provided" })
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decodedUser;

        next();

    } catch (err) {
        return res.status(400).json({ message: "Invalid Token" });
    }
}


const adminOnly=(req,res,next)=>{
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied, Admins only." });
    }

    next();
}

module.exports = { authMiddleware, adminOnly }