const Employee = require("../model/Employee")
const CryptoJS=require("crypto-js")
const jwt=require("jsonwebtoken")

const Route=require("express").Router()

Route.post('/registration', async(req,res)=>{
    const emp=new Employee({
        employeeName:req.body.employeeName,
        employeeEmail:req.body.employeeEmail,
        employeePassword:CryptoJS.AES.encrypt(req.body.employeePassword,process.env.CRYPTOJS_KEY).toString()
    })
        try{
       const data=await emp.save()
        res.status(200).json(data)
        }catch(err){
            console.log("some error")
    }
})

Route.post("/login", async (req,res)=>{
    try{
      const user= await Employee.findOne({employeeEmail:req.body.email})
      console.log(user)
    !user && res.status(400).json("invalid Email")
  
    const hashedPassword=CryptoJS.AES.decrypt(user.employeePassword,process.env.CRYPTOJS_KEY)
    const decryptPassword=hashedPassword.toString(CryptoJS.enc.Utf8)
  
    decryptPassword !==req.body.password && res.status(400).json("invalid Password")
  
    const accessToken=jwt.sign({
      name:user.employeeName,
      email:user.employeeEmail
    },process.env.JWT_KEY,{expiresIn:"3d"})
  
    const {employeePassword,...other}=user._doc
    
    res.status(200).json({...other,accessToken})
    }catch(err){
      res.status(500).json(err)
    }
  })

module.exports=Route