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

	public verSagas() {
		this.rest.obtenerItemsPorCampo('serie_sagas', 'serieId', '449571e0-50c4-45b3-8ae3-dc3d2760c299').then((resultado) => {
			console.log(resultado);
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
