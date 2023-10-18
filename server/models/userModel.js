const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema (
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password : {
            type: String,
            required: true
        }
    }
)

// create a static signup method
userSchema.statics.signup = async function(email, password) {

    // Lets do some validations below

    // verify the field is not empty
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    
    // verify email is vaild
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email')
    }

    // verify strong password
    if(!validator.isStrongPassword(password)){
        throw Error('Enter a strong password')
    }

    const exists = await this.findOne({email})
    // verify if the email already exist
    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10) //generate salt
    const hash = await bcrypt.hash(password, salt) //hash the password with slat you created

    //create a new user
    const user = await this.create({email, password:hash})
    return user
}

// export userModel
const User = mongoose.model('User', userSchema)
module.exports = User


