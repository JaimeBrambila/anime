"use strict"
const CONFIGURACION = require('./configuracion');
const restify = require('restify');
const restifyBodyParser = require('restify-plugins').bodyParser;
const sequelize = require('./conexion');
const baseDatos = require('./base-datos');
const rest = require('./rest');
const serie = require('./rest/serie');
const server = restify.createServer();

baseDatos.inicializarBaseDatos().then(() => {
});

/**
 * Configuracion del servidor
 */
server.use(restifyBodyParser());
server.opts('/\.*/', corsHandler, optionsRoute);
/**
* Servicios
*/
server.get('/api/:tabla/', rest.obtenerItems);
server.get('/api/:tabla/:id', rest.obtenerItem);
server.put('/api/insertar-item/:tabla/', rest.insertarItem);
server.put('/api/insertar-items/:tabla/', rest.insertarItems);
server.put('/api/actualizar-item/:tabla/', rest.actualizarItem);
server.put('/api/eliminar-item/:tabla/:campo/:criterio/', rest.eliminarItem);
server.put('/api/eliminar-and/:tabla/:campo1/:criterio1/:campo2/:criterio2/', rest.eliminarAnd);

/**
 * Inicializar servidor
 */
server.listen(CONFIGURACION.PUERTO, function () {
    console.log('%s escuchando en %s', server.name, server.url);
});

/**
 * Configuracion de encabezados
 */
function corsHandler(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
    res.setHeader('Access-Control-Max-Age', '1000');
    return next();
}

function optionsRoute(req, res, next) {
    res.send(200);
    return next();
}