const mongoose = require("mongoose");

const URI =  "mongodb+srv://aayushi011jain:Aayushi88jain@myproject.tog47.mongodb.net/"

const mongodbConnection = async()=>{
   await mongoose.connect(URI);
}
mongodbConnection().then(()=>{
    console.log("mongo connected successfully");
}).catch((err)=>{
    console.log("mongo not connected successfully",err);
})

module.exports =  mongodbConnection;
