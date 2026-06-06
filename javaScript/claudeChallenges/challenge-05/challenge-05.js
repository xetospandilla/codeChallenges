//  ----------------------------------------------
    //  challenge-05.js
//  ----------------------------------------------

    //  fichero de texto facilitado:

const fs = require("fs")

fs.readFile("temperaturas.txt", "utf8", function( err, contenido ){

    if( err ){
        console.log( "Hubo un error al leer el fichero de texto." )
        return
    }

    const temperaturas = JSON.parse( contenido )
    console.log( datos )
})

//  ----------------------------------------------
    //  funcion calcularMedia( datos ):

function calcularMedia( datos ){

    let suma = datos.reduce( ( acc, medida ) =>{
        acc += medida.temepratura
    }, 0)

    return suma / datos.length
}
//  ----------------------------------------------
    //  funcion encontrarMaxima( datos ):

function encontrarMaxima( datos ){

    return datos.reduce( ( max, medida ) => {
        if( medida.temperatura > max.temperatura ){
            max = medida
        } return max
    }, datos[0])
}
//  ----------------------------------------------
    //  funcion encontrarMinima( datos ):

function encontrarMinima( datos ){
    return datos.reduce( (min, medida) => {
        if( medida.temperatura < min.temperatura ){
            min = medida
        } return min
    }, datos[0])
}
//  ----------------------------------------------