
const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken');

exports.Signup = async (req, res, next) => {
    const { firstName, lastName, email, password, contactNumber } = req.body;

    try {
        const existingUser = await UserSchema.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const newUser = new UserSchema({
            firstName,
            lastName,
            email,
            password,
            contactNumber,
            username: Math.random().toString()
        });

        await newUser.save();


        const token = await jwt.sign(
          { _id: newUser._id, role: newUser.role },
          process.env.JWT_SECRET,
          { expiresIn: '7d', algorithm: 'HS256' }
        );

        return res.status(201).json({ message: "User Created Successfully!", data: { newUser, token } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({ message: 'Email and Password are required ' });
    }
  
    const user = await UserSchema.findOne({ email });
    if (user) {
      if (user.authenticate(password)) {
        const token = await jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const { _id, email, firstName, lastName, fullName, role } = user;
  
  
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, fullName, email, role }
        });
      } else {
        return res.status(400).json({ message: 'Incorrect Password Or Email' });
      }
    } else {
      return res.status(404).json({ message: 'Notfound Email Or Password' });
    }
  };

exports.getUsers = async (req,res)=>{
    try {
        const users = await UserSchema.find({},{hash_password:false})
        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await UserSchema.findByIdAndDelete(userId);

        if (deletedUser) {
            res.status(200).json({ message: "User deleted successfully", data: { deletedUser } });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await UserSchema.findById(userId, { hash_password: false });

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, password, contactNumber } = req.body;

        const existingUser = await UserSchema.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        existingUser.firstName = firstName;
        existingUser.lastName = lastName;
        existingUser.email = email;
        existingUser.password = password;
        existingUser.contactNumber = contactNumber;

        await existingUser.save();

        res.status(200).json({ message: "User updated successfully", data: { updatedUser: existingUser } });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
      const userId = req.user._id; 
      const user = await UserSchema.findById(userId, { hash_password: false });
  
      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
