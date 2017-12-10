import * as UUID from 'uuid/v4';

export class Creador {

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public nombre: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('nombre')) { this.nombre = objeto.nombre; } else { this.nombre = null; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Creador[] {
		let arregloClase: Creador[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Creador(objetoRAW));
		}
		return arregloClase;
	}

}
