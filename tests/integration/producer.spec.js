const request = require( 'supertest' )
const app = require( '../../src/app' )
const mongoose = require( '../../src/database/index' )

const dataTest = {
    producer: {
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

    producerNewName: 'João',
    objectID: String
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
        const producerSend = Object.assign( {}, dataTest.producer )
        delete producerSend._id

        const response = await request( app )
            .post( '/producers' )
            .send( producerSend )
        
        dataTest.objectID = response.body.ObjectId

        const keysResponse = Object.keys(response.body)[0]

        expect( keysResponse ).toBe( 'ObjectId' )
        expect( typeof response.body ).toBe( 'object' )
    } )
} )

describe( 'PRODUCER_UPDATE', () => {
    it( 'O produtor deve ser atualizado', async () =>{
        const producer = Object.assign( {}, dataTest.producer)
        producer.name = dataTest.producerNewName

        const response = await request( app )
            .put( `/producers/${dataTest.objectID}` )
            .send( producer )
                
        const keyResponse = Object.keys( response.body )[0]
    
        expect( keyResponse ).toBe( 'message' )
        expect( response.body[ keyResponse ] ).toBe( `O cadastro do produtor ${dataTest.producer.name} foi atualizado para ${ producer.name }` )
    } )
} )

describe( 'PRODUCERS', () => {
    it( 'Deve retornar os produtores cadastrados', async () => {
        const response = await request( app )
            .get('/producers')

        const producers = response.body
        console.log(dataTest.objectID)
        if( producers.length > 0 ){
            producers.forEach( ( producer ) => {
                testKeysProducer( ["_id",...keysProducerSent], producer )
                testTypeValuesProducer( [ dataTest.objectID,...valuesProducerSent], producer )
            } )

        } 
    } )
} )


describe( 'PRODUCER_DELETE', () => {
    afterAll( async () => await mongoose.connection.close() )

    it( 'O produtor deve ser deletado', async () =>{
            
        const response = await request( app )
            .delete( `/producers/${dataTest.objectID}` )
        
        const keyResponse = Object.keys( response.body )[0]

        expect( keyResponse ).toBe( 'message' )
        expect( response.body[ keyResponse ] ).toBe( `O produtor ${ dataTest.producerNewName } foi deletado` )
    } )
} )