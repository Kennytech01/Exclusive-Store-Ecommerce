import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup  = async (req, res, next) => {
    console.log(req.body)

    const {username, email, password} = req.body //get details from client side

    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password: hashPassword})
    
    try {
        await newUser.save()
        res.status(200).json(
            {
                message: 'new user created successfully!'
            }
        )
        
    } catch (error) {
        next(error) //error message
    }
}

export const signin = async (req, res , next) => {
    console.log(req.body)
}
