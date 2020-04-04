const express = require( 'express' )

const ProducerController = require( './controller/ProducerController' )
const ProductController = require( './controller/ProductController' )
const DemandController = require( './controller/DemandController' )
const UserController = require( './controller/UserController' )

const routes = express.Router()

// routes.get( '/users', UserController.index )
// routes.post( '/users', UserController.create )
// routes.put( '/users/:id', UserController.update)
// routes.delete( '/users/:id', UserController.delete )

// routes.get( '/producers', ProducerController.index )
// routes.post( '/producers', ProducerController.create )
// routes.put( '/producers/:id', ProducerController.update)
// routes.delete( '/producers/:id', ProducerController.delete )

routes.get( '/products', ProductController.index )
// routes.get( '/products/my', ProductController.indexByUser )
routes.post( '/products', ProductController.create )
routes.put( '/products/:id', ProductController.update )
routes.delete( '/products/:id', ProductController.delete )

// routes.get( '/demands', DemandController.index )
// routes.get( '/demands/my', DemandController.indexByUser )
// routes.post( '/demands', DemandController.create )
// routes.put( '/demands/:id', DemandController.update )
// routes.delete( '/demands/:id', DemandController.delete )

module.exports = routes