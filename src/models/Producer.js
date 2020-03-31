const mongoose = require( '../database/index' )

const ProducerSchema = new mongoose.Schema({
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

const Producer = mongoose.model( 'Producer', ProducerSchema )

module.exports = Producer