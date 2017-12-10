const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE_TEMAS,
    {
        serieId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        },
        temaId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE_TEMAS,
        timestamps: false,
        freezeTableName: true,
    }
);