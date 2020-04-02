const Product = require( '../models/Product' )

module.exports = {
    async index ( request, response ) {
        const products = await Product.find()
        response.json( products )
    },

    async indexByProducer ( request, response ) {
        const products = await Product.find( { producerId: request.headers.authorization } )
        response.json( products )
    },

    async create ( request, response ) {
        const requestId = request.headers.authorization
        const productRequest = { 
            producerId: requestId,
            ...request.body
        }
        
        if( requestId ){
            const product = await Product.create( productRequest )
            const idProduct = product._id
            response.json( { message: 'Produto cadastrado', _id: idProduct } )
        }else{
            response.json( { message: 'Requer ID do produtor' } )
        }
        
    
    },

    async update ( request, response ) {
        const producerId = request.headers.authorization
        const productUpdate = request.body
    
        if( producerId ){
            const product = await Product.findById( request.params.id )
            if(producerId === product.producerId){
                
                await Product.findByIdAndUpdate( product._id, productUpdate )
                response.json( { message: 'Produto atualizado' } )
    
            }else{
                response.json( { message: 'Autorização negada - ID do produtor inválido' } )
            }
        }else{
            response.json( { message: 'Pedido negado - ID do produto inválido' } )
        }
    },

    async delete ( request, response ) {
        const producerId = request.headers.authorization
        const product = await Product.findById( request.params.id )
    
        if( request.params.id === product._id.toString() ){
            if(producerId === product.producerId){
                await Product.findByIdAndRemove( product._id )
                response.json( { message: 'Produto deletado' } )
            }else{
                response.json( { message: 'Autorização negada - ID do produtor inválido' } )
            }
        }else{
            response.json( { message: 'Pedido negado - ID do produto inválido' } )
        }
    }, 
}