const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');

module.exports = sequelize.define(CONFIGURACION.MODELO.SAGA_EPISODIOS,
    {
        sagaId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        },
        episodioId: {
            type: Sequelize.STRING(CONFIGURACION.PROTOTIPOS.UUID),
            allowNull: false
        }
    },
    {
        tableName: CONFIGURACION.TABLAS.SAGA_EPISODIOS,
        timestamps: false,
        freezeTableName: true,
    }
);