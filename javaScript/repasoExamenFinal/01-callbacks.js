//  01-callbacks.js

console.log("A")

setTimeout(function(){
    console.log("B")
}, 0)

console.log("C")

    // La salida esperada es A, C, B ya que el setTimeout realentiza ligeralmente la ejecución del código