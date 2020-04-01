const mongoose = require( 'mongoose' )
require( 'dotenv/config' )

mongoose.connect( process.env.URL_DATABASE ,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
mongoose.Promise = global.Promise

module.exports = mongoose