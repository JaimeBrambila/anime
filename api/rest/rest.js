const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');
const MODELOS = require('../base-datos').modelos;

module.exports = {

    /**
     * Regresa todos los Items de la tabla.
     */
    obtenerTodosLosItems: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerTodosLosItems'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla "${tabla}"...`);
            MODELOS.get(tabla).findAll({
                include: [{
                    all: true,
                    // nested: true 
                }]
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Items encontrados: ${resultado.length}.`);
                let items = [];
                resultado.forEach((item) => {
                    items.push(item.dataValues);
                });
                respuesta.json(items);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa todos los Items de la tabla.
     */
    obtenerTodosLosItemsSimple: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerTodosLosItems'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla "${tabla}"...`);
            MODELOS.get(tabla).findAll().then(resultado => {
                console.log(`[${nombreMetodo}] Items encontrados: ${resultado.length}.`);
                let items = [];
                resultado.forEach((item) => {
                    items.push(item.dataValues);
                });
                respuesta.json(items);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa el item de la tabla con el id especificado.
     */
    obtenerItemPorId: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItemPorId'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let id = req.params.id;
            console.log(`[${nombreMetodo}] Obteniendo item de la tabla "${tabla}" con el id "${id}"...`);
            MODELOS.get(tabla).find({
                where: { id: id },
                include: [{
                    all: true,
                    // nested: true 
                }]
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Item encontrado...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener item: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa el item de la tabla con el id especificado.
     */
    obtenerItemPorIdSimple: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItemPorId'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let id = req.params.id;
            console.log(`[${nombreMetodo}] Obteniendo item de la tabla "${tabla}" con el id "${id}"...`);
            MODELOS.get(tabla).find({
                where: { id: id }
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Item encontrado...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener item: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa los items de la tabla donde el campo especificado se igual al valor especificado.
     */
    obtenerItemsPorCampo: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItemsPorCampo'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let campo = req.params.campo;
            let criterio = req.params.criterio;
            console.log(`[${nombreMetodo}] Obteniendo items de la tabla "${tabla}" donde "${campo}" sea igual a "${criterio}"...`);
            MODELOS.get(tabla).findAll({ where: { [campo]: criterio }, include: [{ all: true, nested: true }] }).then(resultado => {
                console.log(`[${nombreMetodo}] Items encontrados...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Regresa los items de la tabla donde los campos especificados sean iguales a los valores especificados.
     */
    obtenerItemsAnd: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerItemsAnd'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let campo1 = req.params.campo1;
            let criterio1 = req.params.criterio1;
            let campo2 = req.params.campo2;
            let criterio2 = req.params.criterio2;
            console.log(`[${nombreMetodo}] Obteniendo items de la tabla "${tabla}" donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}...`);
            MODELOS.get(tabla).findAll({
                where: {
                    [campo1]: criterio1,
                    [campo2]: criterio2
                }, include: [{ all: true, nested: true }]
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Items encontrados...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener lo item: `, error);
                respuesta.status(400);
                respuesta.json(error);
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
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al insertar item: `, error);
                respuesta.status(400);
                respuesta.json(error);
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
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al insertar los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
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
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al actualizar item: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Elimina el item de la tabla con el campo especificado.
     */
    eliminarItems: function (req, respuesta, next) {
        let nombreMetodo = 'eliminarItems'
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
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al eliminar los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

    /**
     * Elimina los items de la tabla con los 2 campos especificados.
     */
    eliminarItemsAnd: function (req, respuesta, next) {
        let nombreMetodo = 'eliminarItemsAnd'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let tabla = camelCase(req.params.tabla);
            let campo1 = req.params.campo1;
            let criterio1 = req.params.criterio1;
            let campo2 = req.params.campo2;
            let criterio2 = req.params.criterio2;
            console.log(`[${nombreMetodo}] Eliminando los items de la tabla "${tabla}" donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}"...`);
            MODELOS.get(tabla).destroy({
                where: {
                    [campo1]: criterio1,
                    [campo2]: criterio2,
                }
            }).then(() => {
                console.log(`[${nombreMetodo}] Items eliminados correctamente`);
                respuesta.status(200);
                respuesta.json();
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al eliminar los items: `, error);
                respuesta.status(400);
                respuesta.json(error);
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