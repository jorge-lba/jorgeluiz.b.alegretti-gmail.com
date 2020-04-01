const request = require( 'supertest' )
const app = require( '../../src/app' )
const mongoose = require( '../../src/database/index' )

const dataTest = {
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
    producerId: '5e8409fc4419a73addf5c84d'
}

describe( 'PRODUCT_ADD', () => {
    it( 'Deve adicionar um produto', async () => {
        const response = await request( app )
            .post( '/product' )
            .sent( 'authorization', dataTest.producerId )
            .send( product )

        console.log( response )

    } )
} )