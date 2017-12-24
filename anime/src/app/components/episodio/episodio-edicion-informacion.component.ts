import { Component, OnInit, AfterViewInit, Injector, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Lista } from '../../clases/comunes';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { Serie } from '../../model/serie';
import { Saga } from '../../model/saga';
import { Episodio } from '../../model/episodio';
import { Fansub } from '../../model/fansub';
import { Pais } from '../../model/pais';


@Component({
	selector: 'app-episodio-edicion-informacion',
	templateUrl: './episodio-edicion-informacion.component.html',
	styles: []
})
export class EpisodioEdicionInformacionComponent extends BaseComponent implements OnInit, AfterViewInit {

	@Input() registroId: string;

	public episodio: Episodio;
	public saga: Saga;
	public serie: Serie;
	public forma: FormGroup;
	public listaEpisodioMedios: { codigo: string, nombre: string }[];
	public listaEpisodioFuentes: { codigo: string, nombre: string }[];
	public listaEpisodioCensuras: { codigo: string, nombre: string }[];

	public listaAudiosExistentes: Pais[];
	public listaAudiosNuevos: Pais[] = [];
	public listaAudiosExistentesNombre: string[] = [];
	public listaAudiosSeleccionadosNombre: string[] = [];

	public listaFansubsExistentes: Fansub[];
	public listaFansubsNuevos: Fansub[] = [];
	public listaFansubsExistentesNombre: string[] = [];
	public listaFansubsSeleccionadosNombre: string[] = [];

	public listaSubtitulosExistentes: Pais[];
	public listaSubtitulosNuevos: Pais[] = [];
	public listaSubtitulosExistentesNombre: string[] = [];
	public listaSubtitulosSeleccionadosNombre: string[] = [];

	constructor(
		private injector: Injector
	) {
		super(injector);
	}

	ngOnInit() {
		this.loader.abrir();
		this.inicializarForma();
		let promesas: Promise<any>[] = [];
		this.llenarForma().then(() => {
			this.inicializarCamposEpisodio();
			promesas.push(this.inicializarListaEpisodioMedios());
			promesas.push(this.inicializarListaEpisodioFuentes());
			promesas.push(this.inicializarListaEpisodioCensuras());
			promesas.push(this.inicializarListaFansubs());
			promesas.push(this.inicializarListaAudios());
			promesas.push(this.inicializarListaSubtitulos());
			Promise.all(promesas).then(() => {
				this.loader.cerrar();
			});
		});
	}

	ngAfterViewInit() {
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarForma(): void {
		let nombreMetodo = 'inicializarForma';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.forma = new FormGroup({
			'id': new FormControl('', Validators.required),
			'borrado': new FormControl('', Validators.required),
			'activo': new FormControl('', Validators.required),
			'sagaId': new FormControl(''),
			'ano': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
			'censura': new FormControl(''),
			'crc': new FormControl('', [Validators.minLength(8), Validators.maxLength(8)]),
			'duracion': new FormControl(''),
			'extension': new FormControl(''),
			'fuente': new FormControl(''),
			'medio': new FormControl('', Validators.required),
			'numero': new FormControl('', Validators.required),
			'numeroOrden': new FormControl(''),
			'tamano': new FormControl(''),
			'resolucionHorizontal': new FormControl(''),
			'resolucionVertical': new FormControl(''),
			'sinopsis': new FormControl(''),
			'titulo': new FormControl('', Validators.required),
			'visto': new FormControl('', Validators.required),
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
				this.rest.obtenerEpisodioPorId(this.registroId).then((episodio) => {
					this.episodio = new Episodio(episodio);
					this.rest.obtenerItemPorIdSimple(this.environment.REST.TABLAS.SAGA, this.episodio.sagaId).then((saga) => {
						this.saga = new Saga(saga);
						this.rest.obtenerItemPorIdSimple(this.environment.REST.TABLAS.SERIE, this.saga.serieId).then((serie) => {
							this.serie = new Serie(serie);
							// Fansubs
							this.episodio.fansubs.forEach((fansub) => {
								this.listaFansubsSeleccionadosNombre.push(`[${fansub.siglas}] ${fansub.nombre}`);
							});
							// Audios
							this.episodio.audios.forEach((audio) => {
								this.listaAudiosSeleccionadosNombre.push(audio.idioma);
							});
							// Subtitulos
							this.episodio.subtitulos.forEach((subtitulo) => {
								this.listaSubtitulosSeleccionadosNombre.push(subtitulo.idioma);
							});
							delete this.episodio.fansubs;
							delete this.episodio.audios;
							delete this.episodio.subtitulos;
							this.forma.setValue(this.episodio);
							resolve();
						});
					});
				});
			}
		});
	}

	/**
	 * Guarda la informacion.
	 */
	public guardar(): void {
		if (this.forma.valid) {
			let nombreMetodo = 'guardar';
			console.log(`[${nombreMetodo}] Actualizando Episodio...`);
			this.loader.abrir();
			let episodio = new Episodio(this.forma.value);
			if (!episodio.numeroOrden) {
				episodio.numeroOrden = episodio.numero;
			}
			delete episodio.audios;
			delete episodio.fansubs;
			delete episodio.subtitulos;
			this.rest.actualizarItem(this.environment.REST.TABLAS.EPISODIO, episodio).then(() => {
				this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, this.serie).then(() => {
					this.rest.actualizarItem(this.environment.REST.TABLAS.SAGA, this.saga).then(() => {
						console.log(`[${nombreMetodo}] Episodio guardado correctamente.`);
						this.loader.cerrar();
					});
				});
			});
		}
	}

	/**
	 * Elimina un episodio.
	 */
	public eliminarEpisodio(id: string, titulo): void {
		let nombreMetodo = 'eliminarEpisodio';
		console.log(`[${nombreMetodo}] Elminando episodio: ${titulo}...`);
		// this.loader.abrir();
		// this.rest.eliminarItem(this.environment.REST.TABLAS.EPISODIO, 'id', id).then(() => {
		// 	this.decrementarEpisodio();
		// 	this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, this.serie).then(() => {
		// 		this.rest.actualizarItem(this.environment.REST.TABLAS.SAGA, this.sagaSeleccionada).then(() => {
		// 			console.log(`[${nombreMetodo}] Episodio eliminado correctamente.`);
		// 			this.inicializarListaSagas();
		// 			setTimeout(() => {
		// 				if (this.sagaSeleccionada) {
		// 					(<any>$('#' + this.sagaSeleccionada.id)).collapse('show');
		// 				}
		// 			}, 500);
		// 			this.loader.cerrar();
		// 		});
		// 	});
		// });
	}

	/**
	 * Incrementa los episodios totales de la seria y la saga.
	 */
	private incrementarEpisodio() {
		this.saga.episodiosTotales = this.saga.episodiosTotales + 1;
		switch (this.saga.tipo) {
			case Saga.TIPO_TV: {
				this.serie.episodiosTotales = this.serie.episodiosTotales + 1;
			}
			case Saga.TIPO_OVA: {
				this.serie.ovasTotales = this.serie.ovasTotales + 1;
			}
			case Saga.TIPO_MOVIE: {
				this.serie.peliculasTotales = this.serie.peliculasTotales + 1;
			}
			case Saga.TIPO_EXTRA: {
				this.serie.extrasTotales = this.serie.extrasTotales + 1;
			}
		}
	}

	/**
	 * Decrementa los episodios totales de la seria y la saga.
	 */
	private decrementarEpisodio() {
		this.saga.episodiosTotales = this.saga.episodiosTotales - 1;
		switch (this.saga.tipo) {
			case Saga.TIPO_TV: {
				this.serie.episodiosTotales = this.serie.episodiosTotales - 1;
			}
			case Saga.TIPO_OVA: {
				this.serie.ovasTotales = this.serie.ovasTotales - 1;
			}
			case Saga.TIPO_MOVIE: {
				this.serie.peliculasTotales = this.serie.peliculasTotales - 1;
			}
			case Saga.TIPO_EXTRA: {
				this.serie.extrasTotales = this.serie.extrasTotales - 1;
			}
		}
	}

	/**
	 * Agrega un fansub.
	 */
	public agregarFansub(fansubSiglasNombre): void {
		let nombreMetodo = 'agregarFansub';
		console.log(`[${nombreMetodo}] Agregando fansub: ${fansubSiglasNombre}...`);
		this.loader.abrir();
		let episodio = new Serie(this.forma.value);
		let siglas = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf('[') + 1, fansubSiglasNombre.indexOf(']'));
		let nombre = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf(' ') + 1, fansubSiglasNombre.length);
		let fansubExistente = Lista.obtenerItem(this.listaFansubsExistentes, 'nombre', nombre);
		if (!fansubExistente) {
			console.log(`[${nombreMetodo}] No existe el fansub.`);
			let fansubNuevo = new Fansub();
			fansubNuevo.siglas = siglas;
			fansubNuevo.nombre = nombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.FANSUB, fansubNuevo).then(() => {
				let episodioFansub = { episodioId: episodio.id, fansubId: fansubNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_FANSUBS, episodioFansub).then(() => {
					console.log(`[${nombreMetodo}] Fansub agregado correctamente.`);
					this.listaFansubsNuevos.push(fansubNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let episodioFansub = { episodioId: episodio.id, fansubId: fansubExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_FANSUBS, episodioFansub).then(() => {
				console.log(`[${nombreMetodo}] Fansub agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un fansub.
	 */
	public eliminarFansub(fansubSiglasNombre): void {
		let nombreMetodo = 'eliminarFansub';
		console.log(`[${nombreMetodo}] Elminando fansub: ${fansubSiglasNombre}...`);
		this.loader.abrir();
		let episodio = new Serie(this.forma.value);
		let siglas = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf('[') + 1, fansubSiglasNombre.indexOf(']'));
		let nombre = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf(' ') + 1, fansubSiglasNombre.length);
		let fansubNuevo = Lista.obtenerItem(this.listaFansubsNuevos, 'nombre', nombre);
		if (fansubNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_FANSUBS, 'episodioId', episodio.id, 'fansubId', fansubNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.FANSUB, 'id', fansubNuevo.id).then(() => {
					this.listaFansubsNuevos.splice(this.listaFansubsNuevos.indexOf(fansubNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Fansub eliminado correctamente.`);
				});
			});
		} else {
			let fansubExistente = Lista.obtenerItem(this.listaFansubsExistentes, 'nombre', nombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_FANSUBS, 'episodioId', episodio.id, 'fansubId', fansubExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Fansub eliminado correctamente.`);
			});
		}
	}

	/**
	 * Agrega un audio.
	 */
	public agregarAudio(audioNombre): void {
		let nombreMetodo = 'agregarAudio';
		console.log(`[${nombreMetodo}] Agregando audio: ${audioNombre}...`);
		this.loader.abrir();
		let episodio = new Episodio(this.forma.value);
		let audioExistente = Lista.obtenerItem(this.listaAudiosExistentes, 'idioma', audioNombre);
		if (!audioExistente) {
			console.log(`[${nombreMetodo}] No existe el audio.`);
			let audioNuevo = new Pais();
			audioNuevo.nombre = audioNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.PAIS, audioNuevo).then(() => {
				let episodioAudio = { episodioId: episodio.id, paisId: audioNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_AUDIOS, episodioAudio).then(() => {
					console.log(`[${nombreMetodo}] Audio agregado correctamente.`);
					this.listaAudiosNuevos.push(audioNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let episodioAudio = { episodioId: episodio.id, paisId: audioExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_AUDIOS, episodioAudio).then(() => {
				console.log(`[${nombreMetodo}] Audio agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un audio.
	 */
	public eliminarAudio(audioNombre): void {
		let nombreMetodo = 'eliminarAudio';
		console.log(`[${nombreMetodo}] Elminando audio: ${audioNombre}...`);
		this.loader.abrir();
		let episodio = new Episodio(this.forma.value);
		let audioNuevo = Lista.obtenerItem(this.listaAudiosNuevos, 'idioma', audioNombre);
		if (audioNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_AUDIOS, 'episodioId', episodio.id, 'paisId', audioNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.PAIS, 'id', audioNuevo.id).then(() => {
					this.listaAudiosNuevos.splice(this.listaAudiosNuevos.indexOf(audioNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Audio eliminado correctamente.`);
				});
			});
		} else {
			let audioExistente = Lista.obtenerItem(this.listaAudiosExistentes, 'idioma', audioNombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_AUDIOS, 'episodioId', episodio.id, 'paisId', audioExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Audio eliminado correctamente.`);
			});
		}
	}

	/**
	 * Agrega un subtitulo.
	 */
	public agregarSubtitulo(subtituloNombre): void {
		let nombreMetodo = 'agregarSubtitulo';
		console.log(`[${nombreMetodo}] Agregando subtitulo: ${subtituloNombre}...`);
		this.loader.abrir();
		let episodio = new Episodio(this.forma.value);
		let subtituloExistente = Lista.obtenerItem(this.listaSubtitulosExistentes, 'idioma', subtituloNombre);
		if (!subtituloExistente) {
			console.log(`[${nombreMetodo}] No existe el subtitulo.`);
			let subtituloNuevo = new Pais();
			subtituloNuevo.nombre = subtituloNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.PAIS, subtituloNuevo).then(() => {
				let episodioSubtitulo = { episodioId: episodio.id, paisId: subtituloNuevo.id };
				this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_SUBTITULOS, episodioSubtitulo).then(() => {
					console.log(`[${nombreMetodo}] Subtitulo agregado correctamente.`);
					this.listaSubtitulosNuevos.push(subtituloNuevo);
					this.loader.cerrar();
				});
			});
		} else {
			let episodioSubtitulo = { episodioId: episodio.id, paisId: subtituloExistente.id };
			this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO_SUBTITULOS, episodioSubtitulo).then(() => {
				console.log(`[${nombreMetodo}] Subtitulo agregado correctamente.`);
				this.loader.cerrar();
			});
		}
	}

	/**
	 * Elimina un subtitulo.
	 */
	public eliminarSubtitulo(subtituloNombre): void {
		let nombreMetodo = 'eliminarSubtitulo';
		console.log(`[${nombreMetodo}] Elminando subtitulo: ${subtituloNombre}...`);
		this.loader.abrir();
		let episodio = new Episodio(this.forma.value);
		let subtituloNuevo = Lista.obtenerItem(this.listaSubtitulosNuevos, 'idioma', subtituloNombre);
		if (subtituloNuevo) {
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_SUBTITULOS, 'episodioId', episodio.id, 'paisId', subtituloNuevo.id).then(() => {
				this.rest.eliminarItem(this.environment.REST.TABLAS.PAIS, 'id', subtituloNuevo.id).then(() => {
					this.listaSubtitulosNuevos.splice(this.listaSubtitulosNuevos.indexOf(subtituloNuevo), 1);
					this.loader.cerrar();
					console.log(`[${nombreMetodo}] Subtitulo eliminado correctamente.`);
				});
			});
		} else {
			let subtituloExistente = Lista.obtenerItem(this.listaSubtitulosExistentes, 'idioma', subtituloNombre);
			this.rest.eliminarItemsAnd(this.environment.REST.TABLAS.EPISODIO_SUBTITULOS, 'episodioId', episodio.id, 'paisId', subtituloExistente.id).then(() => {
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Subtitulo eliminado correctamente.`);
			});
		}
	}

	/**
	 * Inicializa los campos del modal episodio.
	 */
	public inicializarCamposEpisodio() {
		let nombreMetodo = 'inicializarCamposEpisodio';
		console.log(`[${nombreMetodo}] Inicializando campos de episodio...`);
		setTimeout(() => {
			$('#ano').mask('0000');
			$('#crc').mask('HHHHHHHH', { 'translation': { 'H': { pattern: /[0-9|A-F]/ } } });
			this.inicializarSelector('#selectorEpisodioVisto', this.forma.get('visto').value, (valor) => {
				this.forma.get('visto').setValue(valor);
			});
		}, 100);
	}

	/**
	 * Inicializa la lista de medios de episodios.
	 */
	private inicializarListaEpisodioMedios(): Promise<any> {
		let nombreMetodo = 'inicializarListaEpisodioMedios';
		console.log(`[${nombreMetodo}] Obteniendo medios de episodios...`);
		return new Promise<any>((resolve, reject) => {
			this.listaEpisodioMedios = Lista.ordenar(Episodio.listaMedios(), 'nombre');
			resolve();
		});
	}

	/**
	 * Inicializa la lista de fuentes de episodios.
	 */
	private inicializarListaEpisodioFuentes(): Promise<any> {
		let nombreMetodo = 'inicializarListaEpisodioFuentes';
		console.log(`[${nombreMetodo}] Obteniendo fuentes de episodios...`);
		return new Promise<any>((resolve, reject) => {
			this.listaEpisodioFuentes = Lista.ordenar(Episodio.listaFuentes(), 'nombre');
			resolve();
		});
	}

	/**
	 * Inicializa la lista de censuras de episodios.
	 */
	private inicializarListaEpisodioCensuras(): Promise<any> {
		let nombreMetodo = 'inicializarListaEpisodioCensuras';
		console.log(`[${nombreMetodo}] Obteniendo censuras de episodios...`);
		return new Promise<any>((resolve, reject) => {
			this.listaEpisodioCensuras = Lista.ordenar(Episodio.listaCensuras(), 'nombre');
			resolve();
		});
	}

	/**
	 * Inicializa la lista de audios.
	 */
	private inicializarListaAudios(): Promise<any> {
		let nombreMetodo = 'inicializarListaAudios';
		console.log(`[${nombreMetodo}] Obteniendo audios...`);
		return new Promise<any>((resolve, reject) => {
			this.listaAudiosExistentesNombre = [];
			this.rest.obtenerTodosLosItemsSimple(this.environment.REST.TABLAS.PAIS).then((resultado) => {
				this.listaAudiosExistentes = Pais.arreglo(resultado);
				this.listaAudiosExistentes.forEach((pais) => {
					this.listaAudiosExistentesNombre.push(pais.idioma);
				});
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de fansubs.
	 */
	private inicializarListaFansubs(): Promise<any> {
		let nombreMetodo = 'inicializarListaFansubs';
		console.log(`[${nombreMetodo}] Obteniendo fansubs...`);
		return new Promise<any>((resolve, reject) => {
			this.listaFansubsExistentesNombre = [];
			this.rest.obtenerTodosLosItemsSimple(this.environment.REST.TABLAS.FANSUB).then((resultado) => {
				this.listaFansubsExistentes = Lista.ordenar(Fansub.arreglo(resultado), 'nombre');
				this.listaFansubsExistentes.forEach((fansub) => {
					this.listaFansubsExistentesNombre.push(`[${fansub.siglas}] ${fansub.nombre}`);
				});
				resolve();
			});
		});
	}

	/**
	 * Inicializa la lista de subtitulos.
	 */
	private inicializarListaSubtitulos(): Promise<any> {
		let nombreMetodo = 'inicializarListaSubtitulos';
		console.log(`[${nombreMetodo}] Obteniendo subtitulos...`);
		return new Promise<any>((resolve, reject) => {
			this.listaSubtitulosExistentesNombre = [];
			this.rest.obtenerTodosLosItemsSimple(this.environment.REST.TABLAS.PAIS).then((resultado) => {
				this.listaSubtitulosExistentes = Lista.ordenar(Pais.arreglo(resultado), 'nombre');
				this.listaSubtitulosExistentes.forEach((pais) => {
					this.listaSubtitulosExistentesNombre.push(pais.idioma);
				});
				resolve();
			});
		});
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verForma(): void {
		let nombreMetodo = 'verForma';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.forma);
	}
}
