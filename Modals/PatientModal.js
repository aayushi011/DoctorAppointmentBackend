const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    patientName:{type:String, required:true},
    patientMobileNo: {type:String, required:true},
    describeHealtIsuue:{type:String, required:true},
    prefferedTime:{type:String, required:true}
})

const patientModal = mongoose.model('PatientDetails',patientSchema);

module.exports = patientModal;