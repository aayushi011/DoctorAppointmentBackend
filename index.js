const express = require("express");
const mongodbConnection = require("./Config/dbConnection.js");
const opn = require('opn');
const bcrypt = require('bcrypt');
const user = require("./Modals/User.js");
const bodyParser = require('body-parser');
const AddDoctor = require('./AddDoctor.js');
const AllDoctors = require('./AllDoctors.js');
const Doctor = require("./Modals/AddDoctorModal.js");
const Patient = require("./Modals/PatientModal.js");


const server = express();
const cors = require('cors');
server.use(cors({ origin: 'http://localhost:3000' }));

server.use(bodyParser.json());
server.use(express.json());

server.get("/", (req, res) => {
    res.send('Hello, World!');
});

server.post("/login",async(req, res)=>{
    console.log("login request body",req.body);
    const loginReqData = req.body;
    // First we need to verify the email id that it exist in database or not
    //find and take out the details from DB
    const userLoginData = await user.findOne({ email: loginReqData.email });

    console.log("userLoginData found successfully",userLoginData);
    if (!userLoginData) {
        return res.status(401).json({ message: 'Invalid username or password',statuscode:401 });
    }
    try{
        const isPasswordValid = await bcrypt.compare(loginReqData.password,userLoginData.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid Password',statuscode:401});
        }
        res.status(200).json({message: "user login successfully",statuscode:200});
    }catch(err){
        console.log(err);
        res.status(400).send({message: err,statuscode:400});
    }
})

server.post("/registration", async(req, res) => {
    userData = req.body
    console.log("registration request", userData);
    //This is for encrypt the password
    const {firstName,lastName,email,password} = req.body;
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
    try{
    const User = new user({
        firstName : userData.firstName,
        lastName : userData.lastName,
        email : userData.email,
        password : passwordHash
    })
    User.save();
    res.send({msg:'Registered Successfully',statuscode:200});
}catch(err){
    res.status(400).send(err);
}
});

server.post("/addDoctor",async (req, res) => {
    const addDoctorsData = req.body;
    console.log("addDoctorsData is", addDoctorsData);
  
    try {
      const newDoctor = new Doctor({
        DoctorName: addDoctorsData.DoctorName,
        specialization: addDoctorsData.specialization,
        category: addDoctorsData.category,
        contact: addDoctorsData.contact,
        availableSlots: {
          morning: addDoctorsData.availableSlots.morning,
          evening: addDoctorsData.availableSlots.evening
        },
        Country: addDoctorsData.Country,
        State: addDoctorsData.State,
        Location: addDoctorsData.Location,
        area: addDoctorsData.area,
        offday: addDoctorsData.offday,
        rating: addDoctorsData.rating
      });
  
      await newDoctor.save();
      res.status(200).send({ msg: 'You added successfully', statuscode: 200 });
    } catch (err) {
      res.status(400).send(err);
    }
  })


server.get("/allDoctors",async(req,res)=>{
    try {
        const doctors = await Doctor.find();
        res.status(200).send({ msg: "Data retrieved successfully", data: doctors });
    } catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
});

server.post("/patient",async(req,res)=>{
    try{
        patientdata = req.body;
        const savepatientdata = new Patient({
            patientName:patientdata.patientName,
            patientMobileNo: patientdata.patientMobileNo,
            describeHealtIsuue:patientdata.describeHealtIsuue,
            prefferedTime: patientdata.prefferedTime
        })
        savepatientdata.save();
        res.send(200).send({msg:"Patient Data save Successfully", statuscode: 200 })
    }catch(error){
        console.log(error);
        res.status(500).send({ msg: "Something went wrong", error: error.message });
    }
})

const PORT = process.env.PORT || 3001;
server.listen(PORT,()=>{
    console.log("server started");
    opn(`http://localhost:${PORT}`);     //http://localhost:3001/
});