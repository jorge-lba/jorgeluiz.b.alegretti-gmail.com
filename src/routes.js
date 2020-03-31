const express = require( 'express' )

const routes = express.Router()

routes.get( '/producers', ( request, response ) => {
    response.json( [{
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
    }, {
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
    }] )
} )

module.exports = routes