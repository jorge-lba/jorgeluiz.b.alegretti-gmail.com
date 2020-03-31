const request = require( 'supertest' )
const app = require( '../../src/app' )

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

    producer_mongoId: Object,
}


const keysProducerSent = Object.keys( dataTest.producer )
const valuesProducerSent = Object.values( dataTest.producer )

function testKeysProducer( producerKeysSent, producerResponse ){
    const keysProducer = Object.keys( producerResponse )

    producerKeysSent.forEach( ( producerKey, index ) => {
        expect( producerKey ).toBe( keysProducer[ index ] )
    } )
}

function testTypeValuesProducer( producerValuesSent, producerResponse ){
    const valuesProducer = Object.values( producerResponse )

    producerValuesSent.forEach( ( producerValue, index ) => {
        expect( typeof producerValue ).toBe( typeof valuesProducer[ index ] )
    } )
}

describe( 'PRODUCER_CREATE', () => {
    it( 'Deve efetuar o cadastro de um produtor', async () => {
        const response = await request( app )
            .post( '/producers' )
            .send( dataTest.producer )
        
        const keysResponse = Object.keys(response.body)[0]

        expect( keysResponse ).toBe( 'ObjectId' )
        expect( typeof response.body ).toBe( 'object' )
    } )
} )

describe( 'PRODUCER_UPDATE', () => {
    it( 'O produtor deve ser deletado', async () =>{
        const response = await request( app )
            .put( `/produces/${1}` )
        
        const keyResponse = Object.keys( response.body )[0]
    
        expect( keyResponse ).toBe( 'message' )
        expect( response.body[ keyResponse ] ).toBe( 'O cadastro do produtor foi atualizado' )
    } )
} )

describe( 'PRODUCERS', () => {
    it( 'Deve retornar os produtores cadastrados', async () => {
        const response = await request( app )
            .get('/producers')

        const producers = response.body

        if( producers.length > 0 ){
            producers.forEach( ( producer ) => {
                testKeysProducer( keysProducerSent, producer )
                testTypeValuesProducer( valuesProducerSent, producer )
            } )

        } 
    } )
} )
