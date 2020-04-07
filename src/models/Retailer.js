const mongoose = require( '../database/index' )

const RetailerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
     },
    cep: {
        type: String,
        required: true,
     },
    phone: {
        type: Number,
        required: true,
     },
    email: {
        type: String,
        required: true,
       // unique: true,
     },
     place:{
        type: String,
        required: true
    },

})

const Retailer = mongoose.model( 'Retailer', RetailerSchema )

module.exports = Retailer