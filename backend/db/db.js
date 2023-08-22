const mongoose = require("mongoose")
const {Product} = require('../model/Product')

//setup mongoose and connect with mongodb
const mongooseDB = async () => {
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("database connected")
  } catch (error) {
    console.log("error while connecting with db", error)
  }
}

module.exports = mongooseDB

// username : kunal770609
// password : kunal@770
