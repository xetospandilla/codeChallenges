-- HerreriaEnana.sql

-- creación de la tabla:

create table Armas(
    IdArma INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT,
    Daño INTEGER,
    IdProveedor INTEGER
);

-- inserción de 'Hacha doble':

INSERT INTO Armas (Nombre, Daño, IdProveedor) VALUES(
    'Hacha doble',
    50,
    (SELECT IdProveedor
    FROM Proveedores
    WHERE Proveedores.NombreEmpresa = 'HerreriaEnana')
);

-- join (Nombre del arma, Nombre de la empresas del proveedor ):

SELECT Armas.Nombre, Proveedores.NombreEmpresa
FROM Armas
INNER JOIN Proveedores on  Armas.IdProveedor = Proveedores.IdEmpresa