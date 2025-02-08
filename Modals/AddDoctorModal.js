// const mongoose = require("mongoose");

// const addDoctorSchema = mongoose.Schema(
// {
//   DoctorName: { type: String, required: true },
//   specialization: { type: String, required: true },
//   category: { type: String, required: true },
//   contact: { type: String, required: true },
//   availableSlots: { 
//     morning : {type: String, required: true },
//     evening : {type: String, required: true }
// },
//   Country : {type: String, required: true },
//   State : {type: String, required: true },
//   Location :{type: String, required: true },
//   area : {type: String, required: true },
//   offday : {type: [String], required: true },
//   rating : {type: String, required: true }
// }
// )

// const Doctors = mongoose.model("Doctors",addDoctorSchema);

// module.exports = Doctors;

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  DoctorName: { type: String, required: true },
  specialization: { type: String, required: true },
  category: { type: String, required: true },
  contact: { type: String, required: true },
  availableSlots: { 
    morning: { type: String, required: true },
    evening: { type: String, required: true }
  },
  Country: { type: String, required: true },
  State: { type: String, required: true },
  Location: { type: String, required: true },
  area: { type: String, required: true },
  offday: { type: [String], required: true },
  rating: { type: String, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor