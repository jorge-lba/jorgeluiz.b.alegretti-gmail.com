const supertest = require( 'supertest' )
const app = require( '../../src/app' )

const dataTest = {
    producer: {
        id: {},
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

describe( 'PRODUCERS', () => {
    it( 'Deve retornar os produtores cadastrados', async () => {
        const response = await request( app )
            .get('/producers')

        const producers = response.body

        const keysProducerSent = Object.keys( data.producer )
        const valuesProducerSent = Object.values( data.producer )

        function testKeysProducer( producerKeysSent, producerResponse ){
            const keysProducer = Object.keys( producerResponse )

            producerKeysSent.forEach( ( producerKey, index ) => {
                expect( producerKey ).toBe( keysProducer[ index ] )
            } )
        }

        function testValuesProducer( producerValuesSent, producerResponse ){
            const valuesProducer = Object.values( producerResponse )

            producerValuesSent.forEach( ( producerValue, index ) => {
                expect( producerValue ).toBe( valuesProducer[ index ] )
            } )
        }
        
        expect( typeof producers ).toBe( 'array' )

        if( producers.length > 0 ){

            producers.forEach( ( producer ) => {
                testKeysProducer( keysProducerSent, producer )
                testValuesProducer( valuesProducerSent, producers )
            } )

        }
    } )
} )