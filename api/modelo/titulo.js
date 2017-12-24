const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.TITULO,
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
        tableName: CONFIGURACION.TABLAS.TITULO,
        timestamps: false,
        freezeTableName: true,
    }
);