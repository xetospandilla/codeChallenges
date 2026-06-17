//  10-servidorFinal.js

const express = require( 'express' )

app.get( ( '/api/saludo' ), (req, res) => {
    res.send( "Misión cumplida" )
})

app.listen( 3000, () => {console.log( "Escuchando en el puerto 3000" )})