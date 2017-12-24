import * as UUID from 'uuid/v4';
import { Episodio } from '../model/episodio';
import { Lista } from '../clases/comunes';

export class Saga {

	public static TIPO_MOVIE = 'MOVIE';
	public static TIPO_MOVIE_TEXTO = 'Movie';
	public static TIPO_OVA = 'OVA';
	public static TIPO_OVA_TEXTO = 'OVA';
	public static TIPO_EXTRA = 'EXTRA';
	public static TIPO_EXTRA_TEXTO = 'Extra';
	public static TIPO_TV = 'TV';
	public static TIPO_TV_TEXTO = 'TV';

	public id: string;
	public serieId: string;
	public numero: number;
	public episodiosTotales: number;
	public episodiosVistos: number;
	public tipo: string;
	public titulo: string;
	public episodios: Episodio[];

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('serieId')) { this.serieId = objeto.serieId; } else { this.serieId = null; }
		if (objeto.hasOwnProperty('numero')) { this.numero = objeto.numero; } else { this.numero = null; }
		if (objeto.hasOwnProperty('episodiosTotales')) { this.episodiosTotales = objeto.episodiosTotales; } else { this.episodiosTotales = 0; }
		if (objeto.hasOwnProperty('episodiosVistos')) { this.episodiosVistos = objeto.episodiosVistos; } else { this.episodiosVistos = 0; }
		if (objeto.hasOwnProperty('tipo')) { this.tipo = objeto.tipo; } else { this.tipo = null; }
		if (objeto.hasOwnProperty('titulo')) { this.titulo = objeto.titulo; } else { this.titulo = null; }
		if (objeto.hasOwnProperty('episodios')) { this.episodios = this.rellenarEpisodios(objeto.episodios); } else { this.episodios = []; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Saga[] {
		let arregloClase: Saga[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Saga(objetoRAW));
		}
		return arregloClase;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarEpisodios(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Episodio(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Regresa la lista de tipos
	 */
	public listaTipos() {
		let lista = [];
		lista.push({ codigo: Saga.TIPO_EXTRA, nombre: Saga.TIPO_EXTRA_TEXTO });
		lista.push({ codigo: Saga.TIPO_MOVIE, nombre: Saga.TIPO_MOVIE_TEXTO });
		lista.push({ codigo: Saga.TIPO_OVA, nombre: Saga.TIPO_OVA_TEXTO });
		lista.push({ codigo: Saga.TIPO_TV, nombre: Saga.TIPO_TV_TEXTO });
		return lista;
	}

	/**
	 * Regresa la lista de episodios ordenados por numero de ordenamiento
	 */
	get episodiosOrdenados() {
		return Lista.ordenarNumeros(this.episodios, 'numeroOrden');
	}

}
