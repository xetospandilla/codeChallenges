// =====================================================================
//  CORRECCIONES DE ERRORES Y MALAS PRÁCTICAS
//  Archivo generado con todas las soluciones y mejoras
// =====================================================================
//  Los errores/malas prácticas están comentados con "// [BUG]" 
//  o "// [MALA PRÁCTICA]" y su versión corregida debajo.
// =====================================================================

// =====================================================================
//  1. arraysRPG/arraysRPG.js
// =====================================================================

const jugadores = [
    { nombre: "Gimli", clase: "Guerrero", puntos: 15 },
    { nombre: "Legolas", clase: "Arquero", puntos: 20 },
    { nombre: "Aragorn", clase: "Guerrero", puntos: 25 },
    { nombre: "Gandalf", clase: "Mago", puntos: 50 },
    { nombre: "Boromir", clase: "Guerrero", puntos: 10 }
];

function buscarClaseEnBD(nombreJugador) {
    return new Promise((resolve, reject) => {   // [MALA PRÁCTICA] 'error' -> 'reject' (nombre más estándar)
        setTimeout(() => {
            if (nombreJugador === "Gandalf") {
                resolve("Mago");
            } else {
                reject("Error: Jugador no encontrado en la base de datos");
            }
        }, 1000);
    });
}

function forjarEspada(cantidadOro) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cantidadOro >= 100) {
                resolve("¡Espada Legendaria forjada con éxito!");
            } else {
                reject("Error: Oro insuficiente. ¡Vuelve a las minas, novato!");
            }
        }, 1500);
    });
}

function sumarPuntosPorClase(lista, claseBuscada) {
    return lista
        .filter(jugador => jugador.clase === claseBuscada)
        .reduce((acc, jugador) => acc + jugador.puntos, 0);
}

function jugadorConMasPuntos(lista) {
    // [BUG] Si lista está vacía, reduce sin valor inicial lanza TypeError.
    // Solución: añadimos valor inicial y manejamos lista vacía.
    if (lista.length === 0) {
        return null;
    }

    let ganador = lista.reduce(function(mejorAnterior, jugadorActual) {
        if (mejorAnterior.puntos < jugadorActual.puntos) {
            return jugadorActual;
        }
        return mejorAnterior;
    });

    return ganador.nombre;
}

async function obtenerDatos() {
    try {
        let resultado = await buscarClaseEnBD("Gandalf");
        return `¡Éxito! La clase es ${resultado}`;
    } catch (error) {
        return `Ups, algo falló: ${error}`;
    }
}

async function visitarHerrero(miOro) {
    try {
        let resultado = await forjarEspada(miOro);
        // [BUG] '!Éxito¡' -> Los signos de exclamación estaban invertidos
        return `¡Éxito! La espada se ha forjado`;
    } catch (error) {
        return `Ups, no tienes suficiente oro`;
    }
}

// Testing:
async function ejecutarTest() {
    let mainTest = sumarPuntosPorClase(jugadores, "Guerrero");
    let mainTest2 = jugadorConMasPuntos(jugadores);
    let mainTest3 = await obtenerDatos();
    let mainTest4 = await visitarHerrero(150);
    let mainTest5 = await visitarHerrero(50);

    const resultadosTest = [
        { resultadoTest1: mainTest },
        { resultadoTest2: mainTest2 },
        { resultadoTest3: mainTest3 },
        { resultadoTest4: mainTest4 },
        { resultadoTest5: mainTest5 },
    ];

    console.log(resultadosTest);
}

ejecutarTest();


// =====================================================================
//  2. arraysRPG/gremio.js
// =====================================================================

function buscarPocionBD(nombrePocion) {
    return new Promise((resolve, reject) => {   // [MALA PRÁCTICA] 'error' -> 'reject'
        setTimeout(() => {
            // [BUG GRAVE] El callback de setTimeout tenía un parámetro 'nombrePocion'
            // que sombreaba (shadowing) la variable exterior, dejándola sin usar.
            // Además había un TYPO: 'nomrbePocion' en vez de 'nombrePocion'.
            if (nombrePocion === "Mana") {
                resolve(100);
            } else {
                reject("Error: Poción no encontrada");
            }
        }, 1000);
    });
}

async function rutaComprarPocion(req, res) {
    let nombrePocion = req.params.nombre;

    try {
        let finalRes = await buscarPocionBD(nombrePocion);
        res.send(finalRes);
    } catch (error) {
        res.status(404).send(error);
    }
}


// =====================================================================
//  3. arraysRPG/HerreriaEnana.sql - NO ES JS, pero se señalan los problemas
// =====================================================================
/*
  [BUG] La tabla 'Proveedores' se referencia en el JOIN (línea 26) y en la
  subconsulta (línea 18) pero NUNCA se crea en este script. Si se ejecuta
  de forma independiente, fallará por tabla inexistente.

  [BUG de inconsistencia] En la subconsulta se usa 'Proveedores.IdProveedor'
  mientras que en el JOIN se usa 'Proveedores.IdEmpresa'. Debería ser
  consistente. Generalmente la clave primaria se llama 'IdProveedor' y
  la foránea en Armas sería 'IdProveedor', por lo que el JOIN debería ser:

  INNER JOIN Proveedores ON Armas.IdProveedor = Proveedores.IdProveedor
*/


// =====================================================================
//  4. arraysRPG/jefeFinal.js
// =====================================================================

const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database(':memory:');

bd.serialize(() => {
    bd.run(`CREATE TABLE Heroes (HeroeID INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Clase TEXT)`);
    bd.run(`INSERT INTO Heroes (Nombre, Clase) VALUES ('Gimli', 'Guerrero')`);
    bd.run(`INSERT INTO Heroes (Nombre, Clase) VALUES ('Gandalf', 'Mago')`);

    let sqlCrearTabla = `
        CREATE TABLE Misiones (
            MisionID INTEGER PRIMARY KEY AUTOINCREMENT,
            Titulo TEXT,
            Oro REAL,
            HeroeID INTEGER
        )
    `;
    bd.run(sqlCrearTabla);

    let sqlInsertar = `
        INSERT INTO Misiones (Titulo, Oro, HeroeID) 
        VALUES (
            'Derrotar al Dragón', 
            500, 
            (SELECT HeroeID FROM Heroes WHERE Nombre = 'Gandalf')
        )
    `;
    bd.run(sqlInsertar);

    let sqlJoin = `
        SELECT Heroes.Nombre, Misiones.Titulo 
        FROM Heroes
        JOIN Misiones ON Heroes.HeroeID = Misiones.HeroeID
        WHERE Misiones.Oro > 100
    `;

    bd.all(sqlJoin, [], (err, filas) => {
        if (err) {
            console.log("Fallo crítico en el SQL:", err.message);
        } else {
            console.log("¡JEFE DERROTADO! Resultados del JOIN:");
            console.table(filas);
        }
    });
});

// [NOTA] package.json necesita nombre, versión y demás campos para ser
// un proyecto npm estándar. Se eliminaron los emojis para mantener
// compatibilidad con entornos que no soporten UTF-8 extendido.


// =====================================================================
//  5. arraysRPG/reclutar.js
// =====================================================================

function anadirMiembroBD(nombre, clase) {   // [MALA PRÁCTICA] 'añadir' tiene ñ; mejor evitar eñes en código
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (nombre && clase) {
                resolve(`¡Bienvenido al gremio, ${nombre} el ${clase}!`);
            } else {
                reject("Error 400: Faltan datos para el registro.");
            }
        }, 1000);
    });
}

async function rutaReclutar(req, res) {
    let nombreRecluta = req.body.nombre;
    let claseRecluta = req.body.clase;

    try {
        let finalRes = await anadirMiembroBD(nombreRecluta, claseRecluta);
        res.send(finalRes);
    } catch (error) {
        // [BUG] Código 404 (Not Found) para error de validación.
        // Lo correcto es 400 (Bad Request).
        res.status(400).send(error);
    }
}

// Testing:
let resSimulado = {
    status: function(codigo) { console.log(`[Status: ${codigo}]`); return this; },
    send: function(mensaje) { console.log(`[Respuesta]: ${mensaje}\n`); }
};

console.log("Test 1: POST /reclutar (Con todos los datos)...");
rutaReclutar({ body: { nombre: "Gimli", clase: "Guerrero" } }, resSimulado);

setTimeout(() => {
    console.log("Test 2: POST /reclutar (Falta la clase)...");
    rutaReclutar({ body: { nombre: "Legolas" } }, resSimulado);
}, 1500);


// =====================================================================
//  6. changeCalculator/changeCalculator.js
// =====================================================================

function calcularCambio(cambio) {
    let devolverCambio = [];

    while (cambio > 0) {
        if (cambio >= 5) {
            devolverCambio.push(5);
            cambio -= 5;
        } else if (cambio >= 2) {
            devolverCambio.push(2);
            cambio -= 2;
        } else {
            devolverCambio.push(1);
            cambio -= 1;
        }
    }

    return devolverCambio;
}

// Tests mejorados
function arraysIguales(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

let test1 = calcularCambio(13);
let test2 = calcularCambio(4);
let test3 = calcularCambio(5);

let res1 = [5, 5, 2, 1];
let res2 = [2, 2];
let res3 = [5];

// [MALA PRÁCTICA] Variables con typos ('succes1', 'err1') y lógica
// de testing frágil que asumía longitudes fijas. Se reemplaza por
// comparación robusta.
let resultados = [
    { nombre: "Test 13€", obtenido: test1, esperado: res1, exito: arraysIguales(test1, res1) },
    { nombre: "Test 4€",  obtenido: test2, esperado: res2, exito: arraysIguales(test2, res2) },
    { nombre: "Test 5€",  obtenido: test3, esperado: res3, exito: arraysIguales(test3, res3) },
];

resultados.forEach(r => {
    if (r.exito) {
        console.log(`✅ ${r.nombre}: ¡Correcto!`);
    } else {
        console.log(`❌ ${r.nombre}: Falló. Esperado: ${JSON.stringify(r.esperado)}, Obtenido: ${JSON.stringify(r.obtenido)}`);
    }
});

let todosBien = resultados.every(r => r.exito);
// [BUG] '!!Todo funciona correctamente¡¡' -> signos invertidos
console.log(todosBien ? "¡¡Todo funciona correctamente!!" : "Hay tests que fallan");


// =====================================================================
//  7. passwordValidator/passwordValidator.js
// =====================================================================

function validatePassword(password) {
    // [MALA PRÁCTICA] Usar console.log dentro de una función de validación
    // La función debe devolver un resultado, no imprimir.
    // Mejor: devolver un objeto con { valido: boolean, errores: string[] }

    let errores = [];

    // Tiene al menos 8 caracteres?
    if (password.length < 8) {
        errores.push("The password has to have a minimum of 8 characters");
    }

    // Contiene espacios?
    if (password.includes(" ")) {
        errores.push("The password can't contain spaces");
    }

    // Contiene al menos un número?
    let numeros = "0123456789";
    let tieneNumero = false;
    for (let i = 0; i < password.length; i++) {
        if (numeros.includes(password[i])) {
            tieneNumero = true;
            break;  // [MEJORA] Salir del bucle al encontrar el primer número
        }
    }

    if (!tieneNumero) {
        errores.push("The password must contain at least one number from 0 to 9");
    }

    return {
        valido: errores.length === 0,
        errores: errores
    };
}

// La nueva función devuelve resultado en lugar de imprimir
let resultadoPass = validatePassword("abc123");
console.log(resultadoPass);


// =====================================================================
//  8. vocales/vocales.js
// =====================================================================

function contarVocales(texto) {
    let vocales = 0;
    let vocalesLista = "aeiouAEIOU";  // [BUG] Solo se contaban minúsculas

    for (let letra of texto) {
        if (vocalesLista.includes(letra)) {
            vocales += 1;
        }
        // El else if vacío se elimina. No hacer nada con las no-vocales.
    }

    return vocales;
}

// Tests
let testV1 = contarVocales("hola");       // a, o -> 2
let testV2 = contarVocales("javascript"); // a, a, i -> 3
let testV3 = contarVocales("bucle");      // u, e -> 2
let testV4 = contarVocales("HOLA");       // O, A -> 2  (antes no contaba mayúsculas)

let fallos = 0;
let aciertos = 0;

if (testV1 !== 2) { fallos += 1; } else { aciertos += 1; }
if (testV2 !== 3) { fallos += 1; } else { aciertos += 1; }
if (testV3 !== 2) { fallos += 1; } else { aciertos += 1; }
if (testV4 !== 2) { fallos += 1; } else { aciertos += 1; }

if (fallos === 4) {
    console.log("Todo va mal");
} else if (aciertos === 4) {
    // [BUG] '!!Todo va bien¡¡' -> signos invertidos
    console.log("¡¡Todo va bien!!");
} else {
    console.log(`El número de fallos es ${fallos} y el número de aciertos es ${aciertos}`);
}


// =====================================================================
//  9. claudeChallenges/challenge-01/challenge-01.js
// =====================================================================

const productos = [       // [MALA PRÁCTICA] 'var' -> 'const'
    { nombre: "camiseta", precio: 12 },
    { nombre: "zapatillas", precio: 85 },
    { nombre: "gorra", precio: 8 },
    { nombre: "chaqueta", precio: 120 },
    { nombre: "calcetines", precio: 3 }
];

function obtenerNombre(productos) {
    let nombres = productos
        .filter(p => p.precio > 10)
        .map(c => c.nombre);

    // [BUG GRAVE] Se hacía reduce sobre 'nombres' (array de strings)
    // intentando acceder a 'p.precio'. 'nombres' contiene strings,
    // no objetos, por lo que daba NaN.
    // Se debe hacer reduce sobre los objetos filtrados ORIGINALES.
    let productosFiltrados = productos.filter(p => p.precio > 10);
    let total = productosFiltrados.reduce((acc, p) => acc + p.precio, 0);

    return { nombres: nombres, total: total };
}

// Testing:
let testC1 = obtenerNombre(productos);

let testingTable = [
    { ResultadoTest1Nombres: testC1.nombres },
    { ResultadoTest1Total: testC1.total }
];

console.log(testingTable);


// =====================================================================
//  10. claudeChallenges/challenge-02/challenge-02.js
// =====================================================================

const horario = {
    lunes:    [{ asignatura: "matemáticas", hora: 9 },  { asignatura: "inglés", hora: 11 }],
    martes:   [{ asignatura: "programación", hora: 10 }, { asignatura: "matemáticas", hora: 12 }],
    miercoles: [{ asignatura: "inglés", hora: 9 },  { asignatura: "física", hora: 11 }],
    jueves:   [{ asignatura: "matemáticas", hora: 9 },  { asignatura: "física", hora: 10 }],
    viernes:  [{ asignatura: "programación", hora: 11 }]
};

function buscarAsignatura(horario, asignatura) {
    let listaClase = [];

    Object.keys(horario).forEach(dia => {
        horario[dia].forEach(clase => {
            if (clase.asignatura === asignatura) {
                // [MEJORA] Incluir el día en la información devuelta
                listaClase.push({ ...clase, dia: dia });
            }
        });
    });

    return listaClase;
}

// Testing:
let testC2 = buscarAsignatura(horario, "programación");
console.log(JSON.stringify(testC2, null, 2));


// =====================================================================
//  11. claudeChallenges/challenge-03/challenge-03.js
// =====================================================================

function obtenerDatos(callback) {
    setTimeout(() => {
        let alumnos = [
            { nombre: "Ana", nota: 8 },
            { nombre: "Luis", nota: 4 },
            { nombre: "María", nota: 9 }
        ];
        callback(alumnos);
    }, 2000);
}

// Main
obtenerDatos(function(alumnos) {
    // [MALA PRÁCTICA] En filter, devolver 'a' (el objeto) en lugar de
    // un booleano: funciona porque es truthy, pero es incorrecto conceptualmente.
    let aprobados = alumnos.filter(a => a.nota >= 5);
    console.log(aprobados);
});


// =====================================================================
//  12. claudeChallenges/challenge-04/challenge-04.js
// =====================================================================

const Pila = {
    elementos: [],

    apilar: function(elemento) {
        this.elementos.push(elemento);
    },

    desapilar: function() {
        // [MEJORA] Devolver el elemento desapilado (como hace Array.pop())
        return this.elementos.pop();
    },

    cima: function() {
        return this.elementos[this.elementos.length - 1];
    },

    // [MEJORA] Método para obtener el tamaño
    tamano: function() {
        return this.elementos.length;
    },

    // [MEJORA] Método para limpiar la pila
    limpiar: function() {
        this.elementos = [];
    }
};

// Testing:
function test1() {
    Pila.apilar(10);
    Pila.apilar(20);
    Pila.apilar(30);

    if (Pila.elementos[0] === 10 && Pila.elementos[1] === 20 && Pila.elementos[2] === 30) {
        return "Primer test completado con éxito";
    }
    return "El primer test falló";
}

function test2() {
    let antesDeDesapilar = Pila.cima();
    let desapilado = Pila.desapilar();  // antes no se capturaba el valor devuelto
    let despuesDeDesapilar = Pila.cima();

    if (antesDeDesapilar === 30 && desapilado === 30 && despuesDeDesapilar === 20) {
        return "Segundo test completado con éxito";
    }
    return "El segundo test falló";
}

// Limpiar pila para tests (ya que test1 dejó elementos)
Pila.limpiar();

const testingTablePila = [
    { ResultadoTest1: test1() },
    { ResultadoTest2: test2() }
];

console.log(testingTablePila);


// =====================================================================
//  13. claudeChallenges/challenge-05/challenge-05.js
// =====================================================================

const fs = require("fs");

fs.readFile("temperaturas.txt", "utf8", function(err, contenido) {
    if (err) {
        console.log("Hubo un error al leer el fichero de texto.");
        return;
    }

    const datos = JSON.parse(contenido);
    // [BUG GRAVE] Se usaba 'console.log(datos)' pero 'datos' no estaba definida.
    // La variable correcta es 'temperaturas' -> ahora se llama 'datos'.
    console.log("Datos cargados:", datos);

    // Ejecutar cálculos con los datos
    let media = calcularMedia(datos);
    let maxima = encontrarMaxima(datos);
    let minima = encontrarMinima(datos);

    console.log(`Temperatura media: ${media.toFixed(2)}°C`);
    console.log(`Temperatura máxima: ${maxima.temperatura}°C (hora ${maxima.hora})`);
    console.log(`Temperatura mínima: ${minima.temperatura}°C (hora ${minima.hora})`);
});

function calcularMedia(datos) {
    // [BUG GRAVE] Había TYPO: 'temepratura' en lugar de 'temperatura'
    // [BUG GRAVE] El reduce no retornaba el acumulador (falta 'return acc')
    let suma = datos.reduce((acc, medida) => {
        return acc + medida.temperatura;
    }, 0);

    return suma / datos.length;
}

function encontrarMaxima(datos) {
    // [MEJORA] Manejar array vacío
    if (datos.length === 0) return null;

    return datos.reduce((max, medida) => {
        if (medida.temperatura > max.temperatura) {
            return medida;
        }
        return max;
    });
}

function encontrarMinima(datos) {
    // [MEJORA] Manejar array vacío
    if (datos.length === 0) return null;

    return datos.reduce((min, medida) => {
        if (medida.temperatura < min.temperatura) {
            return medida;
        }
        return min;
    });
}

// =====================================================================
//  10 EJERCICIOS PARA CORREGIR MALAS PRÁCTICAS
//  (Completarlos y descomentarlos para practicar)
// =====================================================================
//
//  Instrucciones: cada ejercicio viene con una explicación del
//  error/mala práctica que aborda. Debes completar la función
//  para que pase los tests.
//
// =====================================================================

// ---------------------------------------------------------------------
//  EJERCICIO 1:  filter + reduce sobre el array correcto
//  Error típico: hacer reduce sobre el array filtrado-mapeado
//  (como en challenge-01) en vez de sobre el array original filtrado.
// ---------------------------------------------------------------------
/*
function ejercicio1(productos) {
    // Dado un array de { nombre, precio }, devuelve { nombres, total }
    // donde 'nombres' son los productos que cuestan > 10 y 'total' su suma.
    // PIENSA: ¿sobre qué array haces el reduce?
    let nombres = productos.filter(p => p.precio > 10).map(p => p.nombre);

    // ??? completar

    return { nombres, total };
}

// Tests
let prod = [
    { nombre: "a", precio: 5 }, { nombre: "b", precio: 15 }, { nombre: "c", precio: 20 }
];
let resEj1 = ejercicio1(prod);
console.log("Ej1 nombres:", resEj1.nombres); // ['b', 'c']
console.log("Ej1 total:", resEj1.total);      // 35
*/

// ---------------------------------------------------------------------
//  EJERCICIO 2:  reduce sin valor inicial
//  Error típico: hacer reduce() sin valor inicial puede fallar
//  si el array está vacío (como en jugadorConMasPuntos).
// ---------------------------------------------------------------------
/*
function ejercicio2(numeros) {
    // Devuelve el número más grande del array.
    // Si el array está vacío, devuelve null.
    // USO OBLIGATORIO de reduce.
    // PIENSA: ¿qué valor inicial necesitas?
}
// Tests
console.log("Ej2 max de [3,7,2]:", ejercicio2([3, 7, 2]));  // 7
console.log("Ej2 max de []:", ejercicio2([]));              // null
*/

// ---------------------------------------------------------------------
//  EJERCICIO 3:  evitar typos en nombres de variables
//  Error típico: escribir 'temepratura' en vez de 'temperatura',
//  'nombre' vs 'nomrbe', etc. No hay atajo: hay que revisar.
// ---------------------------------------------------------------------
/*
function ejercicio3(datos) {
    // datos es un array de { ciudad, temperatura }.
    // Devuelve la ciudad con mayor temperatura.
    // CUIDADO con los typos al escribir las propiedades.
    let ciudadMax = datos.reduce((max, item) => {
        if (item.temepratura > max.temperatura) { // <- hay un typo aquí, ¿lo ves?
            return item;
        }
        return max;
    });
    return ciudadMax.ciudad;
}

let temps = [
    { ciudad: "Madrid", temperatura: 30 },
    { ciudad: "Londres", temperatura: 22 },
    { ciudad: "Roma", temperatura: 28 }
];
console.log("Ej3 ciudad más cálida:", ejercicio3(temps)); // "Madrid"
*/

// ---------------------------------------------------------------------
//  EJERCICIO 4:  no usar console.log dentro de funciones de lógica
//  (como en passwordValidator). La función debe devolver datos,
//  no imprimirlos.
// ---------------------------------------------------------------------
/*
function ejercicio4(contrasena) {
    // Valida: mínimo 8 caracteres, al menos 1 número, sin espacios.
    // Devuelve un objeto: { valida: boolean, errores: string[] }
    // NO uses console.log aquí.
}
console.log("Ej4:", ejercicio4("abc12345")); // { valida: true, errores: [] }
console.log("Ej4:", ejercicio4("hola"));     // { valida: false, errores: ["..."] }
*/

// ---------------------------------------------------------------------
//  EJERCICIO 5:  desapilar debe devolver el elemento
//  Error típico: métodos mutadores que no devuelven el valor
//  (como desapilar en challenge-04 sin return).
// ---------------------------------------------------------------------
/*
const pila = {
    elementos: [],
    apilar: function(e) { this.elementos.push(e); },
    desapilar: function() {
        // Debe devolver el elemento desapilado
    },
    cima: function() { return this.elementos[this.elementos.length - 1]; }
};

pila.apilar(1);
pila.apilar(2);
console.log("Ej5 desapilar:", pila.desapilar()); // 2
console.log("Ej5 cima:", pila.cima());           // 1
*/

// ---------------------------------------------------------------------
//  EJERCICIO 6:  filter con booleano, no con objeto
//  Error típico: devolver el elemento en filter en vez de true/false.
// ---------------------------------------------------------------------
/*
function ejercicio6(alumnos) {
    // Filtra los alumnos con nota >= 5.
    // Devuelve solo los nombres de los aprobados.
}
let alumnos = [
    { nombre: "Ana", nota: 8 },
    { nombre: "Luis", nota: 4 },
    { nombre: "María", nota: 9 }
];
console.log("Ej6 aprobados:", ejercicio6(alumnos)); // ["Ana", "María"]
*/

// ---------------------------------------------------------------------
//  EJERCICIO 7:  usar HTTP status codes correctos
//  Error típico: devolver 404 para errores de validación
//  (como en reclutar.js). Los códigos tienen significado.
// ---------------------------------------------------------------------
/*
function ejercicio7(tipoError) {
    // Devuelve el código HTTP apropiado según el tipo de error:
    // - "no_encontrado" -> 404
    // - "datos_invalidos" -> 400
    // - "no_autorizado" -> 401
    // - "prohibido" -> 403
    // - "error_interno" -> 500
    // Si no coincide, devuelve 500.
}
console.log("Ej7 no_encontrado:", ejercicio7("no_encontrado"));     // 404
console.log("Ej7 datos_invalidos:", ejercicio7("datos_invalidos")); // 400
*/

// ---------------------------------------------------------------------
//  EJERCICIO 8:  evitar var, usar const/let
//  Error típico: usar var (como en challenge-01) que tiene
//  ámbito de función y puede causar bugs sutiles.
// ---------------------------------------------------------------------
/*
function ejercicio8(items) {
    // Recibe un array de números.
    // Devuelve un objeto con { pares: number[], impares: number[] }.
    // USA SOLO const y let (nada de var).
}
console.log("Ej8:", ejercicio8([1, 2, 3, 4, 5]));
// { pares: [2, 4], impares: [1, 3, 5] }
*/

// ---------------------------------------------------------------------
//  EJERCICIO 9:  Promise con reject, no error
//  Error típico: llamar al segundo parámetro del Promise 'error'
//  en vez de 'reject'. Funciona, pero confunde.
// ---------------------------------------------------------------------
/*
function ejercicio9(valor) {
    // Devuelve una Promise que:
    // - Si valor > 0, resuelve con "OK: " + valor
    // - Si valor <= 0, rechaza con "Error: valor debe ser positivo"
    // USA los nombres estándar: resolve, reject
}
ejercicio9(5).then(console.log).catch(console.log);   // "OK: 5"
ejercicio9(-1).then(console.log).catch(console.log);  // "Error: ..."
*/

// ---------------------------------------------------------------------
//  EJERCICIO 10:  signos de exclamación y caracteres especiales
//  Error típico: !texto¡ en vez de ¡texto! (inversión de signos).
//  También: espacios al pegar variables en template strings.
// ---------------------------------------------------------------------
/*
function ejercicio10(nombre) {
    // Devuelve un saludo: "¡Hola, [nombre]!"
    // Asegúrate de que los signos de exclamación estén BIEN PUESTOS.
    // Además, no debe haber espacios extra alrededor del nombre.
}
console.log("Ej10:", ejercicio10("Mundo")); // "¡Hola, Mundo!"
*/

// =====================================================================
//  FIN DEL ARCHIVO DE CORRECCIONES Y EJERCICIOS
// =====================================================================
