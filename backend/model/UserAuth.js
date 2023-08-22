const mongoose = require('mongoose');
const {Schema} = mongoose;

const signUpSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    role : {
        type : String,
        dafault : 'user'
    }
    
})



module.exports = mongoose.model('signUpUser', signUpSchema)


