//  11-servidorAvanzado.js

const express = require( 'express' )
const app = express()

app.get( ('/producto/:id'), (req, res)=>{

    let id = req.params.id

    if( id === "5" ){
        res.status(200 ).send("Producto encontrado")
    } else {
        res.status(404).send("Producto no encontrado")
    }

})

app.listen( 3000, () => { console.log( "Escuchando en el puerto 3000" )})