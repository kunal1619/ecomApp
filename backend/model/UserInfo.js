const { mongoose } = require("mongoose");
const {Schema} = mongoose;

const userInfo = new Schema({
    userId : {type : String, require : true},
    about : {type : String},
    photo : {type : String},
    name : {type : String},
    email : {type : String},
    country : {type : String},
    streetAddress : {type : String},
    city : {type : String},
    state : {type : String},
    zip : {type : String},

})

module.exports = mongoose.model('UserInfoSchema', userInfo)