const mongoose =require("mongoose")

const employeeSchema=new mongoose.Schema({
   employeeName:{type:String},
   employeeEmail:{type:String},
   employeePassword:{type:String}
},{timestamps:true})

module.exports=mongoose.model("employee",employeeSchema)