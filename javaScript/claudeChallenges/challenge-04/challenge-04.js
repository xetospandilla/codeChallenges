//  ----------------------------------------------
    //  challenge-04.js
//  ----------------------------------------------
    //  objeto pila:

const Pila = {

    elementos : [],

    apilar : function( elemento ){
        this.elementos.push( elemento )
    },

    desapilar : function(){
        this.elementos.pop()
    },

    cima : function(){
        return this.elementos[this.elementos.length - 1]
    }
}
//  ----------------------------------------------
    // testing:

function test1( ){
    Pila.apilar( 10 )
    Pila.apilar( 20 )
    Pila.apilar( 30 )

    if( Pila.elementos[0] === 10 && Pila.elementos[1] ===  20 && Pila.elementos[2] === 30){
        return "Primer test completado con éxito"
    } return "El primer test falló"
}

function test2( ){
    let antesDeDesapilar = Pila.cima()

    Pila.desapilar()

    let despuesDeDesapilar = Pila.cima()

    if( antesDeDesapilar === 30 && despuesDeDesapilar === 20 ){
        return "Segundo test completado con éxito"
    } return "El segundo test falló"
}

const testingTable = [
    { ResultadoTest1 : test1( ) },
    { ResultadoTest2 : test2( ) }
]

console.log( testingTable )
//  ----------------------------------------------