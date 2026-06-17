//  03-promesas.js

    //  Creación de la promesa:

function crearPromesa(){

    return new Promise( (solve, err)=>{

        setTimeout(function(){
            solve("Operación Completada")
        }, 1000)
    })
}

    //  Llamada a la promesa:

async function llamadaPromesa(){

    try{
        let resultado = await crearPromesa()
        console.log( resultado )
    } catch ( err ){
        console.log( "Error", err )
    }

}