import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../components/comunes/base/base.component';
import { Configuracion } from '../../model/configuracion';
import { ComunicacionService } from '../../services/comunicacion.service';

@Component({
	selector: 'app-configuracion-administrador',
	templateUrl: './configuracion-administrador.component.html',
	styles: []
})

export class ConfiguracionAdministradorComponent extends BaseComponent implements OnInit {

	public configuracion: Configuracion;

	constructor(
		private injector: Injector,
		private comunicacion: ComunicacionService
	) {
		super(injector);
	}

	ngOnInit() {
		this.loader.abrir();
		// this.cargarConfiguracion().then(() => {
		// 	this.configuracion = this.configuracionAdmin;
		// 	this.loader.cerrar();
		// });
	}

	/**
	 * Guarda la información.
	 */
	public guardar() {
		const nombreMetodo = 'guardar';
		console.log(`[${nombreMetodo}] Guardando...`);
		// this.loader.abrirConPromesa(this.dynamo.insertarItem(this.environment.TABLAS.CONFIGURACION, this.configuracion).then((value) => {
		// 	this.comunicacion.notificar({actualizarConfiguracion: true});
		// 	this.swal.guardarExito();
		// 	this.router.navigateByUrl('/app/panel-control');
		// }));
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verForma() {
		let nombreMetodo = 'verForma';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.configuracion);
	}

}
