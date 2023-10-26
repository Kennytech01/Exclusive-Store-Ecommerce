import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'


export const signup  = async (req, res, next) => {
    // console.log(req.body)

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
    // console.log(req.body)

    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email}); //verify email
        if(!validUser) return next(errorHandler(404, 'user not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password) //verify password
        if(!validPassword) return next(errorHandler(401, 'wrong credentials!'))

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

export const google = async (req, res, next) => {
    // console.log(req.body)
    try {
        const user = await User.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET) //generate token

            const {password: hashpassword, ...rest} = user._doc; // seperate the password from the data you're sending to the front end

            const expiryDate = new Date(Date.now() + 3600000) // 1 hour duration

            res
                .cookie('access-token', token, {httpOnly: true, expires: expiryDate})
                .status(200)
                .json(rest)

        } else {
            // generate new password
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const hashPassword = bcryptjs.hashSync(generatePassword, 10)

            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashPassword,
                profilePicture: req.body.photo
            });


            //save the user
            await newUser.save()

            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET); //generate password

            const {password: hashPassword2, ...rest} = newUser._doc; // seperate password

            const expiryDate = new Date(Date.now() + 3600000) // 1 hour(expiration date)

            res 
                .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest)
        }
    } catch (error) {
        next(error)
    }

    
}