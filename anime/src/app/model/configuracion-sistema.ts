import * as UUID from 'uuid/v4';

export class ConfiguracionSistema {

	public id: string;
	public redireccionarDespuesError: boolean;
	public verMenusDesarrollo: boolean;

	constructor(objeto?) {
		if (!objeto) { objeto = {} }
		if (objeto.hasOwnProperty('id')) { this.id = objeto.id; } else { this.id = UUID(); }
		if (objeto.hasOwnProperty('redireccionarDespuesError')) { this.redireccionarDespuesError = objeto.redireccionarDespuesError; } else { this.redireccionarDespuesError = false; }
		if (objeto.hasOwnProperty('verMenusDesarrollo')) { this.verMenusDesarrollo = objeto.verMenusDesarrollo; } else { this.verMenusDesarrollo = false; }
	}

}
