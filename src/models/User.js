const mongoose = require( '../database/index' )

const UserSchema = new mongoose.Schema({
    name:{ type: String, require: true },
    password:{ type: String, required: true },
    foundation:{ type: Date },
    address:{ 
        street:{ type: String, require: true },
        number:{ type: Number, require: true },
        complement:{ type: String },
        zip_code:{ type: Number, require: true },
        neighborhood:{ type: String, require: true },
        city:{ type: String, require: true },
        uf:{ type: String, require: true },
        longitude:{ type: Number },
        latitude:{ type: Number },
    },
    cellphone:{ type: Number },
    telephone:{ type: Number },
    email:{ type: String, require: true, unique: true },
    type_person:{ type: String, require: true },
    fantasy_name:{ type: String },
    cnpj:{ type: Number, unique: true },
    cpf:{ type: Number, unique: true },
    producer:{ type: Boolean, require: true },
    retailer:{ type: Boolean, require: true },
    conveyor:{ type: Boolean, require: true },
    vehicle_model:{ type: String },
    conveyor_partner:{ type: Boolean, require: true },
    open_trading: [{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status:{
            type: String,
            default: 'pending'
        }
    }],
    closed_trading: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    creation_date: { type: Date, default: Date.now }

})

const User = mongoose.model( 'User', UserSchema )

module.exports = User