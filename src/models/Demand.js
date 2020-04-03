const mongoose = require( '../database/index' )

const DemandSchema = new mongoose.Schema({
    userId: String,
    userAddress: Object,
    name: String,
    type: String,
    amount: Number,
    dateAdd: { type: Date },
    dateLast: { type: Date, default: Date.now },
})

const Demand = mongoose.model( 'Demand', DemandSchema )

module.exports = Demand