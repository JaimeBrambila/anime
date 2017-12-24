const Sequelize = require('sequelize');
const sequelize = require('../conexion');
const CONFIGURACION = require('../configuracion');
const Serie = require('../modelo/serie');
const Titulo = require('../modelo/titulo');
const Pais = require('../modelo/pais');
const Creador = require('../modelo/creador');
const Genero = require('../modelo/genero');
const Tema = require('../modelo/tema');
const Cronologia = require('../modelo/cronologia');

module.exports = {

    /**
     * Regresa todos los Items de la tabla.
     */
    obtenerSeries: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerSeries'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla serie...`);
            Serie.findAll({
                include: [{
                    model: Titulo, as: 'titulos', include: [{
                        model: Pais, as: 'pais'
                    }]
                }]
            }).then(resultado => {
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
    obtenerSeriePorId: function (req, respuesta, next) {
        let nombreMetodo = 'obtenerSeriePorId'
        console.log(`[${nombreMetodo}] Conectandose a la base de datos...`);
        sequelize.authenticate().then(() => {
            let id = req.params.id;
            console.log(`[${nombreMetodo}] Obteniendo item de la tabla serie con el id "${id}"...`);
            Serie.find({
                where: { id: id },
                include: [
                    {
                        model: Titulo,
                        as: 'titulos',
                        include: [{
                            model: Pais, as: 'pais'
                        }],
                    },
                    {
                        model: Creador,
                        as: 'creadores',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Genero,
                        as: 'generos',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: Tema,
                        as: 'temas',
                        through: {
                            attributes: []
                        }
                    },
                ],
            }).then(resultado => {
                console.log(`[${nombreMetodo}] Item encontrado...`);
                respuesta.json(resultado);
                next();
            });
        }).catch((error) => {
            console.log(`[${nombreMetodo}] Error al conectarse a la base de datos: `, error);
        });
    },

};