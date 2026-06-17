//  04-testing.js

const assert = require( 'assert' )

describe( 'Bloque de pruebas', function(){
    it('La logitud de la palabra "Hola" debería ser 4', function( solve ){

        let word = 'Hola'

        assert.equal( word.length, 4 )
        solve()

    })
})