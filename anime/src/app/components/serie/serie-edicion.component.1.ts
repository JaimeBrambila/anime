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

	public formaTitulo: FormGroup;
	public formaSerie: FormGroup;
	public pais: Pais;
	public calificacion: number = 0;
	public listaTitulos: SerieTitulo[] = [];
	public listaPaises: Pais[];
	public listaCronologias: Cronologia[];
	public listaSeries: Serie[];
	public calificacionTemporal: number = 0;
	public calificacionClase: string = 'badge';
	public listaCreadores: Creador[];
	public listaCreadoresExistentes: string[] = [];
	public listaCreadoresTemporal: string[] = [];
	public listaGeneros: Genero[];
	public listaGenerosExistentes: string[] = [];
	public listaGenerosTemporal: string[] = [];
	public listaTemas: Tema[];
	public listaTemasExistentes: string[] = [];
	public listaTemasTemporal: string[] = [];
	public sinopsis;

	constructor(
		private injector: Injector,
		private calificacionPipe: CalificacionPipe
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
		// this.forma.get('codigo').setAsyncValidators(Serie.validadorExisteCodigo);
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
			'episodios': new FormControl('', Validators.required),
			'episodiosVistos': new FormControl('', Validators.required),
			'ovas': new FormControl('', Validators.required),
			'ovasVistas': new FormControl('', Validators.required),
			'peliculas': new FormControl('', Validators.required),
			'peliculasVistas': new FormControl('', Validators.required),
			'extras': new FormControl('', Validators.required),
			'extrasVistos': new FormControl('', Validators.required),
			'sinopsis': new FormControl('')
		});
		// this.forma.get('codigo').setAsyncValidators(Serie.validadorExisteCodigo);
	}

	/**
	 * Llena la forma.
	 */
	private llenarForma(): Promise<any> {
		let nombreMetodo = 'llenarForma';
		console.log(`[${nombreMetodo}] Llenando la forma...`);
		return new Promise<any>((resolve, reject) => {
			this.ruta.params.subscribe((params) => {
				if (params['id']) {
					console.log(`[${nombreMetodo}] Editando serie`);
					this.rest.obtenerItem(this.environment.TABLAS.SERIE, params['id']).then((respuesta) => {
						console.log(`[${nombreMetodo}] Item encontrado...`, respuesta);
						let serie = new Serie(respuesta);
						// Titulos
						this.listaTitulos = SerieTitulo.arreglo(serie.serieTitulos);
						delete serie.serieTitulos;
						// Creadores
						serie.creadores.forEach((creador) => {
							this.listaCreadoresTemporal.push(creador.nombre);
						});
						delete serie.creadores;
						// Generos
						serie.generos.forEach((genero) => {
							this.listaGenerosTemporal.push(genero.nombre);
						});
						delete serie.generos;
						// Temas
						serie.temas.forEach((tema) => {
							this.listaTemasTemporal.push(tema.nombre);
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
					delete serie.serieTitulos;
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
			let titulo = new SerieTitulo(this.formaTitulo.value);
			titulo.serieId = this.formaSerie.get('id').value;
			titulo.pais = Lista.obtenerItem(this.listaPaises, 'id', titulo.paisId);
			if (this.listaTitulos.length == 0) {
				let serie = new Serie(this.formaSerie.value);
				this.rest.insertarItem(this.environment.TABLAS.SERIE, serie).then(() => {
					console.log(`[${nombreMetodo}] Titulo agregado correctamente...`);
					this.rest.insertarItem(this.environment.TABLAS.SERIE_TITULOS, titulo).then(() => {
						console.log(`[${nombreMetodo}] Serie creada correctamente...`);
						this.listaTitulos.push(titulo);
						this.formaTitulo.get('titulo').setValue('');
						this.formaTitulo.get('paisId').setValue('');
						this.formaTitulo.markAsPristine();
						this.inicializarCamposSerie();
						this.loader.cerrar();
					}).catch((error) => {
						console.log(`[${nombreMetodo}] Error al crear el titulo: `, error);
					});
				}).catch((error) => {
					console.log(`[${nombreMetodo}] Error al crear la serie: `, error);
				});
			} else {
				this.rest.insertarItem(this.environment.TABLAS.SERIE_TITULOS, titulo).then(() => {
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
		this.rest.eliminarItem(this.environment.TABLAS.SERIE_TITULOS, 'id', titulo.id).then(() => {
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
	 * Inicializa el campo de texto rico de la sinopsis.
	 */
	public inicializarCamposSerie() {
		let nombreMetodo = 'inicializarSinopsis';
		console.log(`[${nombreMetodo}] Inicializando sinopsis...`);
		setTimeout(() => {
			if ($('#sinopsis').length) {
				$('#sinopsis').html(this.formaSerie.get('sinopsis').value);
				this.sinopsis = new window['Quill']('#sinopsis', { theme: 'snow' });
				$('#selectCronologia').select2({ placeholder: 'Elegir cronología', allowClear: true});
				$('#selectCronologiaSerie').select2({ placeholder: 'Elegir serie relacionada'});
			}
			$('#ano').mask('0000');
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
		// Creadores
		let creadoresNuevos: Creador[] = [];
		let serieCreadores = [];
		this.listaCreadoresTemporal.forEach((creadorNombre) => {
			let creador: Creador = Lista.obtenerItem(this.listaCreadores, 'nombre', creadorNombre);
			if (!creador) {
				creador = new Creador();
				creador.nombre = creadorNombre;
				creadoresNuevos.push(creador);
			}
			serieCreadores.push({ serieId: serie.id, creadorId: creador.id });
		});
		promesas.push(this.rest.insertarItems(this.environment.TABLAS.CREADOR, creadoresNuevos).then(() => {
			this.inicializarListaCreadores();
		}));
		promesas.push(this.rest.eliminarItem(this.environment.TABLAS.SERIE_CREADORES, 'serieId', serie.id).then(() => {
			promesas.push(this.rest.insertarItems(this.environment.TABLAS.SERIE_CREADORES, serieCreadores));
		}));
		// Generos
		let serieGeneros = [];
		this.listaGenerosTemporal.forEach((generoNombre) => {
			let genero: Genero = Lista.obtenerItem(this.listaGeneros, 'nombre', generoNombre);
			serieGeneros.push({ serieId: serie.id, generoId: genero.id });
		});
		promesas.push(this.rest.eliminarItem(this.environment.TABLAS.SERIE_GENEROS, 'serieId', serie.id).then(() => {
			promesas.push(this.rest.insertarItems(this.environment.TABLAS.SERIE_GENEROS, serieGeneros));
		}));
		// Temas
		let temasNuevos: Tema[] = [];
		let serieTemas = [];
		this.listaTemasTemporal.forEach((temaNombre) => {
			let tema: Tema = Lista.obtenerItem(this.listaTemas, 'nombre', temaNombre);
			if (!tema) {
				tema = new Tema();
				tema.nombre = temaNombre;
				temasNuevos.push(tema);
			}
			serieTemas.push({ serieId: serie.id, temaId: tema.id });
		});
		promesas.push(this.rest.insertarItems(this.environment.TABLAS.TEMA, temasNuevos).then(() => {
			this.inicializarListaTemas();
		}));
		promesas.push(this.rest.eliminarItem(this.environment.TABLAS.SERIE_TEMAS, 'serieId', serie.id).then(() => {
			promesas.push(this.rest.insertarItems(this.environment.TABLAS.SERIE_TEMAS, serieTemas));
		}));
		// Serie
		promesas.push(this.rest.actualizarItem(this.environment.TABLAS.SERIE, serie));
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
			this.listaCreadoresExistentes = [];
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.CREADOR).then((resultado) => {
				this.listaCreadores = Lista.ordenar(Creador.arreglo(resultado), 'nombre');
				this.listaCreadores.forEach((creador) => {
					this.listaCreadoresExistentes.push(creador.nombre);
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
			this.listaGenerosExistentes = [];
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.GENERO).then((resultado) => {
				this.listaGeneros = Lista.ordenar(Genero.arreglo(resultado), 'nombre');
				this.listaGeneros.forEach((genero) => {
					this.listaGenerosExistentes.push(genero.nombre);
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
			this.listaTemasExistentes = [];
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.TEMA).then((resultado) => {
				this.listaTemas = Lista.ordenar(Tema.arreglo(resultado), 'nombre');
				this.listaTemas.forEach((tema) => {
					this.listaTemasExistentes.push(tema.nombre);
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
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.SERIE).then((resultado) => {
				this.listaSeries = Serie.arreglo(resultado);
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
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.CRONOLOGIA).then((resultado) => {
				this.listaCronologias = Lista.ordenar(Cronologia.arreglo(resultado), 'nombre');
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
			this.rest.obtenerTodosLosItems(this.environment.TABLAS.PAIS).then((resultado) => {
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
