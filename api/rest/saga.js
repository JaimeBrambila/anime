const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');
const Saga = require('../modelo/saga');
const Episodio = require('../modelo/episodio');
const Fansub = require('../modelo/fansub');
const Pais = require('../modelo/pais');

module.exports = {

    /**
     * Regresa los items de la tabla donde los campos especificados sean iguales a los valores especificados.
     */
    obtenerSagas: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerSagas'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let serieId = req.params.serieId;
            let tipo = req.params.tipo;
            console.log(`[${nombreMetodo}] Obteniendo items de la tabla saga donde serieId = "${serieId}" y tipo = "${tipo}...`);
            Saga.findAll({
                where: {
                    serieId: serieId,
                    tipo: tipo
                },
                include: [
                    {
                        model: Episodio,
                        as: 'episodios',
                        include: [
                            {
                                model: Fansub, as: 'fansubs'
                            },
                            {
                                model: Pais, as: 'audios'
                            },
                            {
                                model: Pais, as: 'subtitulos'
                            }
                        ],
                    }
                ]
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Saga encontrada...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener loa saga: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

};