const request = require( 'supertest' )
const app = require( '../../src/app' )
const mongoose = require( '../../src/database/index' )

const dataTest = {
    product: {
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
    productId: String,
}

describe( 'PRODUCT_ADD', () => {
    it( 'Deve adicionar um produto', async () => {
        const response = await request( app )
            .post( '/products' )
            .set( 'authorization', dataTest.producerId )
            .send( dataTest.product )

        expect( response.body ).toHaveProperty( 'message', 'Produto cadastrado' )
        expect( response.body ).toHaveProperty( '_id' )



    } )
} )

describe( 'PRODUCT_LIST', () => {
    it( 'Deve retornar uma lista com todos os produtos cadastrados', async () => {
        const response = await request( app )
            .get( '/products' )
        
        expect( typeof response.body ).toBe( 'array' )
    } )
} )

describe( 'PRODUCT_UPDATE', () => {
    it( 'Deve atualizar o cadastro do produto', async () => {
        const response = await request( app )
            .put( `/protucts/${}` )
    } )
} )

