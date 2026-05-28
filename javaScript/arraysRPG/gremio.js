// gremio.js

//  ------------------------------------------------------
    //  funcion buscarPocionBD( nombrePocion ):

function buscarPocionBD( nombrePocion ){
    return new Promise( (resolve, error) => {
        setTimeout(function( nombrePocion ){
            if( nomrbePocion === "Mana" ){
                resolve( 100 )
            } else {
                error( "Error: Poción no encontrada" )
            }
        },1000)
    })
}
//  ------------------------------------------------------
    //funcion rutaComprarPocion( req, res ):

async function rutaComprarPocion( req, res ){

    let nombrePocion = req.params.nombre

    try{
        let finalRes = await buscarPocionBD( nombrePocion )
        res.send( finalRes )
    } catch( error ){
        res.status(404).send( error )
    }
}
//  ------------------------------------------------------