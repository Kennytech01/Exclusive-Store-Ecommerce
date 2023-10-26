import Admin from "../models/adminModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from "jsonwebtoken";

export const adminsignup = async (req, res, next) => {
    const {username, email, password} = req.body
    
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newAdmin = new Admin({ username, email, password: hashPassword})

    try {
        await newAdmin.save()
        res.status(200).json({message: "created successfully!"})
    } catch (error) {

        next(error)
    }
}

export const adminsignin = async (req, res, next) => {
    const {email, password} = req.body

    try {
        //verify admin
        const validAdmin = await Admin.findOne({email})
        if(!validAdmin) return next(errorHandler(404, "admin not found!"))

        //verify password
        const verifyPassword = bcryptjs.compareSync(password, validAdmin.password)
        if(!verifyPassword) return next(errorHandler(401, "wrong credentials"))

        //generate token
        const token = jwt.sign({id: validAdmin._id}, process.env.JWT_SECRET)

        //seperate hashedPasswowrd from data sent to frontend
        const {password: hashPassword, ...rest} = validAdmin._doc

        //set accesstoken timeout
        const expiryDate = new Date(Date.now() + 3600000) // 1 hour limit

        //send response
        res
            .cookie('accessToken', token, {httpOnly: true, expires: expiryDate})
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }
}