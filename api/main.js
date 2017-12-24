"use strict"
const CONFIGURACION = require('./configuracion');
const restify = require('restify');
const restifyBodyParser = require('restify-plugins').bodyParser;
const sequelize = require('./conexion');
const baseDatos = require('./base-datos');
const rest = require('./rest/rest');
const serie = require('./rest/serie');
const saga = require('./rest/saga');
const episodio = require('./rest/episodio');
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
server.get('/api/serie/obtener-series/', serie.obtenerSeries);
server.get('/api/serie/obtener-serie-por-id/:id/', serie.obtenerSeriePorId);
server.get('/api/saga/obtener-sagas/:serieId/:tipo/', saga.obtenerSagas);
server.get('/api/episodio/obtener-episodio-por-id/:id/', episodio.obtenerEpisodioPorId);
server.get('/api/obtener-items-todos/:tabla/', rest.obtenerTodosLosItems);
server.get('/api/obtener-items-todos-simple/:tabla/', rest.obtenerTodosLosItemsSimple);
server.get('/api/obtener-item-por-id/:tabla/:id/', rest.obtenerItemPorId);
server.get('/api/obtener-item-por-id-simple/:tabla/:id/', rest.obtenerItemPorIdSimple);
server.get('/api/obtener-items-por-campo/:tabla/:campo/:criterio/', rest.obtenerItemsPorCampo);
server.get('/api/obtener-items-and/:tabla/:campo1/:criterio1/:campo2/:criterio2/', rest.obtenerItemsAnd);
server.put('/api/insertar-item/:tabla/', rest.insertarItem);
server.put('/api/insertar-items/:tabla/', rest.insertarItems);
server.put('/api/actualizar-item/:tabla/', rest.actualizarItem);
server.put('/api/eliminar-items/:tabla/:campo/:criterio/', rest.eliminarItems);
server.put('/api/eliminar-items-and/:tabla/:campo1/:criterio1/:campo2/:criterio2/', rest.eliminarItemsAnd);

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