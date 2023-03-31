const express=require('express')
const router=express.Router()
const LoginControllers=require('../Controllers/LoginController')
router.post("/signup",LoginControllers.SignupControllerFunction)
router.post("/login",LoginControllers.loginControllerFunction)
module.exports=router
