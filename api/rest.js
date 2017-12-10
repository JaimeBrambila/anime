const Sequelize = require('sequelize');
const sequelize = require('./conexion');
const CONFIGURACION = require('./configuracion');
const MODELOS = require('./base-datos').modelos;

module.exports = {

    /**
     * Regresa todos los Items de la tabla.
     */
    obtenerItems: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItems'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            console.log(`[${nombreMetodo}] Obteniendo items de la tabla "${tabla}"...`);
            MODELOS.get(tabla).findAll({ include: [{ all: true, nested: true }] }).then(resultado => {
                console.log(`[${nombreMetodo}] Items encontrados: ${resultado.length}.`);
                let items = [];
                resultado.forEach((item) => {
                    items.push(item.dataValues);
                });
                respuesta.json(items);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa el item de la tabla con el id especificado.
     */
    obtenerItem: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItem'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let id = req.params.id;
            console.log(`[${nombreMetodo}] Obteniendo item de la tabla "${tabla}" con el id "${id}"...`);
            MODELOS.get(tabla).find({ where: { id: id }, include: [{ all: true, nested: true }] }).then(resultado => {
                console.log(`[${nombreMetodo}] Item encontrado...`);
                respuesta.json(resultado);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Inserta un item en la tabla.
     */
    insertarItem: function (req, respuesta, next) {
        let nombreMetodo = 'insertarItem'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let item = req.body;
            console.log(`[${nombreMetodo}] Insertando item en la tabla "${tabla}"...`);
            console.log(`[${nombreMetodo}] Item: `, item);
            MODELOS.get(tabla).create(item).then(resultado => {
                console.log(`[${nombreMetodo}] Item insertado en la tabla "${tabla}".`);
                respuesta.status(200);
                respuesta.json(resultado);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Inserta un arreglo de items en la tabla.
     */
    insertarItems: function (req, respuesta, next) {
        let nombreMetodo = 'insertarItem'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let items = req.body;
            console.log(`[${nombreMetodo}] Insertando items en la tabla "${tabla}"...`);
            console.log(`[${nombreMetodo}] Items: `, items);
            MODELOS.get(tabla).bulkCreate(items, { include: [{ all: true, nested: true }] }).then(resultado => {
                console.log(`[${nombreMetodo}] Items insertados en la tabla "${tabla}".`);
                respuesta.status(200);
                respuesta.json(resultado);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Actualiza un item en la tabla.
     */
    actualizarItem: function (req, respuesta, next) {
        let nombreMetodo = 'actualizarItem'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let item = req.body;
            console.log(`[${nombreMetodo}] Actualizando item en la tabla "${tabla}"...`);
            console.log(`[${nombreMetodo}] Item: `, item);
            MODELOS.get(tabla).update(item, { where: { id: item.id }, include: [{ all: true, nested: true }] }).then(resultado => {
                console.log(`[${nombreMetodo}] Item actualizado en la tabla "${tabla}".`);
                respuesta.status(200);
                respuesta.json(resultado);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Elimina el item de la tabla con el campo especificado.
     */
    eliminarItem: function (req, respuesta, next) {
        let nombreMetodo = 'eliminarItem'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let campo = req.params.campo;
            let criterio = req.params.criterio;
            console.log(`[${nombreMetodo}] Eliminando el item de la tabla "${tabla}" donde "${campo}" = "${criterio}"...`);
            MODELOS.get(tabla).destroy({ 
                where: { 
                    [campo]: criterio 
                } 
            }).then(() => {
                console.log(`[${nombreMetodo}] Item eliminado...`);
                respuesta.status(200);
                respuesta.json();
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Elimina el item de la tabla con los 2 campos especificados.
     */
    eliminarAnd: function (req, respuesta, next) {
        let nombreMetodo = 'eliminarAnd'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let campo1 = req.params.campo1;
            let criterio1 = req.params.criterio1;
            let campo2 = req.params.campo2;
            let criterio2 = req.params.criterio2;
            console.log(`[${nombreMetodo}] Eliminando el item de la tabla "${tabla}" donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}"...`);
            MODELOS.get(tabla).destroy({ 
                where: { 
                    [campo1]: criterio1, 
                    [campo2]: criterio2, 
                } 
            }).then(() => {
                console.log(`[${nombreMetodo}] Item eliminado...`);
                respuesta.status(200);
                respuesta.json();
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },


};

function camelCase(cadena) {
    return cadena.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
}