const express = require( 'express' )
const mongoose = require( 'mongoose' )
const Producer = require( './models/Producer' )

const routes = express.Router()

const dataTest = {
    producer: {
        id: {hex:'AAFFBB'},
        name: 'Jorge',
        address: {
            street: 'Rua Rua Benedicto Wenceslau Mendes',
            number: 120,
            neighborhood: 'Jardim Nova Manchester',
            city: 'Sorocaba',
            uf: 'SP',
            cep: '18052000'
        },
        long: -23.5259355,
        lat: -47.4942263,
    },
    product: {
        producerId: mongoose.Types.ObjectId(),
        producerLocation: {
            lat: 47.6918721,
            long: -22.7146204,
        },
        name: 'Batata Asterix Lavada',
        type: 'tubérculos',
        amount: 500000,
        valuePerGarm: 0.0019728,
    },
}

routes.get( '/producers', async ( request, response ) => {
    const producers = await Producer.find()
    response.json( producers )
} )

routes.post( '/producers', async ( request, response ) => {
    const producer = await Producer.create( request.body )
    response.json( { ObjectId: producer.id } )
} )

routes.put( '/producers/:id', async ( request, response ) => {
    const producerId = request.params.id
    const producerReq = request.body

    const producer = await Producer.findByIdAndUpdate( producerId, producerReq )

    response.json( { message: `O cadastro do produtor ${producer.name} foi atualizado para ${ producerReq.name }` } )
} )

routes.delete( '/producers/:id', async ( request, response ) => {
    const producerId = request.params.id

    const producer = await Producer.findByIdAndRemove( producerId )
    
    response.json( { message: `O produtor ${ producer.name } foi deletado` } )
} )

routes.post( '/products', async ( request, response ) => {
    const productRequest = request.body
    const product = {
        productId: mongoose.Types.ObjectId(),
        ...productRequest
    }
    
    if( request.headers.authorization ){
        response.json( product )
    }else{
        response.json( {err:request.headers} )
    }
    

} )

module.exports = routes