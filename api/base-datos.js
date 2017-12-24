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
MODELOS.set(CONFIGURACION.MODELO.EPISODIO_AUDIOS, require('./modelo/episodio-audios'));
MODELOS.set(CONFIGURACION.MODELO.EPISODIO_FANSUBS, require('./modelo/episodio-fansubs'));
MODELOS.set(CONFIGURACION.MODELO.EPISODIO_SUBTITULOS, require('./modelo/episodio-subtitulos'));
MODELOS.set(CONFIGURACION.MODELO.FANSUB, require('./modelo/fansub'));
MODELOS.set(CONFIGURACION.MODELO.GENERO, require('./modelo/genero'));
MODELOS.set(CONFIGURACION.MODELO.PAIS, require('./modelo/pais'));
MODELOS.set(CONFIGURACION.MODELO.SAGA, require('./modelo/saga'));
MODELOS.set(CONFIGURACION.MODELO.SERIE, require('./modelo/serie'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_CREADORES, require('./modelo/serie-creadores'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_GENEROS, require('./modelo/serie-generos'));
MODELOS.set(CONFIGURACION.MODELO.SERIE_TEMAS, require('./modelo/serie-temas'));
MODELOS.set(CONFIGURACION.MODELO.TEMA, require('./modelo/tema'));
MODELOS.set(CONFIGURACION.MODELO.TITULO, require('./modelo/titulo'));

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
            const EpisodioAudios = MODELOS.get(CONFIGURACION.MODELO.EPISODIO_AUDIOS);
            EpisodioAudios.removeAttribute('id');
            const EpisodioFansubs = MODELOS.get(CONFIGURACION.MODELO.EPISODIO_FANSUBS);
            EpisodioFansubs.removeAttribute('id');
            const EpisodioSubtitulos = MODELOS.get(CONFIGURACION.MODELO.EPISODIO_SUBTITULOS);
            EpisodioSubtitulos.removeAttribute('id');
            const Fansub = MODELOS.get(CONFIGURACION.MODELO.FANSUB);
            const Genero = MODELOS.get(CONFIGURACION.MODELO.GENERO);
            const Pais = MODELOS.get(CONFIGURACION.MODELO.PAIS);
            const Saga = MODELOS.get(CONFIGURACION.MODELO.SAGA);
            const Serie = MODELOS.get(CONFIGURACION.MODELO.SERIE);
            const SerieCreadores = MODELOS.get(CONFIGURACION.MODELO.SERIE_CREADORES);
            SerieCreadores.removeAttribute('id');
            const SerieGeneros = MODELOS.get(CONFIGURACION.MODELO.SERIE_GENEROS);
            SerieGeneros.removeAttribute('id');
            const SerieTemas = MODELOS.get(CONFIGURACION.MODELO.SERIE_TEMAS);
            SerieTemas.removeAttribute('id');
            const Tema = MODELOS.get(CONFIGURACION.MODELO.TEMA);
            const Titulo = MODELOS.get(CONFIGURACION.MODELO.TITULO);

            //******************************************************************************
            //   R E L A C I O N E S
            //******************************************************************************
            //------------------------------------------------------------------------------
            //   E P I S O D I O
            //------------------------------------------------------------------------------
            Episodio.belongsTo(
                Saga, {
                    as: 'saga'
                }
            );
            Episodio.belongsToMany(
                Fansub, {
                    as: 'fansubs',
                    through: 'episodio_fansubs',
                    timestamps: false
                }
            );
            Episodio.belongsToMany(
                Pais, {
                    as: 'audios',
                    through: 'episodio_audios',
                    timestamps: false,
                }
            );
            Pais.belongsToMany(
                Episodio, {
                    as: 'episodiosAudio',
                    through: 'episodio_audios',
                    foreignKey: 'paisId',
                    timestamps: false,
                }
            );
            Episodio.belongsToMany(
                Pais, {
                    as: 'subtitulos',
                    through: 'episodio_subtitulos',
                    timestamps: false,
                }
            );
            Pais.belongsToMany(
                Episodio, {
                    as: 'episodiosSubtitulo',
                    through: 'episodio_subtitulos',
                    foreignKey: 'paisId',
                    timestamps: false,
                }
            );
            //------------------------------------------------------------------------------
            //   S A G A
            //------------------------------------------------------------------------------
            Saga.belongsTo(
                Serie, {
                    as: 'serie'
                }
            );
            Saga.hasMany(
                Episodio, {
                    as: 'episodios'
                }
            );
            //------------------------------------------------------------------------------
            //   S E R I E
            //------------------------------------------------------------------------------
            Serie.belongsTo(
                Pais, {
                    as: 'pais'
                }
            );
            Serie.belongsToMany(
                Creador, {
                    as: 'creadores',
                    through: 'serie_creadores',
                    timestamps: false
                }
            );
            Serie.belongsToMany(
                Genero, {
                    as: 'generos',
                    through: 'serie_generos',
                    timestamps: false
                }
            );
            Serie.belongsToMany(
                Tema, {
                    as: 'temas',
                    through: 'serie_temas',
                    timestamps: false
                }
            );
            Serie.belongsTo(
                Serie, 
                {
                    as: 'cronologiaSerie',
                    foreignKey: 'cronologiaSerieId'
                }
            );
            Serie.belongsTo(
                Cronologia, 
                {
                    as: 'cronologia',
                    foreignKey: 'cronologiaId'
                }
            );
            Serie.hasMany(
                Titulo, {
                    as: 'titulos'
                }
            );
            Serie.hasMany(
                Saga, {
                    as: 'sagas'
                }
            );
            //------------------------------------------------------------------------------
            //   S E R I E   T I T U L O
            //------------------------------------------------------------------------------
            Titulo.belongsTo(
                Pais, {
                    as: 'pais'
                }
            );
            Titulo.belongsTo(
                Serie, {
                    as: 'serie'
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