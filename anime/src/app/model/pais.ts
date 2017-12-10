import * as UUID from 'uuid/v4';

export class Pais {

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public codigo: string;
	public nombre: string;
	public idioma: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('codigo')) { this.codigo = objeto.codigo; } else { this.codigo = null; }
		if (objeto.hasOwnProperty('nombre')) { this.nombre = objeto.nombre; } else { this.nombre = null; }
		if (objeto.hasOwnProperty('idioma')) { this.idioma = objeto.idioma; } else { this.idioma = null; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Pais[] {
		let arregloClase: Pais[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Pais(objetoRAW));
		}
		return arregloClase;
	}

}
