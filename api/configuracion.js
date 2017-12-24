const configuracion = {
    PUERTO: 3000,
    BASE_DATOS: { // Datos de conexion a la base de datos
        SERVIDOR: 'localhost',
        NOMBRE: 'prueba',
        USUARIO: 'root',
        CONTRASENA: null
    },
    SINCRONIZACION: false, // Indica si se eliminan las tablas para volverlas a crear.
    MODELO: {
        CONFIGURACION: 'configuracion',
        CONFIGURACION_SISTEMA: 'configuracionSistema',
        CREADOR: 'creador',
        CRONOLOGIA: 'cronologia',
        EPISODIO: 'episodio',
        EPISODIO_AUDIOS: 'episodioAudios',
        EPISODIO_FANSUBS: 'episodioFansubs',
        EPISODIO_SUBTITULOS: 'episodioSubtitulos',
        FANSUB: 'fansub',
        GENERO: 'genero',
        PAIS: 'pais',
        SAGA: 'saga',
        SERIE: 'serie',
        SERIE_CREADORES: 'serieCreadores',
        SERIE_GENEROS: 'serieGeneros',
        SERIE_TEMAS: 'serieTemas',
        TEMA: 'tema',
        TITULO: 'titulo',
    },
    TABLAS: {
        CONFIGURACION: 'configuracion',
        CONFIGURACION_SISTEMA: 'configuracion_sistema',
        CREADOR: 'creador',
        CRONOLOGIA: 'cronologia',
        EPISODIO: 'episodio',
        EPISODIO_AUDIOS: 'episodio_audios',
        EPISODIO_FANSUBS: 'episodio_fansubs',
        EPISODIO_SUBTITULOS: 'episodio_subtitulos',
        FANSUB: 'fansub',
        GENERO: 'genero',
        PAIS: 'pais',
        SAGA: 'saga',
        SERIE: 'serie',
        SERIE_CREADORES: 'serie_creadores',
        SERIE_GENEROS: 'serie_generos',
        SERIE_TEMAS: 'serie_temas',
        TEMA: 'tema',
        TITULO: 'titulo',
    },
    PROTOTIPOS: { // Prototipos de tipo de datos
        UUID: 36,
        CADENA_CH: 50,
        CADENA_MED: 100,
        CADENA_GDE: 255,
        CRC: 8
    }
}
module.exports = configuracion;