const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.FANSUB,
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
        siglas: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
            unique: true
        },
        nombre: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
            unique: true
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.FANSUB,
        timestamps: false,
        freezeTableName: true,
    }
);