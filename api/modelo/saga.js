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
        tipo: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
            allowNull: false,
        },
        numero: {
            type: Sequelize.DECIMAL(10,3),
            allowNull: false,
        },
        episodiosTotales: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        episodiosVistos: {
            type: Sequelize.INTEGER,
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