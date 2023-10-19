import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'


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

    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email}); //verify email
        if(!validUser) return next(errorHandler(404, 'user not found'))

        const validPassword = bcryptjs.compareSync(password, validUser.password) //verify password
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'))

        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET) //generate token
        
        const {password: hashPassword, ...rest} = validUser._doc; //exclude passowrd from the detials your'e sending to the frontEnd

        const expiryDate = new Date( Date.now() + 3600000) //1 hour interval

        res
        .cookie('accessToken', token, {httpOnly: true, expires: expiryDate}) // cookie
        .status(200)
        .json(rest)

    } catch (error) {
        next(error)
    }
}
