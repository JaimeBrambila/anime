import * as UUID from 'uuid/v4';
import { Titulo } from '../model/titulo';
import { Pais } from '../model/pais';
import { Creador } from '../model/creador';
import { Cronologia } from '../model/cronologia';
import { Genero } from '../model/genero';
import { Tema } from '../model/tema';

export class Serie {

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public sinopsis: string;
	public paisId: string;
	public pais: Pais;
	public ano: number;
	public calificacion: number;
	public cronologia: Cronologia;
	public cronologiaId: string;
	public cronologiaSerie: Serie;
	public cronologiaSerieId: string;
	public episodiosTotales: number;
	public episodiosVistos: number;
	public ovasTotales: number;
	public ovasVistas: number;
	public peliculasTotales: number;
	public peliculasVistas: number;
	public extrasTotales: number;
	public extrasVistos: number;
	public titulos: Titulo[];
	public creadores: Creador[];
	public generos: Genero[];
	public temas: Tema[];

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('sinopsis')) { this.sinopsis = objeto.sinopsis; } else { this.sinopsis = null; }
		if (objeto.hasOwnProperty('paisId')) { this.paisId = objeto.paisId; } else { this.paisId = null; }
		if (objeto.hasOwnProperty('pais')) { this.pais = new Pais(objeto.pais); } else { this.pais = new Pais(); }
		if (objeto.hasOwnProperty('ano')) { this.ano = objeto.ano; } else { this.ano = null; }
		if (objeto.hasOwnProperty('calificacion')) { this.calificacion = objeto.calificacion; } else { this.calificacion = 0; }
		if (objeto.hasOwnProperty('cronologia')) { this.cronologia = new Cronologia(objeto.cronologia); } else { this.cronologia = null; }
		if (objeto.hasOwnProperty('cronologiaId')) { this.cronologiaId = objeto.cronologiaId; } else { this.cronologiaId = null; }
		if (objeto.hasOwnProperty('episodiosTotales')) { this.episodiosTotales = objeto.episodiosTotales; } else { this.episodiosTotales = 0; }
		if (objeto.hasOwnProperty('episodiosVistos')) { this.episodiosVistos = objeto.episodiosVistos; } else { this.episodiosVistos = 0; }
		if (objeto.hasOwnProperty('ovasTotales')) { this.ovasTotales = objeto.ovasTotales; } else { this.ovasTotales = 0; }
		if (objeto.hasOwnProperty('ovasVistas')) { this.ovasVistas = objeto.ovasVistas; } else { this.ovasVistas = 0; }
		if (objeto.hasOwnProperty('peliculasTotales')) { this.peliculasTotales = objeto.peliculasTotales; } else { this.peliculasTotales = 0; }
		if (objeto.hasOwnProperty('peliculasVistas')) { this.peliculasVistas = objeto.peliculasVistas; } else { this.peliculasVistas = 0; }
		if (objeto.hasOwnProperty('extrasTotales')) { this.extrasTotales = objeto.extrasTotales; } else { this.extrasTotales = 0; }
		if (objeto.hasOwnProperty('extrasVistos')) { this.extrasVistos = objeto.extrasVistos; } else { this.extrasVistos = 0; }
		if (objeto.hasOwnProperty('cronologiaSerie')) { this.cronologiaSerie = new Serie(objeto.cronologiaSerie); } else { this.cronologiaSerie = null; }
		if (objeto.hasOwnProperty('cronologiaSerieId')) { this.cronologiaSerieId = objeto.cronologiaSerieId; } else { this.cronologiaSerieId = null; }
		if (objeto.hasOwnProperty('titulos')) { this.titulos = this.rellenarTitulos(objeto.titulos); } else { this.titulos = []; }
		if (objeto.hasOwnProperty('creadores')) { this.creadores = this.rellenarCreadores(objeto.creadores); } else { this.creadores = []; }
		if (objeto.hasOwnProperty('generos')) { this.generos = this.rellenarGeneros(objeto.generos); } else { this.generos = []; }
		if (objeto.hasOwnProperty('temas')) { this.temas = this.rellenarTemas(objeto.temas); } else { this.temas = []; }
	}

	/**
	 * Regresa el titulo principal.
	 */
	get titulo() {
		let tituloEstadosUnidos;
		let tituloJapon;
		this.titulos.forEach((titulo) => {
			if (titulo.pais.codigo == 'us') {
				tituloEstadosUnidos = titulo;
			} else if (titulo.pais.codigo == 'jp') {
				tituloJapon = titulo;

			}
		});
		return tituloEstadosUnidos ? tituloEstadosUnidos : tituloJapon;
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Serie[] {
		let arregloClase: Serie[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Serie(objetoRAW));
		}
		return arregloClase;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarTitulos(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Titulo(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarCreadores(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Creador(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarGeneros(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Genero(objeto));
		}
		return objetosSinValoresNulos;
	}

	/**
	 * Rellena el arreglo de la clase.
	 */
	private rellenarTemas(objetos) {
		let objetosSinValoresNulos = [];
		for (let objeto of objetos) {
			objetosSinValoresNulos.push(new Tema(objeto));
		}
		return objetosSinValoresNulos;
	}

}
