const sqlite3 = require('sqlite3').verbose();
// Base de datos en memoria
const bd = new sqlite3.Database(':memory:'); 

bd.serialize(() => {
    // 1. Creación de la tabla original
    bd.run(`CREATE TABLE Heroes (HeroeID INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Clase TEXT)`);
    bd.run(`INSERT INTO Heroes (Nombre, Clase) VALUES ('Gimli', 'Guerrero')`);
    bd.run(`INSERT INTO Heroes (Nombre, Clase) VALUES ('Gandalf', 'Mago')`);

    // ATAQUE 1 (Pregunta 3.1): Crear la tabla Misiones. 
    let sqlCrearTabla = `
        CREATE TABLE Misiones (
            MisionID INTEGER PRIMARY KEY AUTOINCREMENT,
            Titulo TEXT,
            Oro REAL,
            HeroeID INTEGER
        )
    `;
    bd.run(sqlCrearTabla);

    // ATAQUE 2 (Pregunta 3.2): Insertar una misión con SELECT anidado.
    let sqlInsertar = `
        INSERT INTO Misiones (Titulo, Oro, HeroeID) 
        VALUES (
            'Derrotar al Dragón', 
            500, 
            (SELECT HeroeID FROM Heroes WHERE Nombre = 'Gandalf')
        )
    `;
    bd.run(sqlInsertar);

    // ATAQUE 3 (Pregunta 3.3): Obtener los datos con un JOIN.
    let sqlJoin = `
        SELECT Heroes.Nombre, Misiones.Titulo 
        FROM Heroes
        JOIN Misiones ON Heroes.HeroeID = Misiones.HeroeID
        WHERE Misiones.Oro > 100
    `;
    
    // Ejecutamos y mostramos la tabla
    bd.all(sqlJoin, [], (err, filas) => {
        if (err) {
            console.log( "💥 Fallo crítico en el SQL:", err.message );
        } else {
            console.log( "🏆 ¡JEFE DERROTADO! Resultados del JOIN:" );
            console.table(filas);
        }
    });
});