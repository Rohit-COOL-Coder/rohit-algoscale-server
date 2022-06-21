const Employee = require("../model/Employee")

const Route=require("express").Router()

Route.post('/registration', async(req,res)=>{
    const emp=new Employee(req.body)
    // var ciphertext = CryptoJS.AES.encrypt( , 'secret key 123').toString();
        try{
       const data=await emp.save()
        res.status(200).json(data)
        }catch(err){
            console.log("some error")
    }
})

module.exports=Route