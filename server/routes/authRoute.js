import express from 'express'
import {google, signin, signup} from '../controller/authController.js'
const router = express.Router()

router.post('/signin', signin) //signin route
router.post('/signup', signup) //signup route
router.post('/google', google) //goolge route

export default router



