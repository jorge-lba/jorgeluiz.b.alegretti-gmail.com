const Product = require( '../models/Product' )
const sortByLocation = require( 'sort-by-distance' )
const requestHttp = require( 'request' )
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
                        amount: { $gte :  amount || 0 },
                    },
                } 
            } )
            
            const usersGeolocation = products.map( user => (
                {
                    userId: user.id,
                    ...user.geolocation
                }
            ))
            
            const option = {
                yName: 'lat',
                xName: 'long'
            }

            const origin = {
                lat: -23.52613,
                long: -47.49338,
            }

            const geoOrdered = sortByLocation( origin, usersGeolocation, option )

            const productsOrdered = geoOrdered.map( user => {
                const userProduct = products.filter( product => {
                    if( product._id == user.userId ){
                        const productJson = product.toJSON()
                        delete user.userId
                        delete user['$init']
                        if( productJson.geolocation ){
                            productJson.geolocation.distance = user.distance 
                        }else{
                            productJson.geolocation= user
                        }
                        return productJson
                    }
                } )
                return userProduct[0]
            })

            response.status(200).json( productsOrdered )
        } catch (error) {
            response.status(400).json( { message: 'Erro de autenticação', error } )
        }
    },

    async create ( request, response ) {

        try {
          
            await requestHttp( process.env.HERE_URL + request.body.cep + '+brazil' , { json: true },async (err, res, body) => {
                const product = request.body
                
                if (err) { return console.log(err); }

                const geolocation = res.body.Response.View[0].Result[0].Location.NavigationPosition[0]

                product.geolocation = {
                    long: geolocation.Longitude,
                    lat: geolocation.Latitude
                }

                const userDb = await Product.create( product )
            

                const userObject = userDb.toJSON()
                
                const JWTData = {
                    iss: 'api',
                    sub: userObject,
                    // exp: Math.floor( Date.now() / 1000 ) + ((60*60)*3)
                }
                
                const token = await Token.generate( JWTData ) 

                response.status(200).json( {token} )
            })

            
        } catch (error) {
            error.errmsg
                ? response.status(400).json( { error: error.errmsg } )
                : response.status(400).json( { error: 'Erro ao efetuar o cadastro' } )
        }

    },
}