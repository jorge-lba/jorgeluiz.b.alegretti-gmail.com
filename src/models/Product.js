const mongoose = require( '../database/index' )

const ProductSchema = new mongoose.Schema({
    // userId: String,
    // userAddress: Object,

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
        unique: true,
     },
     place:{
         type: String,
         required: true
     },
     geolocation:{
         long: Number,
         lat: Number
     },

    //type: String,
    //description: String,
    products: [ {
        name: String,
        amount: Number,
        dateAdd: { type: Date, default: Date.now },
    } ]
    //dateLast: { type: Date, default: Date.now },
    //dateHarvest: { type: Date, default: Date.now },
    //valuePerKilo: Number,
})

const Product = mongoose.model( 'Product', ProductSchema )

module.exports = Product