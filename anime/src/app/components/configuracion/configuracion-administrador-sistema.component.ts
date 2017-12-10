import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../components/comunes/base/base.component';
import { ConfiguracionSistema } from '../../model/configuracion-sistema';
import { InicializacionService } from '../../services/inicializacion.service';

@Component({
	selector: 'app-configuracion-administrador-sistema',
	templateUrl: './configuracion-administrador-sistema.component.html',
	styles: []
})

export class ConfiguracionAdministradorSistemaComponent extends BaseComponent implements OnInit {

	public editando: boolean;
	public config: ConfiguracionSistema;

	constructor(
		private injector: Injector,
		public inicializacion: InicializacionService
	) {
		super(injector);
	}

	ngOnInit() {
		this.loader.abrir();
		this.cargarConfiguracionSistema().then((inicializada) => {
			this.editando = inicializada;
			this.config = this.configuracionSistema;
			setTimeout(() => {
				this.inicializaSelectores();
			}, 100);
			this.loader.cerrar();
		});
	}

	/**
	 * Guarda la información.
	 */
	public guardar() {
		const nombreMetodo = 'guardar';
		console.log(`[${nombreMetodo}] Guardando...`);
		this.loader.abrir();
		if (this.editando) {
			this.rest.actualizarItem(this.environment.TABLAS.CONFIGURACION_SISTEMA, this.config).then(() => {
				this.loader.cerrar();
				this.swal.guardarExito();
				this.router.navigateByUrl('/app/panel-control');
			});
		} else {
			this.rest.insertarItem(this.environment.TABLAS.CONFIGURACION_SISTEMA, this.config).then(() => {
				this.loader.cerrar();
				this.swal.guardarExito();
				this.router.navigateByUrl('/app/panel-control');
			});
		}
	}

	/**
	 * Inicializa los selectores.
	 */
	public inicializaSelectores() {
		this.inicializarSelector('#selectorDesarrolloRedireccionarExcepcion', this.config.redireccionarDespuesError, (valor) => {
			this.config.redireccionarDespuesError = valor;
		});
		this.inicializarSelector('#selectorDesarrolloMenu', this.config.verMenusDesarrollo, (valor) => {
			this.config.verMenusDesarrollo = valor;
		});
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verForma() {
		let nombreMetodo = 'verForma';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.config);
	}

}
