const mongoose = require( '../database/index' )

const ProductSchema = new mongoose.Schema({
    producerId: String,
    producerLocation: String,
    name: String,
    type: String,
    amount: Number,
    valuePerGarm: Number,
})

const Product = mongoose.model( 'Product', ProductSchema )

module.exports = Product