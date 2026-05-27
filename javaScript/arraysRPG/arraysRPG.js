// ------------------------------------------------------
// arraysRPG.js

    // ------------------------------------------------------
    //array facilitado:

const jugadores = [
    { nombre: "Gimli", clase: "Guerrero", puntos: 15 },
    { nombre: "Legolas", clase: "Arquero", puntos: 20 },
    { nombre: "Aragorn", clase: "Guerrero", puntos: 25 },
    { nombre: "Gandalf", clase: "Mago", puntos: 50 },
    { nombre: "Boromir", clase: "Guerrero", puntos: 10 }
];

    //  funcion facilitada:

function buscarClaseEnBD( nombreJugador ){
    return new Promise(( resolve, error ) => {
        setTimeout(() => {
            if( nombreJugador === "Gandalf" ){
                resolve("Mago")
            } else {
                error("Error: Jugador no encontrado en la base de datos")
            }
        }, 1000) 
    })
}

    // funcion facilitada:

function forjarEspada(cantidadOro) {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            if (cantidadOro >= 100) {
                resolver("¡Espada Legendaria forjada con éxito!");
            } else {
                rechazar("Error: Oro insuficiente. ¡Vuelve a las minas, novato!");
            }
        }, 1500);
    });
}

// ------------------------------------------------------
    //  funcion sumarPuntosPorClase( lista, claseBuscada ):

function sumarPuntosPorClase( lista, claseBuscada ){

    return lista.filter( jugador => jugador.clase === claseBuscada ).reduce( (acc, jugador) => acc + jugador.puntos, 0 )

}
// ------------------------------------------------------
    //  funcion jugadorConMasPuntos( lista ):

function jugadorConMasPuntos ( lista ){

    let ganador = lista.reduce(function( mejorAnterior, jugadorActual ){
        if( mejorAnterior.puntos < jugadorActual.puntos){
            return jugadorActual
        } return mejorAnterior
    })

    return ganador.nombre
}
// ------------------------------------------------------
    //  funcion obtenerDatos():

async function obtenerDatos(){
    try{
        let resultado = await buscarClaseEnBD( "Gandalf" )
        return `¡Éxito! La clase es ${ resultado }`
    } catch( error ){
        return`Ups, algo falló: ${ error }`
    }
}
// ------------------------------------------------------
    // funcion visitarHerrero(miOro)

async function visitarHerrero( miOro ){
    try{
        let resultado = await forjarEspada( miOro )
        return `!Éxito¡ La espada se ha forjado`
    } catch( error ){
        return `Ups, no tienes suficiente oro`
    }
}
// ------------------------------------------------------
//  testing:
async function ejecutarTest(){

    let mainTest = sumarPuntosPorClase( jugadores, "Guerrero")
    let mainTest2 = jugadorConMasPuntos( jugadores )
    let mainTest3 = await obtenerDatos()
    let mainTest4 = await visitarHerrero( 150 )
    let mainTest5 = await visitarHerrero( 50 )

    const resultadosTest = [
        {resultadoTest1 : mainTest},
        {resultadoTest2 : mainTest2},
        {resultadoTest3 : mainTest3},
        {resultadoTest4 : mainTest4},
        {resultadoTest5 : mainTest5},
    ]

    console.log(resultadosTest)
}

ejecutarTest()
// ------------------------------------------------------