import * as UUID from 'uuid/v4';

export class Configuracion {

	public id: string;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
	}

}