import { Component } from '@angular/core';
import { RestService } from "../../services/rest.service";
import * as UUID from 'uuid/v4';
import { Fansub } from "../../model/fansub";
import { Lista } from '../../clases/comunes';

@Component({
	selector: 'app-panel-control',
	templateUrl: './panel-control.component.html',
	styles: []
})
export class PanelControlComponent {

	public listaTemas: Fansub[] = [];

	constructor(
		private rest: RestService
	) {
		this
	}

	public verTemas() {
		this.rest.obtenerTodosLosItems('fansub').then((resultado) => {
			this.listaTemas = Lista.ordenar(resultado,'nombre');
		});
	}

	public verSeries() {
		this.rest.obtenerTodosLosItems('serie').then(() => {

		});
	}

	public verIdiomas() {
		this.rest.obtenerTodosLosItems('idioma').then(() => {

		});
	}
}
