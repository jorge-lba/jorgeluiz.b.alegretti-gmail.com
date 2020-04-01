const mongoose = require( '../database/index' )

const RetailerSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
    },
    address:{
        type: Object,
        require: true,
    },
    long: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true
    }
})

const Retailer = mongoose.model( 'Retailer', RetailerSchema )

module.exports = Retailer