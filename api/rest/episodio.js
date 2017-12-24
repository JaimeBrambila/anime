const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');
const Episodio = require('../modelo/episodio');
const Fansub = require('../modelo/fansub');
const Pais = require('../modelo/pais');

module.exports = {

    /**
     * Regresa el item de la tabla con el id especificado.
     */
    obtenerEpisodioPorId: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerEpisodioPorId'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let id = req.params.id;
            console.log(`[${nombreMetodo}] Obteniendo item de la tabla episodio con el id "${id}"...`);
            Episodio.find({
                where: { id: id },
                include: [
                    {
                        model: Pais,
                        as: 'audios',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Pais,
                        as: 'subtitulos',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Fansub,
                        as: 'fansubs',
                        through: {
                            attributes: []
                        }
                    },
                ],
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Episodio encontrado...`);
                respuesta.json(resultado);
                next();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al obtener el episodio: `, error);
                respuesta.status(400);
                respuesta.json(error);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

};