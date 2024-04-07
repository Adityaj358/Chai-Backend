import dotenv from 'dotenv'
import connectDB from './Db/index.js'

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MONGO DB connection failed!!",err);
})













/*
import express from 'express';
const app = express()

;(async() =>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",(error)=>{
        console.log("Error :" ,error);
        throw error
       })

       app.listen(process.env.PORT,() =>{
        console.log(`App is listening on Port ${process.env.PORT}`);
       })

    } catch (error) {
        console.log(error);
        throw err
    }
})()
*/