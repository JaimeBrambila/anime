const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.PAIS,
    {
        id: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            primaryKey: true,
            allowNull: false
        },
        borrado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        activo: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        codigo: {
            type: Sequelize.STRING(2),
            allowNull: false,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
            unique: true
        },
        idioma: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
            unique: true
        },
    },
    {
        tableName: CONFIGURACION.TABLAS.PAIS,
        timestamps: false,
        freezeTableName: true,
    }
);