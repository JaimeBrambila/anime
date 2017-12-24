//************************************************************************************
// Version de Desarrollo
//************************************************************************************
export const environment = {
	production: false,
	APP: {
		NOMBRE: 'AnimeDB',
		VERSION: '1711202005',
	},
	REST: {
		URL: 'http://localhost:3000/api',
		TABLAS: {
			CONFIGURACION: 'configuracion',
			CONFIGURACION_SISTEMA: 'configuracion_sistema',
			CENSURA: 'censura',
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
		}
	}
};
