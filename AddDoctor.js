// const Doctors = require("./Modals/AddDoctorModal.js");

// const AddDoctor = async(req,res) =>{
//     const addDoctorsData = req.body;
//     console.log("addDoctorsData is",addDoctorsData); 
//     try{
//     const Doctors =  new Doctors({
//         DoctorName: addDoctorsData.DoctorName,
//         specialization: addDoctorsData.specialization,
//         category:addDoctorsData.category,
//         contact: addDoctorsData.contact,
//         availableSlots:{
//             "morning": addDoctorsData.availableSlots.morning,
//             "evening": addDoctorsData.availableSlots.evening,
//         },
//         Country : addDoctorsData.Country,
//         State : addDoctorsData.State,
//         Location :addDoctorsData.Location,
//         area : addDoctorsData.area,
//         rating : addDoctorsData.rating
//     })
//     Doctors.save();
//     res.send({msg:'You added Successfully',statuscode:200});
// }catch(err){
//     res.status(400).send(err);
// }
// }

// module.exports = AddDoctor;