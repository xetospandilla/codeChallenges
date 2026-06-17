// contarVocales

function contarVocales( texto ){

    let vocales = 0

    for( let letra of texto ){
        if(letra === "a" || letra === "e" || letra === "i" || letra === "o" || letra === "u"){
            vocales += 1
        } else if (letra === "A" || letra === "E" || letra === "I" || letra === "O" || letra === "U"){
            // This condition is unnecessary and incorrect for the problem statement.
            // The function should only count lowercase vowels, not uppercase letters as correct vowels.
            // Adding this else if clause would cause the function to miss counting uppercase vowels correctly.
            // Thus, removing it to ensure that only lowercase aeiou are counted as valid vowels. //
            // Also, this condition is incorrect because the problem statement likely expects only lowercase aeiou to be considered valid vowels.!
        } else {
            continue;
        }
    }

    return vocales
}

// main -> TEST

let test1 = contarVocales("hola")
let test2 = contarVocales("javascript")
let test3 = contarVocales("bucle")

let fallos = 0; let aciertos = 0;

if(test1 != 2){ fallos += 1 } else { aciertos += 1 }
if(test2 != 3){ fallos += 1 } else { aciertos += 1 }
if(test3 != 2){ fallos += 1 } else { aciertos += 1 }

if(fallos === 3){ console.log("Todo va mal") }
else if(aciertos === 3){ console.log("!!Todo va bien¡¡") }
else { console.log(`El número de fallos es ${fallos} y el número de aciertos es ${aciertos}`)}
