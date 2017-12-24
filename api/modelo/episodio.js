const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.EPISODIO,
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
        visto: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        ano: {
            type: Sequelize.INTEGER,
        },
        medio: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
        },
        numeroOrden: {
            type: Sequelize.DECIMAL(10,3),
            allowNull: false,
            unique: true
        },
        numero: {
            type: Sequelize.DECIMAL(10,3),
            allowNull: false,
            unique: true
        },
        titulo: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_GDE),
            allowNull: false
        },
        extension: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
        },
        tamano: {
            type: Sequelize.INTEGER,
        },
        fuente: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
        },
        resolucionHorizontal: {
            type: Sequelize.INTEGER,
        },
        resolucionVertical: {
            type: Sequelize.INTEGER,
        },
        duracion: {
            type: Sequelize.INTEGER,
        },
        crc: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CRC),
        },
        censura: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.CADENA_CH),
        },
        sinopsis: {
            type: Sequelize.TEXT,
        },
    },
    {
        tableName: CONFIGURACION.TABLAS.EPISODIO,
        timestamps: false,
        freezeTableName: true,
    }
);