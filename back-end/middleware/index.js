
const jwt = require("jsonwebtoken");

exports.requireSignIn = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];  
      if (!token) {
        return res.status(401).json({ message: "Token not provided" });
      }
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;

      if (user && user.role) {
        req.userRole = user.role;
      } else {
        req.userRole = "user"; 
      }

      next();
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User Access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin Access denied" });
  }
  next();
};
