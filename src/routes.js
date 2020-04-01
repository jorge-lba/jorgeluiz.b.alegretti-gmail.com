const express = require( 'express' )
const Producer = require( './models/Producer' )
const Product = require( './models/Product' )

const routes = express.Router()

routes.get( '/producers', async ( request, response ) => {
    const producers = await Producer.find()
    response.json( producers )
} )

routes.post( '/producers', async ( request, response ) => {
    const producer = await Producer.create( request.body )
    response.json( { ObjectId: producer.id } )
} )

routes.put( '/producers/:id', async ( request, response ) => {
    const producerId = request.params.id
    const producerReq = request.body

    const producer = await Producer.findByIdAndUpdate( producerId, producerReq )

    response.json( { message: `O cadastro do produtor ${producer.name} foi atualizado para ${ producerReq.name }` } )
} )

routes.delete( '/producers/:id', async ( request, response ) => {
    const producerId = request.params.id

    const producer = await Producer.findByIdAndRemove( producerId )
    
    response.json( { message: `O produtor ${ producer.name } foi deletado` } )
} )

routes.post( '/products', async ( request, response ) => {
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
    

} )

routes.get( '/products', async ( request, response ) => {
    const products = await Product.find()
    response.json( products )
} )

routes.get( '/products/my', async ( request, response ) => {
    const products = await Product.find( { producerId: request.headers.authorization } )
    response.json( products )
} )

routes.put( '/products/:id', async ( request, response ) => {
    const producerId = request.headers.authorization

    if( producerId ){
        const product = await Product.findById( request.params.id )
        producerId === product.producerId
            ? response.json( { message: 'Produto atualizado' } )
            : response.json( { message: 'Autorização negada - ID do produtor inválido' } )
    }else{
        response.json( { message: 'Pedido negado - ID do produto inválido' } )
    }
} )

routes.delete( '/products/:id', async ( request, response ) => {
    const producerId = request.headers.authorization

    if( producerId ){
        const product = await Product.findById( request.params.id )
        if(producerId === product.producerId){
            await Product.findByIdAndRemove( product._id )
            response.json( { message: 'Produto deletado' } )
        }else{
            response.json( { message: 'Autorização negada - ID do produtor inválido' } )
        }
    }else{
        response.json( { message: 'Pedido negado - ID do produto inválido' } )
    }
} )

module.exports = routes