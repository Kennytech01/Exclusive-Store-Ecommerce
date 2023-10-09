const User = require('../models/userModel')
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//login user
const loginUser = async (req, res) => {
    res.json({mssg: 'Login User'})
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body // using destructuring method to get email and password!

    try {
        const user = await User.signup(email, password)

        // create token 
        const token = createToken(user._id)
        
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}