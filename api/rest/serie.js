const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');
const tabla = require('../modelo/serie');

module.exports = {

    /**
     * Inserta un item en la tabla.
     */
    insertarItem: function (req, respuesta, next) {
        let nombreMetodo = 'insertarSERIE'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let item = req.body;
            console.log(`[${nombreMetodo}] Insertando item en la tabla "${tabla}"...`);
            console.log(`[${nombreMetodo}] Item: `, item);
            tabla.upsert(
                item, {
                    include: [{
                    association: CONFIGURACION.RELACIONES.SERIE_CALIFICACION
                    }]
                }).then(itemInsertado => {
                console.log(`[${nombreMetodo}] Item insertado en la tabla "${tabla}": `, itemInsertado.dataValues);
            })
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        })
    }

};