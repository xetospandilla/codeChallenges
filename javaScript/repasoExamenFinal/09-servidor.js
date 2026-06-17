//  09-servidor.js

const express = require( 'express' )
const app = express()

app.get( ( '/prueba' ), function( req, res ){

    res.send("Funciona")

})

app.listen(8080, () =>{
    console.log( "Escuchando en el puerto 8080")
})