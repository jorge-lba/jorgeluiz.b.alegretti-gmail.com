const express = require( 'express' )

const ProductController = require( './controller/ProductController' )
const RetailerController = require( './controller/RetailerController' )
const TruckerController = require( './controller/TruckerController' )

const routes = express.Router()

routes.get( '/products', ProductController.index )
routes.get( '/products/list', ProductController.store )
routes.post( '/products', ProductController.create )


routes.get( '/retailers', RetailerController.index )
routes.post( '/retailers', RetailerController.create )

routes.get( '/truckers', TruckerController.index )
routes.post( '/truckers', TruckerController.create )

module.exports = routes