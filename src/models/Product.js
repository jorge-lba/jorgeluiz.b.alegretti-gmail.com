const mongoose = require( '../database/index' )

const ProductSchema = new mongoose.Schema({
    userId: String,
    userAddress: Object,
    name: String,
    type: String,
    description: String,
    amount: Number,
    dateAdd: { type: Date },
    dateLast: { type: Date, default: Date.now },
    dateHarvest: { type: Date, default: Date.now },
    valuePerKilo: Number,
})

const Product = mongoose.model( 'Product', ProductSchema )

module.exports = Product