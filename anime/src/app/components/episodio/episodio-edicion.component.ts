import { Component, OnInit, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';


@Component({
	selector: 'app-episodio-edicion',
	templateUrl: './episodio-edicion.component.html',
	styles: []
})
export class EpisodioEdicionComponent extends BaseComponent implements OnInit {

	public registroId: string;
	public serieId: string;

	constructor(
		private injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() {
		this.ruta.params.subscribe((params) => {
			if (params['id']) {
				this.registroId = params['id'];
				this.serieId = params['serieId'];
			}
		});
	}
}
