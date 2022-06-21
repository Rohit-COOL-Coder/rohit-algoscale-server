const cors=require("cors")
const mongoose=require("mongoose")
const express= require("express")
const dotenv=require("dotenv")
const empRoute = require("./route/employee")
const app=express()

dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/api/employee/',empRoute)

mongoose.connect(process.env.MONGO_URL).then(()=>{
 console.log("db connected...")
}).catch((err)=>{
    console.log(err)
})

app.listen(process.env.PORT || 5000 ,()=>{
    console.log("server running on port 5000 ")
})

