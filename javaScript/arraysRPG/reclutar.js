//  ------------------------------------------------------
    //  reclutar.js

    //  funcion cedida:

function añadirMiembroBD(nombre, clase) {
    return new Promise((resolver, rechazar) => {
        setTimeout(() => {
            if (nombre && clase) {
                resolver(`¡Bienvenido al gremio, ${nombre} el ${clase}!`);
            } else {
                rechazar("Error 400: Faltan datos para el registro.");
            }
        }, 1000);
    });
}
//  ------------------------------------------------------
    // funcion rutaReclutar:

async function rutaReclutar( req, res ){
    let nombreRecluta = req.body.nombre
    let claseRecluta = req.body.clase

    try{
        let finalRes = await añadirMiembroBD( nombreRecluta, claseRecluta )
        res.send( finalRes )
    } catch( error ){
        res.status( 404 ).send( error )
    }
}
//  ------------------------------------------------------
    //  testing:

let resSimulado = {
    status: function(codigo) { console.log(`⚙️  [Status: ${codigo}]`); return this; },
    send: function(mensaje) { console.log(`📩 [Respuesta]: ${mensaje}\n`); }
};

console.log("▶️ Test 1: POST /reclutar (Con todos los datos)...");
// Fíjate cómo los datos van dentro de 'body'
rutaReclutar({ body: { nombre: "Gimli", clase: "Guerrero" } }, resSimulado);

setTimeout(() => {
    console.log("▶️ Test 2: POST /reclutar (Falta la clase)...");
    rutaReclutar({ body: { nombre: "Legolas" } }, resSimulado);
}, 1500);
//  ------------------------------------------------------