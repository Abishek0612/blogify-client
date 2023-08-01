
const express = require('express')
const { register } = require('../controllers/userCtrl')


const userRouter = express.Router()

userRouter.post('/register', register)


//Export 
module.exports = userRouter