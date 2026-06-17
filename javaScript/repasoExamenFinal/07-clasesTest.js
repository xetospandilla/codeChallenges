//  07-clasesTest.js

    //  clase producto

class Producto{

    constructor( nombre, precio ){
        this.nombre = nombre
        this.precio = precio
    }

    precioConIva(){
        precioIVA = this.precio * 0.21
        return this.precio + precioIVA
    }
}

    //  test con MOCHA

const assert = require( 'assert' )

describe( "Bloque de pruebas", function(){
    it( "El producto con IVA debería costar 121€", function( hecho ){

        let producto = new Producto( 'NuevoProducto', 100)

        assert.equal( producto.precioConIva(), 121 )

        hecho()
    })
})