const express = require( 'express' )
const mongoose = require( 'mongoose' )
const Producer = require( './models/Producer' )
const Product = require( './models/Product' )

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
    producerId: '5e8409fc4419a73addf5c84d',
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
    const requestId = request.headers.authorization
    const productRequest = { 
        producerId: requestId,
        ...request.body
    }
    
    if( requestId ){
        if(requestId === dataTest.producerId ){
            const product = await Product.create( productRequest )
        
            const idProduct = product._id
            
            response.json( { message: 'Produto cadastrado', _id: idProduct } )

        }else{
            response.json( { message: 'ID do produtor inválido' } )
        }
    }else{
        response.json( { message: 'Requer ID do produtor' } )
    }
    

} )

routes.get( '/products', async ( request, response ) => {
    const product = await Product.find()
    
    response.json( product )
} )

module.exports = routes