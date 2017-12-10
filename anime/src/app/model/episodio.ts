import * as UUID from 'uuid/v4';
import { Fansub } from '../model/fansub';
import { Pais } from '../model/pais';

export class Episodio {

	public static CENSURA_SI = 'SI';
	public static CENSURA_SI_TEXTO = 'Sí';
	public static CENSURA_IRRELEVANTE = 'IRRELEVANTE';
	public static CENSURA_IRRELEVANTE_TEXTO = 'Irrelevante';
	public static CENSURA_NO = 'NO';
	public static CENSURA_NO_TEXTO = 'No';
	public static FUENTE_BD = 'BD';
	public static FUENTE_BD_TEXTO = 'Blu-Ray';
	public static FUENTE_DVD = 'DVD';
	public static FUENTE_DVD_TEXTO = 'DVD';
	public static FUENTE_HDTV = 'HDTV';
	public static FUENTE_HDTV_TEXTO = 'HDTV';
	public static FUENTE_TV = 'TV';
	public static FUENTE_TV_TEXTO = 'TV';
	public static FUENTE_VHS = 'VHS';
	public static FUENTE_VHS_TEXTO = 'VHS';
	public static FUENTE_WEB = 'WEB';
	public static FUENTE_WEB_TEXTO = 'Web';
	public static MEDIO_FEATURETTE = 'FEATURETTE';
	public static MEDIO_FEATURETTE_TEXTO = 'Featurette';
	public static MEDIO_LIVE_ACTION = 'LIVEACTION';
	public static MEDIO_LIVE_ACTION_TEXTO = 'Live-Action';
	public static MEDIO_MOVIE = 'MOVIE';
	public static MEDIO_MOVIE_TEXTO = 'Movie';
	public static MEDIO_ONA = 'ONA';
	public static MEDIO_ONA_TEXTO = 'ONA';
	public static MEDIO_OVA = 'OVA';
	public static MEDIO_OVA_TEXTO = 'OVA';
	public static MEDIO_SPECIAL = 'SPECIAL';
	public static MEDIO_SPECIAL_TEXTO = 'Special';
	public static MEDIO_TV = 'TV';
	public static MEDIO_TV_TEXTO = 'TV';

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public sagaId: string;
	public ano: string;
	public censura: string;
	public crc: string;
	public duracion: number;
	public extension: string;
	public fuente: string;
	public medio: string;
	public numero: number;
	public numeroOrden: number;
	public tamano: number;
	public resolucion_horizontal: number;
	public resolucion_vertical: number;
	public sinopsis: string;
	public titulo: string;
	public visto: boolean;
	public audios: Fansub[];
	public fansubs: Fansub[];
	public subtitulos: Fansub[];

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('sagaId')) { this.sagaId = objeto.sagaId; } else { this.sagaId = null; }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('ano')) { this.ano = objeto.ano; } else { this.ano = null; }
		if (objeto.hasOwnProperty('censura')) { this.censura = objeto.censura; } else { this.censura = null; }
		if (objeto.hasOwnProperty('crc')) { this.crc = objeto.crc; } else { this.crc = null; }
		if (objeto.hasOwnProperty('duracion')) { this.duracion = objeto.duracion; } else { this.duracion = null; }
		if (objeto.hasOwnProperty('extension')) { this.extension = objeto.extension; } else { this.extension = null; }
		if (objeto.hasOwnProperty('fuente')) { this.fuente = objeto.fuente; } else { this.fuente = null; }
		if (objeto.hasOwnProperty('medio')) { this.medio = objeto.medio; } else { this.medio = null; }
		if (objeto.hasOwnProperty('numero')) { this.numero = objeto.numero; } else { this.numero = null; }
		if (objeto.hasOwnProperty('numeroOrden')) { this.numeroOrden = objeto.numeroOrden; } else { this.numeroOrden = null; }
		if (objeto.hasOwnProperty('tamano')) { this.tamano = objeto.tamano; } else { this.tamano = null; }
		if (objeto.hasOwnProperty('resolucion_horizontal')) { this.resolucion_horizontal = objeto.resolucion_horizontal; } else { this.resolucion_horizontal = null; }
		if (objeto.hasOwnProperty('resolucion_vertical')) { this.resolucion_vertical = objeto.resolucion_vertical; } else { this.resolucion_vertical = null; }
		if (objeto.hasOwnProperty('sinopsis')) { this.sinopsis = objeto.sinopsis; } else { this.sinopsis = null; }
		if (objeto.hasOwnProperty('titulo')) { this.titulo = objeto.titulo; } else { this.titulo = null; }
		if (objeto.hasOwnProperty('visto')) { this.visto = objeto.visto; } else { this.visto = false; }
		if (objeto.hasOwnProperty('audios')) { this.audios = this.rellenarAudios(objeto.audios); } else { this.audios = []; }
		if (objeto.hasOwnProperty('fansubs')) { this.fansubs = this.rellenarFansubs(objeto.fansubs); } else { this.fansubs = []; }
		if (objeto.hasOwnProperty('subtitulos')) { this.subtitulos = this.rellenarSubtitulos(objeto.subtitulos); } else { this.subtitulos = []; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Episodio[] {
		let arregloClase: Episodio[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Episodio(objetoRAW));
		}
		return arregloClase;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarAudios(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Pais(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarFansubs(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Fansub(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarSubtitulos(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Pais(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Regresa la lista de censuras
	 */
	public listaCensuras() {
		let lista = [];
		lista.push({ codigo: Episodio.CENSURA_IRRELEVANTE, nombre: Episodio.CENSURA_IRRELEVANTE_TEXTO });
		lista.push({ codigo: Episodio.CENSURA_NO, nombre: Episodio.CENSURA_NO_TEXTO });
		lista.push({ codigo: Episodio.CENSURA_SI, nombre: Episodio.CENSURA_SI_TEXTO });
		return lista;
	}

	/**
	 * Regresa la lista de fuentes
	 */
	public listaFuentes() {
		let lista = [];
		lista.push({ codigo: Episodio.FUENTE_BD, nombre: Episodio.FUENTE_BD_TEXTO });
		lista.push({ codigo: Episodio.FUENTE_DVD, nombre: Episodio.FUENTE_DVD_TEXTO });
		lista.push({ codigo: Episodio.FUENTE_HDTV, nombre: Episodio.FUENTE_HDTV_TEXTO });
		lista.push({ codigo: Episodio.FUENTE_TV, nombre: Episodio.FUENTE_TV_TEXTO });
		lista.push({ codigo: Episodio.FUENTE_VHS, nombre: Episodio.FUENTE_VHS_TEXTO });
		lista.push({ codigo: Episodio.FUENTE_WEB, nombre: Episodio.FUENTE_WEB_TEXTO });
		return lista;
	}

	/**
	 * Regresa la lista de medios
	 */
	public listaMedios() {
		let lista = [];
		lista.push({ codigo: Episodio.MEDIO_FEATURETTE, nombre: Episodio.MEDIO_FEATURETTE_TEXTO });
		lista.push({ codigo: Episodio.MEDIO_LIVE_ACTION, nombre: Episodio.MEDIO_LIVE_ACTION_TEXTO });
		lista.push({ codigo: Episodio.MEDIO_MOVIE, nombre: Episodio.CENSURA_SI_TEXTO });
		lista.push({ codigo: Episodio.MEDIO_ONA, nombre: Episodio.MEDIO_ONA_TEXTO });
		lista.push({ codigo: Episodio.MEDIO_OVA, nombre: Episodio.MEDIO_OVA_TEXTO });
		lista.push({ codigo: Episodio.MEDIO_SPECIAL, nombre: Episodio.MEDIO_SPECIAL_TEXTO });
		return lista;
	}

}
