//  02-arrays.js

const arr =[
    { nombre: 'Ana', edad : 20 },
    { nombre: 'Luis', edad: 25}
]

let nombres = arr.map( persona => {
    return persona.nombre
})