import { Component, OnInit, Injector, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Lista } from '../../clases/comunes';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { OnRatingChangeEven, OnHoverRatingChangeEvent } from "angular-star-rating";
import { CalificacionPipe } from "../../pipes/calificacion-pipe";
import { Serie } from '../../model/serie';
import { Creador } from '../../model/creador';
import { Cronologia } from '../../model/cronologia';
import { Genero } from '../../model/genero';
import { Tema } from '../../model/tema';
import { Pais } from '../../model/pais';
import { Titulo } from '../../model/titulo';


@Component({
	selector: 'app-serie-edicion-informacion',
	templateUrl: './serie-edicion-informacion.component.html',
	styles: []
})
export class SerieEdicionInformacionComponent extends BaseComponent implements OnInit {

	@Input() registroId: string;

	public formaTitulo: FormGroup;
	public formaSerie: FormGroup;
	public pais: Pais;
	public calificacion: number = 0;
	public listaTitulos: Titulo[] = [];
	public listaPaises: Pais[];
	public listaCronologias: { value: string, label: string }[];
	public listaSeries: { value: string, label: string }[];
	public calificacionTemporal: number = 0;
	public calificacionClase: string = 'badge';

	public listaCreadoresExistentes: Creador[];
	public listaCreadoresNuevos: Creador[] = [];
	public listaCreadoresExistentesNombre: string[] = [];
	public listaCreadoresSeleccionadosNombre: string[] = [];

	public listaGenerosExistentes: Genero[];
	public listaGenerosNuevos: Genero[] = [];
	public listaGenerosExistentesNombre: string[] = [];
	public listaGenerosSeleccionadosNombre: string[] = [];

	public listaTemasExistentes: Tema[];
	public listaTemasNuevos: Tema[] = [];
	public listaTemasExistentesNombre: string[] = [];
	public listaTemasSeleccionadosNombre: string[] = [];

	public sinopsis;

	constructor(
		private injector: Injector,
		private calificacionPipe: CalificacionPipe,
	) {
		super(injector);
	}

	ngOnInit() {
		let promesas: Promise<any>[] = [];
		this.loader.abrir();
		this.inicializarFormaTitulo();
		this.inicializarFormaSerie();
		this.cargarConfiguracionSistema().then(() => {
			promesas.push(this.inicializarListaCreadores());
			promesas.push(this.inicializarListaGeneros());
			promesas.push(this.inicializarListaTemas());
			promesas.push(this.inicializarListaPaises());
			promesas.push(this.inicializarListaSeries());
			promesas.push(this.inicializarListaCronologias());
			Promise.all(promesas).then(() => {
				this.llenarForma().then(() => {
					this.inicializarCamposSerie();
					this.loader.cerrar();
				});
			});
		});
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarFormaTitulo(): void {
		let nombreMetodo = 'inicializarFormaTitulo';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.formaTitulo = new FormGroup({
			'titulo': new FormControl('', Validators.required),
			'paisId': new FormControl('', Validators.required),
			'seriePaisId': new FormControl('', Validators.required),
			'serieAno': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.min(1907), Validators.max(2100)]),
		});
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarFormaSerie(): void {
		let nombreMetodo = 'inicializarFormaSerie';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.formaSerie = new FormGroup({
			'id': new FormControl('', Validators.required),
			'borrado': new FormControl('', Validators.required),
			'activo': new FormControl('', Validators.required),
			'paisId': new FormControl('', Validators.required),
			'ano': new FormControl('', Validators.required),
			'calificacion': new FormControl(''),
			'cronologiaId': new FormControl(''),
			'cronologiaSerieId': new FormControl(''),
			'episodiosTotales': new FormControl('', Validators.required),
			'episodiosVistos': new FormControl('', Validators.required),
			'ovasTotales': new FormControl('', Validators.required),
			'ovasVistas': new FormControl('', Validators.required),
			'peliculasTotales': new FormControl('', Validators.required),
			'peliculasVistas': new FormControl('', Validators.required),
			'extrasTotales': new FormControl('', Validators.required),
			'extrasVistos': new FormControl('', Validators.required),
			'sinopsis': new FormControl('')
		});
	}

	/**
	 * Llena la forma.
	 */
	private llenarForma(): Promise<any> {
		let nombreMetodo = 'llenarForma';
		console.log(`[${nombreMetodo}] Llenando la forma...`);
		return new Promise<any>((resolve, reject) => {
			console.log(`[${nombreMetodo}] RegistroId: ${this.registroId}`);
			if (this.registroId) {
				console.log(`[${nombreMetodo}] Editando serie`);
				this.rest.obtenerSeriePorId(this.registroId).then((respuesta) => {
					let serie = new Serie(respuesta);
					// Titulos
					this.listaTitulos = Titulo.arreglo(serie.titulos);
					delete serie.titulos;
					// Creadores
					serie.creadores.forEach((creador) => {
						this.listaCreadoresSeleccionadosNombre.push(creador.nombre);
					});
					delete serie.creadores;
					// Generos
					serie.generos.forEach((genero) => {
						this.listaGenerosSeleccionadosNombre.push(genero.nombre);
					});
					delete serie.generos;
					// Temas
					serie.temas.forEach((tema) => {
						this.listaTemasSeleccionadosNombre.push(tema.nombre);
					});
					this.pais = serie.pais;
					delete serie.pais;
					delete serie.temas;
					delete serie.cronologia;
					delete serie.cronologiaSerie;
					this.calificacion = serie.calificacion;
					this.formaSerie.setValue(serie);
					this.formaTitulo.get('seriePaisId').setValue(serie.paisId);
					this.formaTitulo.get('serieAno').setValue(serie.ano);
					resolve();
				});
			} else {
				console.log(`[${nombreMetodo}] Creando serie`);
				let serie = new Serie();
				this.calificacion = serie.calificacion;
				delete serie.titulos;
				delete serie.pais;
				delete serie.creadores;
				delete serie.cronologia;
				delete serie.cronologiaSerie;
				delete serie.generos;
				delete serie.temas;
				this.formaSerie.setValue(serie);
				resolve();
			}
		});
	}

	/**
	 * Agrega un titulo a la serie.
	 */
	public agregarTitulo(): void {
		if (this.formaTitulo.valid) {
			let nombreMetodo = 'agregarTitulo';
			console.log(`[${nombreMetodo}] Agregando titulo...`);
			this.loader.abrir();
			this.pais = Lista.obtenerItem(this.listaPaises, 'id', this.formaTitulo.get('seriePaisId').value);
			this.formaSerie.get('paisId').setValue(this.pais.id);
			this.formaSerie.get('ano').setValue(this.formaTitulo.get('serieAno').value);
			let titulo = new Titulo(this.formaTitulo.value);
			titulo.serieId = this.formaSerie.get('id').value;
			titulo.pais = Lista.obtenerItem(this.listaPaises, 'id', titulo.paisId);
			if (this.listaTitulos.length == 0) {
				let serie = new Serie(this.formaSerie.value);
				this.rest.insertarItem(this.environment.REST.TABLAS.SERIE, serie).then(() => {
					console.log(`[${nombreMetodo}] Titulo agregado correctamente...`);
					this.rest.insertarItem(this.environment.REST.TABLAS.TITULO, titulo).then(() => {
						console.log(`[${nombreMetodo}] Serie creada correctamente...`);
						this.listaTitulos.push(titulo);
						this.formaTitulo.get('titulo').setValue('');
						this.formaTitulo.get('paisId').setValue('');
						this.formaTitulo.markAsPristine();
						this.inicializarCamposSerie();
						this.loader.cerrar();
						this.router.navigate(['/app/series/editar', serie.id]);
					}).catch((error) => {
						console.log(`[${nombreMetodo}] Error al crear el titulo: `, error);
					});
				}).catch((error) => {
					console.log(`[${nombreMetodo}] Error al crear la serie: `, error);
				});
			} else {
				this.rest.insertarItem(this.environment.REST.TABLAS.TITULO, titulo).then(() => {
					console.log(`[${nombreMetodo}] Titulo agregado correctamente...`);
					this.listaTitulos.push(titulo);
					this.formaTitulo.get('titulo').setValue('');
					this.formaTitulo.get('paisId').setValue('');
					this.formaTitulo.markAsPristine();
					this.loader.cerrar();
				}).catch((error) => {
					console.log(`[${nombreMetodo}] Error al crear el titulo: `, error);
				});
			}
		}
	}

	/**
	 * Elimina el titulo seleccionado.
	 */
	public eliminarTitulo(indice: number): void {
		let nombreMetodo = 'eliminarTitulo';
		console.log(`[${nombreMetodo}] Eliminando titulo...`);
		this.loader.abrir();
		let titulo = this.listaTitulos.splice(indice, 1)[0];
		this.rest.eliminarItem(this.environment.REST.TABLAS.TITULO, 'id', titulo.id).then(() => {
			this.loader.cerrar();
		});
	}

	/**
	 * Se ejecuta cuando se coloca el cursor sobre el selector de calificaciones.
	 */
	public calificacionOver($event: OnHoverRatingChangeEvent): void {
		this.calificacionTemporal = $event.hoverRating;
		if (this.calificacionTemporal > 0) {
			this.calificacionClase = this.calificacionPipe.transform(this.calificacionTemporal, 'clase');
		} else {
			this.calificacionClase = this.calificacionPipe.transform(this.calificacion, 'clase');
		}
	};

	/**
	 * Se ejecuta cuando se hace click sobre el selector de calificaciones.
	 */
	public calificacionChange($event: OnRatingChangeEven): void {
		this.calificacionTemporal = $event.rating;
		this.formaSerie.get('calificacion').setValue($event.rating);
		if (this.calificacionTemporal > 0) {
			this.calificacionClase = this.calificacionPipe.transform(this.calificacionTemporal, 'clase');
		} else {
			this.calificacionClase = this.calificacionPipe.transform(this.calificacion, 'clase');
		}
	};

	/**
	 * Se ejecuta cuando se coloca el cursor sobre el boton elimiar calificacion.
	 */
	public eliminarCalificacionOver(): void {
		this.calificacionTemporal = 6;
		this.calificacionClase = this.calificacionPipe.transform(this.calificacionTemporal, 'clase');
	};

	/**
	 * Se ejecuta cuando se coloca el cursor fuera del boton elimiar calificacion.
	 */
	public eliminarCalificacionOut(): void {
		this.calificacionTemporal = this.calificacion;
		this.calificacionClase = this.calificacionPipe.transform(this.calificacionTemporal, 'clase');
	};

	/**
	 * Elimina la calificacion de la serie.
	 */
	public eliminarCalificacion(): void {
		this.formaSerie.get('calificacion').setValue(0);
		this.calificacion = 0;
	}

	/**
	 * Agrega un creador.
	 */
	public agregarCreador(creadorNombre): void {
		let nombreMetodo = 'agregarCreador';
		console.log(`[${nombreMetodo}] Agregando creador: ${creadorNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let creadorExistente = Lista.obtenerItem(this.listaCreadoresExistentes, 'nombre', creadorNombre);
		if (!creadorExistente) {
			console.log(`[${nombreMetodo}] No existe el creador.`);
			let creadorNuevo = new Creador();
			creadorNuevo.nombre = creadorNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.CREADOR, creadorNuevo).then(() => {
				let serieCreador = { serieId: serie.id, creadorId: creadorNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_CREADORES, serieCreador).then(() => {
					console.log(`[${nombreMetodo}] Creador agregado correctamente.`);
					this.listaCreadoresNuevos.push(creadorNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let serieCreador = { serieId: serie.id, creadorId: creadorExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_CREADORES, serieCreador).then(() => {
				console.log(`[${nombreMetodo}] Creador agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un creador.
	 */
	public eliminarCreador(creadorNombre): void {
		let nombreMetodo = 'eliminarCreador';
		console.log(`[${nombreMetodo}] Elminando creador: ${creadorNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let creadorNuevo = Lista.obtenerItem(this.listaCreadoresNuevos, 'nombre', creadorNombre);
		if (creadorNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_CREADORES, 'serieId', serie.id, 'creadorId', creadorNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.CREADOR, 'id', creadorNuevo.id).then(() => {
					this.listaCreadoresNuevos.splice(this.listaCreadoresNuevos.indexOf(creadorNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Creador eliminado correctamente.`);
				});
			});
		} else {
			let creadorExistente = Lista.obtenerItem(this.listaCreadoresExistentes, 'nombre', creadorNombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_CREADORES, 'serieId', serie.id, 'creadorId', creadorExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Creador eliminado correctamente.`);
			});
		}
	}

	/**
	 * Agrega un genero.
	 */
	public agregarGenero(generoNombre): void {
		let nombreMetodo = 'agregarGenero';
		console.log(`[${nombreMetodo}] Agregando genero: ${generoNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let generoExistente = Lista.obtenerItem(this.listaGenerosExistentes, 'nombre', generoNombre);
		if (!generoExistente) {
			console.log(`[${nombreMetodo}] No existe el genero.`);
			let generoNuevo = new Genero();
			generoNuevo.nombre = generoNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.GENERO, generoNuevo).then(() => {
				let serieGenero = { serieId: serie.id, generoId: generoNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_GENEROS, serieGenero).then(() => {
					console.log(`[${nombreMetodo}] Genero agregado correctamente.`);
					this.listaGenerosNuevos.push(generoNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let serieGenero = { serieId: serie.id, generoId: generoExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_GENEROS, serieGenero).then(() => {
				console.log(`[${nombreMetodo}] Genero agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un genero.
	 */
	public eliminarGenero(generoNombre): void {
		let nombreMetodo = 'eliminarGenero';
		console.log(`[${nombreMetodo}] Elminando genero: ${generoNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let generoNuevo = Lista.obtenerItem(this.listaGenerosNuevos, 'nombre', generoNombre);
		if (generoNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_GENEROS, 'serieId', serie.id, 'generoId', generoNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.GENERO, 'id', generoNuevo.id).then(() => {
					this.listaGenerosNuevos.splice(this.listaGenerosNuevos.indexOf(generoNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Genero eliminado correctamente.`);
				});
			});
		} else {
			let generoExistente = Lista.obtenerItem(this.listaGenerosExistentes, 'nombre', generoNombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_GENEROS, 'serieId', serie.id, 'generoId', generoExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Genero eliminado correctamente.`);
			});
		}
	}

	/**
	 * Agrega un tema.
	 */
	public agregarTema(temaNombre): void {
		let nombreMetodo = 'agregarTema';
		console.log(`[${nombreMetodo}] Agregando tema: ${temaNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let temaExistente = Lista.obtenerItem(this.listaTemasExistentes, 'nombre', temaNombre);
		if (!temaExistente) {
			console.log(`[${nombreMetodo}] No existe el tema.`);
			let temaNuevo = new Tema();
			temaNuevo.nombre = temaNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.TEMA, temaNuevo).then(() => {
				let serieTema = { serieId: serie.id, temaId: temaNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_TEMAS, serieTema).then(() => {
					console.log(`[${nombreMetodo}] Tema agregado correctamente.`);
					this.listaTemasNuevos.push(temaNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let serieTema = { serieId: serie.id, temaId: temaExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.SERIE_TEMAS, serieTema).then(() => {
				console.log(`[${nombreMetodo}] Tema agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un tema.
	 */
	public eliminarTema(temaNombre): void {
		let nombreMetodo = 'eliminarTema';
		console.log(`[${nombreMetodo}] Elminando tema: ${temaNombre}...`);
		this.loader.abrir();
		let serie = new Serie(this.formaSerie.value);
		let temaNuevo = Lista.obtenerItem(this.listaTemasNuevos, 'nombre', temaNombre);
		if (temaNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_TEMAS, 'serieId', serie.id, 'temaId', temaNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.TEMA, 'id', temaNuevo.id).then(() => {
					this.listaTemasNuevos.splice(this.listaTemasNuevos.indexOf(temaNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Tema eliminado correctamente.`);
				});
			});
		} else {
			let temaExistente = Lista.obtenerItem(this.listaTemasExistentes, 'nombre', temaNombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.SERIE_TEMAS, 'serieId', serie.id, 'temaId', temaExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Tema eliminado correctamente.`);
			});
		}
	}

	/**
	 * Inicializa el campo de texto rico de la sinopsis.
	 */
	public inicializarCamposSerie() {
		let nombreMetodo = 'inicializarSinopsis';
		console.log(`[${nombreMetodo}] Inicializando sinopsis...`);
		setTimeout(() => {
			if ($('#sinopsis').length) {
				$('#sinopsis').html(this.formaSerie.get('sinopsis').value);
				this.sinopsis = new window['Quill']('#sinopsis', { theme: 'snow' });
			}
			if ($('#ano').length) {
				$('#ano').mask('0000');
			}
		}, 500);
	}

	/**
	 * Guarda el registro.
	 */
	public guardar(): void {
		let nombreMetodo = 'guardar';
		console.log(`[${nombreMetodo}] Guardando el registro...`);
		this.loader.abrir();
		let promesas: Promise<any>[] = [];
		let serie = new Serie(this.formaSerie.value);
		serie.sinopsis = (<any>$('#sinopsis')[0].firstChild).innerHTML;
		promesas.push(this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, serie));
		Promise.all(promesas).then(() => {
			this.loader.cerrar();
			this.swal.guardarExito();
			// this.router.navigateByUrl('/app/series/historico');
		});
	}

	/**
	 * Inicializa la lista de creadores.
	 */
	private inicializarListaCreadores(): Promise<any> {
		let nombreMetodo = 'inicializarListaCreadores';
		console.log(`[${nombreMetodo}] Obteniendo creadores...`);
		return new Promise<any>((resolve, reject) => {
			this.listaCreadoresExistentesNombre = [];
			this.rest.obtenerTodosLosItems(this.environment.REST.TABLAS.CREADOR).then((resultado) => {
				this.listaCreadoresExistentes = Lista.ordenar(Creador.arreglo(resultado), 'nombre');
				this.listaCreadoresExistentes.forEach((creador) => {
					this.listaCreadoresExistentesNombre.push(creador.nombre);
				});
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de generos.
	 */
	private inicializarListaGeneros(): Promise<any> {
		let nombreMetodo = 'inicializarListaGeneros';
		console.log(`[${nombreMetodo}] Obteniendo generos...`);
		return new Promise<any>((resolve, reject) => {
			this.listaGenerosExistentesNombre = [];
			this.rest.obtenerTodosLosItems(this.environment.REST.TABLAS.GENERO).then((resultado) => {
				this.listaGenerosExistentes = Lista.ordenar(Genero.arreglo(resultado), 'nombre');
				this.listaGenerosExistentes.forEach((genero) => {
					this.listaGenerosExistentesNombre.push(genero.nombre);
				});
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de temas.
	 */
	private inicializarListaTemas(): Promise<any> {
		let nombreMetodo = 'inicializarListaTemas';
		console.log(`[${nombreMetodo}] Obteniendo temas...`);
		return new Promise<any>((resolve, reject) => {
			this.listaTemasExistentesNombre = [];
			this.rest.obtenerTodosLosItems(this.environment.REST.TABLAS.TEMA).then((resultado) => {
				this.listaTemasExistentes = Lista.ordenar(Tema.arreglo(resultado), 'nombre');
				this.listaTemasExistentes.forEach((tema) => {
					this.listaTemasExistentesNombre.push(tema.nombre);
				});
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de series.
	 */
	private inicializarListaSeries(): Promise<any> {
		let nombreMetodo = 'inicializarListaSeries';
		console.log(`[${nombreMetodo}] Obteniendo series...`);
		return new Promise<any>((resolve, reject) => {
			this.listaSeries = [];
			this.rest.obtenerSeries().then((resultado) => {
				let lista = Serie.arreglo(resultado);
				lista.forEach((item) => {
					this.listaSeries.push({ value: item.id, label: item.titulo.titulo });
				})
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de cronologias.
	 */
	private inicializarListaCronologias(): Promise<any> {
		let nombreMetodo = 'inicializarListaCronologias';
		console.log(`[${nombreMetodo}] Obteniendo cronologias...`);
		return new Promise<any>((resolve, reject) => {
			this.listaCronologias = [];
			this.rest.obtenerTodosLosItems(this.environment.REST.TABLAS.CRONOLOGIA).then((resultado) => {
				let lista = Lista.ordenar(Cronologia.arreglo(resultado), 'nombre');
				lista.forEach((item) => {
					this.listaCronologias.push({ value: item.id, label: item.nombre });
				})
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de paises.
	 */
	private inicializarListaPaises(): Promise<any> {
		let nombreMetodo = 'inicializarListaPaises';
		console.log(`[${nombreMetodo}] Obteniendo paises...`);
		return new Promise<any>((resolve, reject) => {
			this.rest.obtenerTodosLosItems(this.environment.REST.TABLAS.PAIS).then((resultado) => {
				this.listaPaises = Lista.ordenar(Pais.arreglo(resultado), 'nombre');
				resolve();
			});
		});
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verFormaTitulo(): void {
		let nombreMetodo = 'verForma';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.formaTitulo);
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verFormaSerie(): void {
		let nombreMetodo = 'verForma';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.formaSerie);
	}
}
