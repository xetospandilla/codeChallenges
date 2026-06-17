//  ----------------------------------------------
    //  Challenge #1
//  ------------------------------------------
    //  array facilitado:

var productos = [
    { nombre: "camiseta", precio: 12 },
    { nombre: "zapatillas", precio: 85 },
    { nombre: "gorra", precio: 8 },
    { nombre: "chaqueta", precio: 120 },
    { nombre: "calcetines", precio: 3 }
]
//  ----------------------------------------------
    // funcion obtener nombres de los productos con precio mayor a 10€ y precio total de esos productos

function obtenerNombre( productos ){
    let nombres = productos.filter( p => {
        return p.precio > 10
    }).map( c => {
        return c.nombre
    })

    let total = nombres.reduce( (acc,p) => {
        return acc + p.precio
    }, 0)

    return { nombres: nombres, total: total }
}
//  ----------------------------------------------
    // testing:

let test1 = obtenerNombre( productos )

let testingTable = [
    { ResultadoTest1Nombres : test1.nombres },
    { ResultadoTest1Total : test1.total}
]

console.log( testingTable )
//  ----------------------------------------------