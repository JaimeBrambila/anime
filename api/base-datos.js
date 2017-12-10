const sequelize = require('./conexion');
const CONFIGURACION = require('./configuracion');

const MODELOS = new Map();

/**
 * Tablas de la base de datos.
 */
MODELOS.set(CONFIGURACION.MODELO.CONFIGURACION_SISTEMA, require('./modelo/configuracion-sistema'));
MODELOS.set(CONFIGURACION.MODELO.CREADOR, require('./modelo/creador'));
MODELOS.set(CONFIGURACION.MODELO.CRONOLOGIA, require('./modelo/cronologia'));
MODELOS.set(CONFIGURACION.MODELO.EPISODIO, require('./modelo/episodio'));
MODELOS.set(CONFIGURACION.MODELO.FANSUB, require('./modelo/fansub'));
MODELOS.set(CONFIGURACION.MODELO.GENERO, require('./modelo/genero'));
MODELOS.set(CONFIGURACION.MODELO.PAIS, require('./modelo/pais'));
MODELOS.set(CONFIGURACION.MODELO.SAGA, require('./modelo/saga'));
MODELOS.set(CONFIGURACION.MODELO.SAGA_EPISODIOS, require('./modelo/saga-episodios'));
MODELOS.set(CONFIGURACION.MODELO.SERIE, require('./modelo/serie'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_CREADORES, require('./modelo/serie-creadores'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_GENEROS, require('./modelo/serie-generos'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_SAGAS, require('./modelo/serie-sagas'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_TEMAS, require('./modelo/serie-temas'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_TITULOS, require('./modelo/serie-titulo'));
MODELOS.set(CONFIGURACION.MODELO.TEMA, require('./modelo/tema'));

module.exports = {
    modelos: MODELOS,
    /**
     * Inicializa la base de datos.
     */
    inicializarBaseDatos: function (req, respuesta, next) {
        let nombreMetodo = 'inicializarBaseDatos'
        console.log(`[${nombreMetodo}] Inicializando la base de datos...`);
        return new Promise((resolve, reject) => {

            //******************************************************************************
            //   M O D E L O S
            //******************************************************************************
            const ConfiguracionSistema = MODELOS.get(CONFIGURACION.MODELO.CONFIGURACION_SISTEMA);
            const Creador = MODELOS.get(CONFIGURACION.MODELO.CREADOR);
            const Cronologia = MODELOS.get(CONFIGURACION.MODELO.CRONOLOGIA);
            const Episodio = MODELOS.get(CONFIGURACION.MODELO.EPISODIO);
            const Fansub = MODELOS.get(CONFIGURACION.MODELO.FANSUB);
            const Genero = MODELOS.get(CONFIGURACION.MODELO.GENERO);
            const Pais = MODELOS.get(CONFIGURACION.MODELO.PAIS);
            const Saga = MODELOS.get(CONFIGURACION.MODELO.SAGA);
            const SagaEpisodios = MODELOS.get(CONFIGURACION.MODELO.SAGA_EPISODIOS);
            SagaEpisodios.removeAttribute('id');
            const Serie = MODELOS.get(CONFIGURACION.MODELO.SERIE);
            const SerieCreadores = MODELOS.get(CONFIGURACION.MODELO.SERIE_CREADORES);
            SerieCreadores.removeAttribute('id');
            const SerieGeneros = MODELOS.get(CONFIGURACION.MODELO.SERIE_GENEROS);
            SerieGeneros.removeAttribute('id');
            const SerieTemas = MODELOS.get(CONFIGURACION.MODELO.SERIE_TEMAS);
            SerieTemas.removeAttribute('id');
            const SerieTitulo = MODELOS.get(CONFIGURACION.MODELO.SERIE_TITULOS);
            const Tema = MODELOS.get(CONFIGURACION.MODELO.TEMA);

            //******************************************************************************
            //   R E L A C I O N E S
            //******************************************************************************
            //------------------------------------------------------------------------------
            //   S E R I E
            //------------------------------------------------------------------------------
            Serie.belongsTo(
                Pais, {
                    as: CONFIGURACION.RELACIONES.SERIE_PAIS
                }
            );
            Serie.belongsToMany(
                Creador, {
                    as: CONFIGURACION.RELACIONES.SERIE_CREADORES,
                    through: CONFIGURACION.RELACIONES.SERIE_CREADORES_TABLA,
                    timestamps: false
                }
            );
            Serie.belongsToMany(
                Genero, {
                    as: CONFIGURACION.RELACIONES.SERIE_GENEROS,
                    through: CONFIGURACION.RELACIONES.SERIE_GENEROS_TABLA,
                    timestamps: false
                }
            );
            Serie.belongsToMany(
                Tema, {
                    as: CONFIGURACION.RELACIONES.SERIE_TEMAS,
                    through: CONFIGURACION.RELACIONES.SERIE_TEMAS_TABLA,
                    timestamps: false
                }
            );
            Serie.belongsTo(
                Serie, 
                {
                    as: CONFIGURACION.RELACIONES.CRONOLOGIA_SERIE,
                    foreignKey: 'cronologiaSerieId'
                }
            );
            Serie.belongsTo(
                Cronologia, 
                {
                    as: CONFIGURACION.RELACIONES.CRONOLOGIA,
                    foreignKey: 'cronologiaId'
                }
            );
            Serie.hasMany(
                SerieTitulo
            );
            //------------------------------------------------------------------------------
            //   S E R I E   T I T U L O
            //------------------------------------------------------------------------------
            SerieTitulo.belongsTo(
                Pais, {
                    as: CONFIGURACION.RELACIONES.TITULO_PAIS
                }
            );
            SerieTitulo.belongsTo(
                Serie, {
                    as: CONFIGURACION.RELACIONES.TITULO_SERIE
                }
            );

            //******************************************************************************
            //   S I N C R O N I Z A C I O N
            //******************************************************************************
            sequelize.sync({ force: CONFIGURACION.SINCRONIZACION }).then(() => {
                console.log(`[${nombreMetodo}] Base de datos inicializada.`);
                resolve();
            }).catch((error) => {
                console.log(`[${nombreMetodo}] Error al inicializar la base de datos: `, error);
                reject();
            })
        });
    }

};