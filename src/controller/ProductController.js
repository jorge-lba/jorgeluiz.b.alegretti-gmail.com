const Product = require( '../models/Product' )
const User = require( '../models/User' )
const Token = require('../auth/toke.auth')
const JWT = require( 'jsonwebtoken' )

module.exports = {
    async index ( request, response ) {
        try {
            const token = request.header('Authorization')
            const products = await Product.find()
            const data = JWT.verify(token, process.env.JWT_KEY)
            response.status(200).json( products )   
        } catch (error) {
            response.status(400).json( { message: 'Erro de autenticação' } )
        }
    },

    async store ( request, response ) {
        try {
            const token = request.header('Authorization')
            const tokenVerify = JWT.verify(token, process.env.JWT_KEY)
            const product = request.query.type
            const amount = request.query.amount
            console.log( product, amount )
            const products = await Product.find( { 
                products: { 
                    $elemMatch : { 
                        name: { 
                            $regex: new RegExp("^" + product.toLowerCase(), "i") 
                        }, 
                        amount: { $gte :  amount },
                    },
                } 
            } )

            response.status(200).json( products )
        } catch (error) {
            response.status(400).json( { message: 'Erro de autenticação', error } )
        }
    },

    async create ( request, response ) {

        try {
            const { email } = request.body
            const product = request.body
            const userDb = await Product.create( product )
            

            const userObject = userDb.toJSON()
            
            const JWTData = {
                iss: 'api',
                sub: userObject,
                // exp: Math.floor( Date.now() / 1000 ) + ((60*60)*3)
            }
            
            const token = await Token.generate( JWTData ) 

        response.status(200).json( {token} )
        } catch (error) {
            error.errmsg
                ? response.status(400).json( { error: error.errmsg } )
                : response.status(400).json( { error: 'Erro ao efetuar o cadastro' } )
        }

    },
}