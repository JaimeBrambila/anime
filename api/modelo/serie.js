const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SERIE,
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
        ano: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cronologiaId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
        },
        calificacion: {
            type: Sequelize.INTEGER
        },
        episodios: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        episodiosVistos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ovas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ovasVistas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        peliculas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        peliculasVistas: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        extras: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        extrasVistos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sinopsis: {
            type: Sequelize.TEXT
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SERIE,
        timestamps: false,
        freezeTableName: true,
    }
);