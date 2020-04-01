const request = require( 'supertest' )
const app = require( '../../src/app' )
const mongoose = require( '../../src/database/index' )

const dataTest = {
    product: {
        producerId: String,
        producerLocation: String,
        name: String,
        type: String,
        amount: Number,
        valuePerGarm: Number,
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