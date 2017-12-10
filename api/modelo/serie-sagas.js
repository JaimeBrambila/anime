const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE_SAGAS,
    {
        serieId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        },
        sagaId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE_SAGAS,
        timestamps: false,
        freezeTableName: true,
    }
);