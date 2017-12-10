const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE_TITULOS,
    {
        id: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            primaryKey: true,
            allowNull: false
        },
        titulo: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_GDE),
            allowNull: false,
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE_TITULOS,
        timestamps: false,
        freezeTableName: true,
    }
);