import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../components/comunes/base/base.component';

@Component({
	selector: 'app-pie-pagina',
	templateUrl: './pie-pagina.component.html',
	styles: []
})
export class PiePaginaComponent extends BaseComponent implements OnInit {

	public nombreAplicacion: string;
	public version: string;

	constructor(
		private injector: Injector
	) {
		super(injector);
	}

	ngOnInit() {
		this.nombreAplicacion = this.environment.APP.NOMBRE;
		this.version = this.environment.APP.VERSION;
	}

}
