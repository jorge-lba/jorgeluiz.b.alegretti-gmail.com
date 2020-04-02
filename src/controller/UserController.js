const User = require( '../models/User' )

module.exports = {
    async index ( request, response ) {
        const user = await User.find()
        response.json( user )
    },

    async create ( request, response ) {
        const user = await User.create( request.body )
        response.json( { ObjectId: user.id } )
    },

    async update ( request, response ) {
        const userId = request.params.id
        const userReq = request.body
    
        const user = await User.findByIdAndUpdate( userId, userReq )
    
        response.json( { message: `Usuário atualizado com sucesso` } )
    },

    async delete ( request, response ) {
        const userId = request.params.id
    
        const user = await User.findByIdAndRemove( userId )
        
        response.json( { message: `Usuário deletado` } )
    }
}