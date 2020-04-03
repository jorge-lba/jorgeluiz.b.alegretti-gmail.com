const Demand = require( '../models/Demand' )
const User = require( '../models/User' )

module.exports = {
    async index ( request, response ) {
        const demands = await Demand.find()
        response.json( demands )
    },

    async indexByUser ( request, response ) {
        const demands = await Demand.find( { userId: request.headers.authorization } )
        response.json( demands )
    },

    async create ( request, response ) {
        const requestId = request.headers.authorization
        const user = await User.findById( requestId )

        const demandRequest = { 
            userId: requestId,
            userAddress: user.address,
            dateAdd: Date.now(),
            ...request.body
        }
        
        if( requestId ){
            const demand = await Demand.create( demandRequest )
            const iddemand = demand._id
            response.json( { message: 'Produto cadastrado', _id: iddemand } )
        }else{
            response.json( { message: 'Requer ID do produtor' } )
        }
        
    
    },

    async update ( request, response ) {
        const userId = request.headers.authorization
        const user = await User.findById( userId )

        const demandUpdate = request.body
        demandUpdate.address = user.address

        if( userId ){
            const demand = await Demand.findById( request.params.id )

            demandUpdate.dateLast = Date.now() 
            
            if( demandUpdate.dateHarvest === undefined ) demandUpdate.dateHarvest = Date.now()  
            
            if(userId === demand.userId){
                
                await Demand.findByIdAndUpdate( demand._id, demandUpdate )
                response.json( { message: 'Produto atualizado' } )
    
            }else{
                response.json( { message: 'Autorização negada - ID do produtor inválido' } )
            }
        }else{
            response.json( { message: 'Pedido negado - ID do produto inválido' } )
        }
    },

    async delete ( request, response ) {
        const userId = request.headers.authorization
        const demand = await Demand.findById( request.params.id )
    
        if( request.params.id === demand._id.toString() ){
            if(userId === demand.userId){
                await demand.findByIdAndRemove( demand._id )
                response.json( { message: 'Produto deletado' } )
            }else{
                response.json( { message: 'Autorização negada - ID do produtor inválido' } )
            }
        }else{
            response.json( { message: 'Pedido negado - ID do produto inválido' } )
        }
    }, 
}