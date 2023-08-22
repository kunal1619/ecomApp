const mongoose = require("mongoose");
const {Schema} = mongoose;

const addresessSchema = new Schema({
    userId : {type : String, require : true},
    addresses : [{
        name : {type : String },
        email : {type : String},
        address : {type : String},
        country : {type : String},
        pin : {type : Number }
    }]
})

exports.Addresses = mongoose.model('Addresses', addresessSchema);
