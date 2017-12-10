import { Component, OnInit, Injector, ChangeDetectorRef } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Lista } from '../../clases/comunes';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { OnRatingChangeEven, OnHoverRatingChangeEvent } from "angular-star-rating";
import { CalificacionPipe } from "../../pipes/calificacion-pipe";
import { Observable } from "rxjs/Rx";
import { Serie } from '../../model/serie';
import { Creador } from '../../model/creador';
import { Cronologia } from '../../model/cronologia';
import { Genero } from '../../model/genero';
import { Tema } from '../../model/tema';
import { Pais } from '../../model/pais';
import { SerieTitulo } from '../../model/serie-titulo';


@Component({
	selector: 'app-serie-edicion',
	templateUrl: './serie-edicion.component.html',
	styles: []
})
export class SerieEdicionComponent extends BaseComponent implements OnInit {

	public registroId: string;

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
