const Producer = require( '../models/Producer' )

module.exports = {
    async index ( request, response ) {
        const producers = await Producer.find()
        response.json( producers )
    },

    async create ( request, response ) {
        const producer = await Producer.create( request.body )
        response.json( { ObjectId: producer.id } )
    },

    async update ( request, response ) {
        const producerId = request.params.id
        const producerReq = request.body
    
        const producer = await Producer.findByIdAndUpdate( producerId, producerReq )
    
        response.json( { message: `O cadastro do produtor ${producer.name} foi atualizado para ${ producerReq.name }` } )
    },

    async delete ( request, response ) {
        const producerId = request.params.id
    
        const producer = await Producer.findByIdAndRemove( producerId )
        
        response.json( { message: `O produtor ${ producer.name } foi deletado` } )
    }
}