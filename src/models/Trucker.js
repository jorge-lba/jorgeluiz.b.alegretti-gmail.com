const mongoose = require( '../database/index' )

const TruckerSchema = new mongoose.Schema({

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
    truckerModel: {
        type: String,
        required: true,
    },
    truckerYear:{
        type: Number,
        required: true,
    }

})

const Trucker = mongoose.model( 'Trucker', TruckerSchema )

module.exports = Trucker