
const UserSchema = require('../../models/user')
const jwt = require('jsonwebtoken');

exports.Signup = async(req, res, next)=>{
    const {firstName,lastName,email,contactNumber,password} = req.body

    const existingUser = await UserSchema.findOne({email})
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists"});
    }  

    const newUser = new UserSchema({
        firstName,
        lastName, 
        email, 
        password,
        contactNumber,
        username: Math.random().toString(),
        role: "admin"
    })
    await newUser.save()
    return res.status(201).json({message :"Admin Created Successfully!",data:{newUser}})

}

exports.SignIn = async (req,res,next) =>{
    const {email, password } = req.body
    if(!email || !password){
        return res.status(404).send({message: 'Email and Password are required '})
    }

    const user = await  UserSchema.findOne({email})
    if(user){
        if(user.authenticate(password) && user.role === "admin" ){
            const token = await jwt.sign({_id:user._id,role: user.role},process.env.JWT_SECRET,{expiresIn:'1h'})
            const {_id,email , firstName, lastName, fullName, role} = user
            
            res.status(200).json({
                token,
                user:{_id ,firstName, lastName, fullName, email, role}})
        }else{
            return res.status(400).json({ message: "Incorrect Password Or Email" });
        }
    }else{
            return res.status(404).json({ message: "Notfound Email Or Password" });
    }

}

