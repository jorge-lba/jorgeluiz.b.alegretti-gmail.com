const JWT = require( 'jsonwebtoken' )

// const generate = payload => (
//     new Promise( resolve => {
//         JWT.sign(  payload, process.env.JWT_KEY, { algorithm: 'HS256' }, function ( err, token ){
            
//             console.log( token )
//             if(err){
//                 throw new Error( 'ERR_INVALID_TOKEN' )
//             }
//             resolve( token )
//         }  )
//     } )
// )

const generate = payload => JWT.sign( payload , process.env.JWT_KEY, { algorithm: 'HS256' } )


module.exports = { generate }