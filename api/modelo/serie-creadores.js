const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE_CREADORES,
    {
        serieId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        },
        creadorId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE_CREADORES,
        timestamps: false,
        freezeTableName: true,
    }
);