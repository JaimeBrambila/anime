const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SAGA,
    {
        id: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            primaryKey: true,
            allowNull: false
        },
        numero: {
            type: Sequelize.DECIMAL,
            allowNull: false,
        },
        titulo: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
        },
        titulo: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_GDE),
            allowNull: false,
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SAGA,
        timestamps: false,
        freezeTableName: true,
    }
);