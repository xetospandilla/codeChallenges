//  13-finalSQLExpress.js

const express = require( 'express' )
const app = express()

app.get ( ('/total/:categoria'), (req, res) => {

    let categoria = req.params.categoria

    let productosPorCategoria = await contarProductos(categoria)

    res.json({"categoría" : categoria, "total" : productosPorCategoria})
})

app.listen( 3000, () => { console.log( "Escuchando en el puerto 3000" )})