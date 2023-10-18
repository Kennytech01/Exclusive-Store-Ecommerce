import express from 'express'
import {signup} from '../controller/authController.js'
const router = express.Router()

// router.post('/signin', signin) //login route
router.post('/signup', signup) //signup route

export default router



