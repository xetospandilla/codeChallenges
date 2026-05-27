// changeCalculator.js

function calcularCambio( cambio ){
    
    let devolverCambio = []

    while( cambio > 0 ){

        if( cambio >= 5 ){
            devolverCambio.push( 5 )
            cambio -= 5
        } else if ( cambio >= 2 ){
            devolverCambio.push( 2 )
            cambio -= 2
        } else {
            devolverCambio.push( 1 )
            cambio -= 1
        }

    }

    return devolverCambio
}

// main

let test1 = calcularCambio( 13 )
let test2 = calcularCambio( 4 )
let test3 = calcularCambio( 5 )

let res1 = [ 5, 5, 2, 1]
let res2 = [ 2, 2 ]
let res3 = [ 5 ]

let err1 = 0; let succes1 = 0
let err2 = 0; let succes2 = 0
let err3 = 0; let succes3 = 0

for( let i = 0; i < test1.length; i++){
    if( test1[i] != res1[i] ){
        err1 += 1
    } else {
        succes1 += 1
    }
}

for( let i = 0; i < test2.length; i++){
    if( test2[i] != res2[i] ){
        err2 += 1
    } else {
        succes2 += 1
    }
}

for( let i = 0; i < test3.length; i++){
    if( test3[i] != res3[i] ){
        err3 += 1
    } else {
        succes3 += 1
    }
}

if(err1 === 4){ console.log( "El test1 salió mal" )}
if(err2 === 2){ console.log( "El test2 salió mal" )}
if(err3 === 1){ console.log( "El test3 salió mal" )}
if( succes1 === 4 && succes2 === 2 && succes3 === 1 ){
    console.log( "!!Todo funciona correctamente¡¡")
}