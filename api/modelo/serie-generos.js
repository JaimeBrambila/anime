const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE_GENEROS,
    {
        serieId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        },
        generoId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE_GENEROS,
        timestamps: false,
        freezeTableName: true,
    }
);