const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.TEMA,
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
        nombre: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_MED),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_MED)
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.TEMA,
        timestamps: false,
        freezeTableName: true,
    }
);