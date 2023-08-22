const mongoose = require('mongoose')
const {Schema} = mongoose;

const cartSchema = new Schema({
    user_id : {type : String, require : true},
    product : {
        _id : {type : String},
        title : {type : String},
        description : {type : String},
        price : {type : Number},
        discountPercentage : {type : Number},
        rating : {type : Number},
        stock : {type : Number, default:0},
        brand : {type : String},
        category : {type : String},
        thumbnail : {type : String},
        images : {type : [String]},
        
    },
    quantity : {type : Number},
    deleted : {type : Boolean, default: false},
})

exports.Cart = mongoose.model('Cart', cartSchema);
