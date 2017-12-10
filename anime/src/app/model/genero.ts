import * as UUID from 'uuid/v4';

export class Genero {

	public id: string;
	public borrado: boolean;
	public activo: boolean;
	public nombre: string;
	public descripcion: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('borrado')) { this.borrado = objeto.borrado; } else { this.borrado = false; }
		if (objeto.hasOwnProperty('activo')) { this.activo = objeto.activo; } else { this.activo = true; }
		if (objeto.hasOwnProperty('nombre')) { this.nombre = objeto.nombre; } else { this.nombre = null; }
		if (objeto.hasOwnProperty('descripcion')) { this.descripcion = objeto.descripcion; } else { this.descripcion = null; }
	}

	/**
	* Recibe un arreglo de objetos y lo convierte a un arreglo de la clase.
	*/
	public static arreglo(arregloRAW: any): Genero[] {
		let arregloClase: Genero[] = [];
		for (let objetoRAW of arregloRAW) {
			arregloClase.push(new Genero(objetoRAW));
		}
		return arregloClase;
	}

}
