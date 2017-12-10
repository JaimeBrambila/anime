const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.CONFIGURACION_SISTEMA,
    {
        id: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            primaryKey: true,
            allowNull: false
        },
        redireccionarDespuesError: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        verMenusDesarrollo: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    },
    {
        tableName: CONFIGURACION.TABLAS.CONFIGURACION_SISTEMA,
        timestamps: false,
        freezeTableName: true,
    }
);