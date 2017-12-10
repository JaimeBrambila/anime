import * as UUID from 'uuid/v4';

export class Fansub {

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public siglas: string;
	public nombre: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('siglas')) { this.siglas = objeto.siglas; } else { this.siglas = null; }
		if (objeto.hasOwnProperty('nombre')) { this.nombre = objeto.nombre; } else { this.nombre = null; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Fansub[] {
		let arregloClase: Fansub[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Fansub(objetoRAW));
		}
		return arregloClase;
	}

}
