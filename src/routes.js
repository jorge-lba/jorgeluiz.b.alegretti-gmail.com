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
    }
}

routes.get( '/producers', async ( request, response ) => {
    const producers = await Producer.find()
    response.json( producers )
} )

routes.post( '/producers', async ( request, response ) => {
    const producer = await Producer.create({ userId: mongoose.Types.ObjectId().toHexString() ,...request.body})
    response.json( { ObjectId: producer.id } )
} )

routes.put( '/producers/:id', async ( request, response ) => {
    const producerId = request.params.id
    const producerReq = request.body

    const producer = await Producer.findByIdAndUpdate( producerId, producerReq )

    response.json( { message: `O cadastro do produtor ${producer.name} foi atualizado para ${ producerReq.name }` } )
} )

routes.delete( '/producers/:id', ( request, response ) => {
    const producerId = request.params

    console.log( producerId )

    response.json( { message: `O produtor foi deletado` } )
} )

module.exports = routes