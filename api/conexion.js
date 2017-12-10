const Sequelize = require('sequelize');
const CONFIGURACION = require('./configuracion');

const MYSQL = 'mysql';
const SQLITE = 'sqlite';
const POSTGRES = 'postgres';
const MSSQL = 'mssql';

module.exports = new Sequelize(
    CONFIGURACION.BASE_DATOS.NOMBRE,
    CONFIGURACION.BASE_DATOS.USUARIO,
    CONFIGURACION.BASE_DATOS.CONTRASENA,
    {
        host: CONFIGURACION.BASE_DATOS.SERVIDOR,
        dialect: MYSQL,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    }
);