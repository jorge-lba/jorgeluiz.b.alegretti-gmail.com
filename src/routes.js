const express = require( 'express' )

const ProducerController = require( './controller/ProducerController' )
const ProductController = require( './controller/ProductController' )

const routes = express.Router()

routes.get( '/producers', ProducerController.index )
routes.post( '/producers', ProducerController.create )
routes.put( '/producers/:id', ProducerController.update)
routes.delete( '/producers/:id', ProducerController.delete )

routes.get( '/products', ProductController.index )
routes.get( '/products/my', ProductController.indexByProducer )
routes.post( '/products', ProductController.create )
routes.put( '/products/:id', ProductController.update )
routes.delete( '/products/:id', ProductController.delete )

module.exports = routes