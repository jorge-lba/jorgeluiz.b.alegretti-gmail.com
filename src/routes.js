const express = require( 'express' )
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

routes.get( '/producers', ( request, response ) => {
    response.json( [ dataTest.producer ] )
} )

routes.post( '/producers', async ( request, response ) => {
    const producer = await Producer.create(request.body)
    console.log( producer )
    response.json( { ObjectId: producer.id } )
} )

routes.put( '/producers/:id', ( request, response ) => {
    const producerId = request.params
    const producer = request.body

    console.log( producerId )

    response.json( { message: `O cadastro do produtor Jorge foi atualizado para ${ producer.name }` } )
} )

routes.delete( '/producers/:id', ( request, response ) => {
    const producerId = request.params

    console.log( producerId )

    response.json( { message: `O produtor foi deletado` } )
} )

module.exports = routes