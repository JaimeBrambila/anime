import { Component, OnInit, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Saga } from './../../model/saga';


@Component({
	selector: 'app-serie-edicion',
	templateUrl: './serie-edicion.component.html',
	styles: []
})
export class SerieEdicionComponent extends BaseComponent implements OnInit {

	public registroId: string;
	public sagaTipoTv: string = Saga.TIPO_TV;
	public sagaTipoOva: string = Saga.TIPO_OVA;
	public sagaTipoMovie: string = Saga.TIPO_MOVIE;
	public sagaTipoExtra: string = Saga.TIPO_EXTRA;

	constructor(
		private injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() {
		this.ruta.params.subscribe((params) => {
			if (params['id']) {
				this.registroId = params['id'];
			}
		});
	}
}
