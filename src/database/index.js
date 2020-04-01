const mongoose = require( 'mongoose' )

mongoose.connect( 'mongodb+srv://megahack-covid-19:covid19@cluster0-pudtl.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise

module.exports = mongoose