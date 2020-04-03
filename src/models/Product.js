const mongoose = require( '../database/index' )

const ProductSchema = new mongoose.Schema({
    producerId: String,
    producerAddress: Object,
    name: String,
    type: String,
    description: String,
    amount: Number,
    valuePerKilo: Number,
})

const Product = mongoose.model( 'Product', ProductSchema )

module.exports = Product