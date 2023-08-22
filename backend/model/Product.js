const mongoose = require('mongoose')
const {Schema} = mongoose;

const productSchema = new Schema({
// _id: {type:String, require : true},
title : {type : String, require: true},
description : {type : String, require: true},
price : {type : Number, min:[1, 'wrong min price'], max:[10000, 'max price should less than 10000'], require: true},
discountPercentage : {type : Number, min:[1, 'wrong discount'], max:[70, 'max discount should less than 10']},
rating : {type : Number, min:[0, 'wrong rating'], max:[5, 'max rating scale is 5']},
stock : {type : Number, min:[0, 'wrong stock value'], default:0},
brand : {type : String, require: true},
category : {type : String, require: true},
thumbnail : {type : String, require: true},
images : {type : [String], require: true},
deleted : {type : Boolean, default: false},
})

//we will add a virtual is because mongoose add default _id
// const virtual = productSchema.virtual('id');
// virtual.get(function(){
//     return this._id;
// })
// productSchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret){delete ret._id}
// })

exports.Product = mongoose.model('Product', productSchema)