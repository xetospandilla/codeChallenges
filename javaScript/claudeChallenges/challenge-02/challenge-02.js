//  ----------------------------------------------  
    // Challenge #2
//  ----------------------------------------------
    //  array facilitado:
const horario = {
    lunes:    [ {asignatura: "matemáticas", hora: 9},  {asignatura: "inglés", hora: 11} ],
    martes:   [ {asignatura: "programación", hora: 10}, {asignatura: "matemáticas", hora: 12} ],
    miercoles:[ {asignatura: "inglés", hora: 9},  {asignatura: "física", hora: 11} ],
    jueves:   [ {asignatura: "matemáticas", hora: 9},  {asignatura: "física", hora: 10} ],
    viernes:  [ {asignatura: "programación", hora: 11} ]
}
//  ----------------------------------------------
    //  funcion buscarAsignatura( horario, matemáticas ):

function buscarAsignatura( horario, asignatura ){

    let listaClase = []

    Object.keys(horario).forEach( dia =>{
        horario[dia].forEach( clase => {
            if( clase.asignatura === asignatura ){
                listaClase.push( clase )
            }
        })
    })

    return listaClase
}
//  ----------------------------------------------
    //  testing:

let test1 = buscarAsignatura( horario, "programación" )

const testingTable = [
    { ResultadoDelTest1 : test1 }
]

console.log( JSON.stringify( testingTable, null, 2) )
//  ----------------------------------------------