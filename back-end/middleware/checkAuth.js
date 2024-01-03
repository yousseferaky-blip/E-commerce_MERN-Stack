const UserSchema = require('../models/user');


const checkAuth = async (req, res) => {
    try {
      const userId = req.user._id; 
      const user = await UserSchema.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ isAdmin: user.isAdmin });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = { checkAuth };