//  ----------------------------------------------
    // challenge-03.js
//  ----------------------------------------------
    //  funcion obtenerDatos( callback ):

function obtenerDatos( callback ){

    let alumnosAprobados = []

    setTimeout(() => {

        let alumnos = [
            { nombre : "Ana", nota : 8},
            { nombre : "Luis", nota : 4},
            { nombre : "María", nota : 9}
        ]

        callback ( alumnos )
    }, 2000)
}

    // main

obtenerDatos( function( alumnos ) {
    let aprobados = alumnos.filter( a => {
        if( a.nota >= 5){ return a }
    })

    console.log( aprobados )
})
//  ----------------------------------------------