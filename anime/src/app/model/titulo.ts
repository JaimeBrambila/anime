import * as UUID from 'uuid/v4';
import { Pais } from '../model/pais';

export class Titulo {

	public id: string;
	public serieId: string;
	public paisId: string;
	public pais: Pais;
	public titulo: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('serieId')) { this.serieId = objeto.serieId; } else { this.serieId = null; }
		if (objeto.hasOwnProperty('paisId')) { this.paisId = objeto.paisId; } else { this.paisId = null; }
        if (objeto.hasOwnProperty('pais')) { this.pais = new Pais(objeto.pais); } else { this.pais = new Pais(); }
		if (objeto.hasOwnProperty('titulo')) { this.titulo = objeto.titulo; } else { this.titulo = null; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Titulo[] {
		let arregloClase: Titulo[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Titulo(objetoRAW));
		}
		return arregloClase;
	}

}
