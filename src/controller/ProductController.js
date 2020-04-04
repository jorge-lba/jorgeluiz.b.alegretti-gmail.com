const Product = require( '../models/Product' )
const User = require( '../models/User' )

module.exports = {
    async index ( request, response ) {
        const products = await Product.find()
        response.json( products )
    },

    // async indexByUser ( request, response ) {
    //     const products = await Product.find( { userId: request.headers.authorization } )
    //     response.json( products )
    // },

    async create ( request, response ) {
        // const requestId = request.headers.authorization
        // const producer = await User.findById( requestId )

        // const productRequest = { 
        //     userId: requestId,
        //     userAddress: producer.address,
        //     dateAdd: Date.now(),
        //     ...request.body
        // }
        const { email } = request.body
        const [user] = await Product.find( { email:email } )
        const product = request.body
        console.log( user )

        if(user) {

            product.products.forEach( product => {
                user.products.push( product )
            } )

            await Product.findOneAndUpdate( { email: email }, user )
            
        }else{
            await Product.create( product )
        }

        response.json( { message: 'Produto cadastrado' } )

        // if( requestId ){
        //     const product = await Product.create( productRequest )
        //     const idProduct = product._id
        //     response.json( { message: 'Produto cadastrado', _id: idProduct } )
        // }else{
        //     response.json( { message: 'Requer ID do produtor' } )
        // }
        
    
    },

    async update ( request, response ) {
        const userId = request.headers.authorization
        const producer = await User.findById( userId )

        const productUpdate = request.body
        productUpdate.address = producer.address

        if( userId ){
            const product = await Product.findById( request.params.id )

            productUpdate.dateLast = Date.now() 
            
            if( productUpdate.dateHarvest === undefined ) productUpdate.dateHarvest = Date.now()  
            
            if(userId === product.userId){
                
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
        const userId = request.headers.authorization
        const product = await Product.findById( request.params.id )
    
        if( request.params.id === product._id.toString() ){
            if(userId === product.userId){
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