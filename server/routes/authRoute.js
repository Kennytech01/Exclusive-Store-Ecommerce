import express from 'express'
import {google, signin, signup} from '../controller/authController.js'
import { adminsignin, adminsignup } from '../controller/adminAuthController.js'
const router = express.Router()

router.post('/signin', signin) //signin route
router.post('/signup', signup) //signup route
router.post('/google', google) //goolge route
router.post('/adminsignup', adminsignup)
router.post('/adminsignin', adminsignin)

export default router



