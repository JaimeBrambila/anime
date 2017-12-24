import { Component, OnInit, AfterViewInit, Injector, ChangeDetectorRef, Input } from '@angular/core';
import { BaseComponent } from './../../components/comunes/base/base.component';
import { Lista } from '../../clases/comunes';
import { FormControl, FormGroup, FormArray, Validators } from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { Serie } from '../../model/serie';
import { Saga } from '../../model/saga';
import { Episodio } from '../../model/episodio';
import { Fansub } from '../../model/fansub';
import { Pais } from '../../model/pais';


@Component({
	selector: 'app-serie-edicion-episodios',
	templateUrl: './serie-edicion-episodios.component.html',
	styles: []
})
export class SerieEdicionEpisodiosComponent extends BaseComponent implements OnInit {

	@Input() registroId: string;
	@Input() sagaTipo: string;

	public serie: Serie;
	public formaSaga: FormGroup;
	public formaEpisodio: FormGroup;
	public formaEpisodioManual: FormGroup;
	public listaSagas: Saga[];
	public sagaSeleccionada: Saga;
	public listaEpisodioMedios: { codigo: string, nombre: string }[];
	public listaEpisodioFuentes: { codigo: string, nombre: string }[];
	public listaEpisodioCensuras: { codigo: string, nombre: string }[];

	public listaAudiosExistentes: Pais[];
	public listaAudiosNuevos: Pais[] = [];
	public listaAudiosExistentesNombre: string[] = [];
	public listaAudiosSeleccionadosNombre: string[] = [];
	public listaAudiosSeleccionados: Pais[] = [];

	public listaFansubsExistentes: Fansub[];
	public listaFansubsNuevos: Fansub[] = [];
	public listaFansubsExistentesNombre: string[] = [];
	public listaFansubsSeleccionadosNombre: string[] = [];
	public listaFansubsSeleccionados: Fansub[] = [];

	public listaSubtitulosExistentes: Pais[];
	public listaSubtitulosNuevos: Pais[] = [];
	public listaSubtitulosExistentesNombre: string[] = [];
	public listaSubtitulosSeleccionadosNombre: string[] = [];
	public listaSubtitulosSeleccionados: Pais[] = [];

	public videos = [];

	constructor(
		private injector: Injector,
	) {
		super(injector);
	}

	ngOnInit() {
		this.loader.abrir();
		let promesas: Promise<any>[] = [];
		this.rest.obtenerSeriePorId(this.registroId).then((respuesta) => {
			this.serie = new Serie(respuesta);
			this.inicializarFormaSaga();
			this.inicializarFormaEpisodio();
			this.inicializarFormaEpisodioManual();
			this.inicializarListaEpisodioCensuras();
			promesas.push(this.inicializarListaSagas());
			promesas.push(this.inicializarListaFansubs());
			promesas.push(this.inicializarListaAudios());
			promesas.push(this.inicializarListaSubtitulos());
			Promise.all(promesas).then(() => {
				this.loader.cerrar();
			});
		});
	}

	/**
	 * Mete los archivos seleccionados en un arreglo.
	 */
	public seleccionarVideos(evento) {
		let nombreMetodo = 'seleccionarVideos';
		console.log(`[${nombreMetodo}] Seleccionando videos...`);
		this.videos = [];
		let archivos = evento.target.files;
		for (let i = 0; i < archivos.length; i++) {
			let nombre = archivos[i].name;
			let tamano = archivos[i].size;
			let url = URL.createObjectURL(archivos[i]);
			let video = document.createElement('video');
			video.src = url;
			this.videos.push({ nombre: nombre, tamano: tamano, video: video });
		};
	}

	/**
	 * Carga la informacion de los videos en la base de datos.
	 */
	public cargarVideos() {
		let nombreMetodo = 'cargarVideos';
		console.log(`[${nombreMetodo}] Obteniendo informacion de los videos...`);
		this.loader.abrir();
		let promesas: Promise<any>[] = [];
		let episodios: Episodio[] = [];
		let episodioFansubs = [];
		let episodioAudios = [];
		let episodioSubtitulos = [];
		let vistos:number = 0;
		this.videos.forEach((elemento) => {
			let extension = elemento.nombre.substring(elemento.nombre.lastIndexOf('.') + 1, elemento.nombre.length);
			extension = extension.toUpperCase();
			let medioDatos = this.obtenerMedio(elemento.nombre);
			let medio = medioDatos.medio;
			let medioPosicion = medioDatos.medioPosicion;
			let temporal = elemento.nombre.substring(medioPosicion + 3, elemento.nombre.length);
			let datosPosicion = temporal.lastIndexOf('(');
			let nombreConTitulo = temporal.substring(0, datosPosicion - 1);
			let datos = temporal.substring(datosPosicion, temporal.length);
			let tituloPosicion = nombreConTitulo.indexOf(' - ');
			let titulo;
			let nombreConNumero;
			if (tituloPosicion > -1) {
				nombreConNumero = nombreConTitulo.substring(0, tituloPosicion);
				titulo = nombreConTitulo.substring(tituloPosicion + 3, nombreConTitulo.length);
			} else {
				nombreConNumero = nombreConTitulo;
				titulo = nombreConTitulo;
			}
			let numeroPosicion = nombreConNumero.indexOf(' ');
			let numero = nombreConNumero.substring(numeroPosicion + 1, nombreConNumero.length);
			let ano = datos.substring(1, 5);
			datos = datos.substring(datos.indexOf('['), datos.length);
			let finFansub = datos.indexOf(']');
			let fansub = datos.substring(1, finFansub);
			datos = datos.substring(finFansub + 1, datos.length);
			let finFuente = datos.indexOf(']');
			let fuente = datos.substring(1, finFuente);
			datos = datos.substring(finFuente + 1, datos.length);
			let finResolucion = datos.indexOf(']');
			let resolucion = datos.substring(1, finResolucion);
			datos = datos.substring(finResolucion + 1, datos.length);
			let finCrc = datos.indexOf(']');
			let crc = datos.substring(1, finCrc);
			let visto = this.formaEpisodio.get('visto').value;
			if(visto){
				vistos++;
			}
			let censura = this.formaEpisodio.get('censura').value;
			let episodio = new Episodio();
			episodio.ano = Number(ano);
			episodio.crc = crc;
			episodio.duracion = Number(elemento.video.duration);
			episodio.extension = extension;
			episodio.fuente = fuente;
			episodio.medio = medio;
			episodio.numero = Number(numero);
			episodio.numeroOrden = Number(numero);
			episodio.resolucionHorizontal = elemento.video.videoWidth;
			episodio.resolucionVertical = elemento.video.videoHeight;
			episodio.sagaId = this.sagaSeleccionada.id;
			episodio.tamano = Number(elemento.tamano);
			episodio.titulo = titulo;
			episodio.visto = visto;
			episodio.censura = censura;
			episodios.push(episodio);
			// EpisodioFansubs
			this.listaFansubsSeleccionados.forEach((fansub) => {
				episodioFansubs.push({ episodioId: episodio.id, fansubId: fansub.id });
			});
			// EpisodioAudios
			this.listaAudiosSeleccionados.forEach((audio) => {
				episodioAudios.push({ episodioId: episodio.id, paisId: audio.id });
			});
			// EpisodioSubtitulos
			this.listaSubtitulosSeleccionados.forEach((subtitulo) => {
				episodioSubtitulos.push({ episodioId: episodio.id, paisId: subtitulo.id });
			});
		});
		this.rest.insertarItems(this.environment.REST.TABLAS.EPISODIO, episodios).then(()=>{
			this.incrementarEpisodio(episodios.length, vistos);
			promesas.push(this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, this.serie));
			promesas.push(this.rest.actualizarItem(this.environment.REST.TABLAS.SAGA, this.sagaSeleccionada));
			promesas.push(this.rest.insertarItems(this.environment.REST.TABLAS.EPISODIO_FANSUBS, episodioFansubs));
			promesas.push(this.rest.insertarItems(this.environment.REST.TABLAS.EPISODIO_AUDIOS, episodioAudios));
			promesas.push(this.rest.insertarItems(this.environment.REST.TABLAS.EPISODIO_SUBTITULOS, episodioSubtitulos));
			Promise.all(promesas).then((respuesta) => {
				this.inicializarListaSagas();
				(<any>$('#modalEpisodio')).modal('hide');
				setTimeout(() => {
					if (this.sagaSeleccionada) {
						(<any>$('#' + this.sagaSeleccionada.id)).collapse('show');
					}
				}, 500);
				console.log('OK', respuesta)
				this.loader.cerrar();
			});
		}).catch((error)=>{
			(<any>$('#modalEpisodio')).modal('hide');
			this.swal.error('Error',error);
			this.loader.cerrar();
		});
	}

	/**
	 * Obtiene el medio a partir del nombre del archivo.
	 */
	private obtenerMedio(nombre: string) {
		let nombreMetodo = 'obtenerMedio';
		console.log(`[${nombreMetodo}] Obteniendo medio...`);
		let medioPosicion;
		medioPosicion = nombre.indexOf(' - Episodio');
		if (medioPosicion > -1) {
			return { medio: Episodio.MEDIO_TV, medioPosicion: medioPosicion };
		} else {
			medioPosicion = nombre.indexOf(' - OVA');
			if (medioPosicion > -1) {
				return { medio: Episodio.MEDIO_OVA, medioPosicion: medioPosicion };
			} else {
				medioPosicion = nombre.indexOf(' - Movie');
				if (medioPosicion > -1) {
					return { medio: Episodio.MEDIO_MOVIE, medioPosicion: medioPosicion };
				} else {
					medioPosicion = nombre.indexOf(' - Special');
					if (medioPosicion > -1) {
						return { medio: Episodio.MEDIO_SPECIAL, medioPosicion: medioPosicion };
					} else {
						medioPosicion = nombre.indexOf(' - ONA');
						if (medioPosicion > -1) {
							return { medio: Episodio.MEDIO_ONA, medioPosicion: medioPosicion };
						} else {
							medioPosicion = nombre.indexOf(' - Omake');
							if (medioPosicion > -1) {
								return { medio: Episodio.MEDIO_OMAKE, medioPosicion: medioPosicion };
							} else {
								medioPosicion = nombre.indexOf(' - Featurette');
								if (medioPosicion > -1) {
									return { medio: Episodio.MEDIO_FEATURETTE, medioPosicion: medioPosicion };
								}
							}
						}
					}
				}
			}
		}
		return { medio: null, medioPosicion: null };
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarFormaSaga(): void {
		let nombreMetodo = 'inicializarFormaSaga';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.formaSaga = new FormGroup({
			'numero': new FormControl('', Validators.required),
			'titulo': new FormControl('', Validators.required),
		});
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarFormaEpisodio(episodio?: Episodio): void {
		let nombreMetodo = 'inicializarFormaEpisodio';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.formaEpisodio = new FormGroup({
			'censura': new FormControl('', Validators.required),
			'visto': new FormControl(false, Validators.required),
		});
	}

	/**
	 * Inicializa la forma.
	 */
	private inicializarFormaEpisodioManual(episodio?: Episodio): void {
		let nombreMetodo = 'inicializarFormaEpisodioManual';
		console.log(`[${nombreMetodo}] Inicializando la forma...`);
		this.formaEpisodioManual = new FormGroup({
			'numero': new FormControl('', Validators.required),
			'titulo': new FormControl('', Validators.required),
		});
	}

	/**
	 * Agrega una saga.
	 */
	public agregarSaga(): void {
		if (this.formaSaga.valid) {
			let nombreMetodo = 'agregarSaga';
			console.log(`[${nombreMetodo}] Agregando Saga...`);
			this.loader.abrir();
			let saga = new Saga(this.formaSaga.value);
			saga.serieId = this.serie.id;
			saga.tipo = Saga.TIPO_TV;
			this.rest.insertarItem(this.environment.REST.TABLAS.SAGA, saga).then(() => {
				console.log(`[${nombreMetodo}] Saga agregada correctamente.`);
				this.inicializarFormaSaga();
				this.inicializarListaSagas().then(() => {
					(<any>$('#modalSaga')).modal('hide');
					this.loader.cerrar();
				});
			});
		}
	}

	/**
	 * Elimina una saga.
	 */
	public eliminarSaga(id: string, titulo): void {
		let nombreMetodo = 'eliminarSaga';
		console.log(`[${nombreMetodo}] Elminando saga: ${titulo}...`);
		this.loader.abrir();
		this.rest.eliminarItem(this.environment.REST.TABLAS.SAGA, 'id', id).then(() => {
			console.log(`[${nombreMetodo}] Saga eliminada correctamente.`);
			this.inicializarListaSagas();
			this.loader.cerrar();
		});
	}

	/**
	 * Selecciona la saga a la que se agregara el episodio.
	 */
	public seleccionarSaga(saga: Saga): void {
		let nombreMetodo = 'seleccionarSaga';
		console.log(`[${nombreMetodo}] Seleccionando Saga: ${saga.titulo}...`);
		this.sagaSeleccionada = saga;
		(<any>$('.panel-collapse')).collapse('hide');
		(<any>$('#' + this.sagaSeleccionada.id)).collapse('show');
	}

	/**
	 * Abre el modal para agregar episodio.
	 */
	public agregarEpisodio(saga: Saga): void {
		let nombreMetodo = 'agregarEpisodio';
		console.log(`[${nombreMetodo}] Mostrando modal de nuevo Episodio...`);
		this.seleccionarSaga(saga);
		this.inicializarCamposEpisodio();
	}

	/**
	 * Inicializa los campos del modal episodio.
	 */
	public inicializarCamposEpisodio() {
		let nombreMetodo = 'inicializarCamposEpisodio';
		console.log(`[${nombreMetodo}] Inicializando campos de episodio...`);
		setTimeout(() => {
			$("#archivos").change((evento) => {
				this.seleccionarVideos(evento)
			});
			this.inicializarSelector('#selectorEpisodioVisto', this.formaEpisodio.get('visto').value, (valor) => {
				this.formaEpisodio.get('visto').setValue(valor);
			});
		}, 100);
	}

	/**
	 * Abre el modal para editar episodio.
	 */
	public editarEpisodio(episodio: Episodio): void {
		let nombreMetodo = 'editarEpisodio';
		console.log(`[${nombreMetodo}] Navegando a editar Episodio...`);
		this.router.navigateByUrl(`/app/series/editar-episodio/${episodio.id}/${this.serie.id}`);
	}

	/**
	 * Guarda un episodio.
	 */
	public guardarEpisodio(): void {
		if (this.formaEpisodioManual.valid) {
			let nombreMetodo = 'guardarEpisodio';
			console.log(`[${nombreMetodo}] Guardando Episodio...`);
			this.loader.abrir();
			let episodio = new Episodio(this.formaEpisodioManual.value);
			episodio.sagaId = this.sagaSeleccionada.id;
			episodio.numeroOrden = episodio.numero;
			delete episodio.audios;
			delete episodio.fansubs;
			delete episodio.subtitulos;
			this.incrementarEpisodio(1, episodio.visto?1:0);
			this.rest.insertarItem(this.environment.REST.TABLAS.EPISODIO, episodio).then(() => {
				this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, this.serie).then(() => {
					this.rest.actualizarItem(this.environment.REST.TABLAS.SAGA, this.sagaSeleccionada).then(() => {
						console.log(`[${nombreMetodo}] Episodio guardado correctamente.`);
						this.inicializarListaSagas();
						(<any>$('#modalEpisodio')).modal('hide');
						setTimeout(() => {
							if (this.sagaSeleccionada) {
								(<any>$('#' + this.sagaSeleccionada.id)).collapse('show');
							}
						}, 500);
						this.loader.cerrar();
					});
				});
			});
		}
	}

	/**
	 * Elimina un episodio.
	 */
	public eliminarEpisodio(episodio: Episodio): void {
		let nombreMetodo = 'eliminarEpisodio';
		console.log(`[${nombreMetodo}] Elminando episodio: ${episodio.titulo}...`);
		this.loader.abrir();
		this.rest.eliminarItem(this.environment.REST.TABLAS.EPISODIO, 'id', episodio.id).then(() => {
			this.decrementarEpisodio(1, episodio.visto?1:0);
			this.rest.actualizarItem(this.environment.REST.TABLAS.SERIE, this.serie).then(() => {
				this.rest.actualizarItem(this.environment.REST.TABLAS.SAGA, this.sagaSeleccionada).then(() => {
					console.log(`[${nombreMetodo}] Episodio eliminado correctamente.`);
					this.inicializarListaSagas();
					setTimeout(() => {
						if (this.sagaSeleccionada) {
							(<any>$('#' + this.sagaSeleccionada.id)).collapse('show');
						}
					}, 500);
					this.loader.cerrar();
				});
			});
		});
	}

	/**
	 * Incrementa los episodios totales de la seria y la saga.
	 */
	private incrementarEpisodio(cantidad: number, vistos: number) {
		this.sagaSeleccionada.episodiosTotales = this.sagaSeleccionada.episodiosTotales + cantidad;
		this.sagaSeleccionada.episodiosVistos = this.sagaSeleccionada.episodiosVistos + vistos;
		switch (this.sagaTipo) {
			case Saga.TIPO_TV: {
				this.serie.episodiosTotales = this.serie.episodiosTotales + cantidad;
				this.serie.episodiosVistos = this.serie.episodiosVistos + vistos;
				break;
			}
			case Saga.TIPO_OVA: {
				this.serie.ovasTotales = this.serie.ovasTotales + cantidad;
				this.serie.ovasTotales = this.serie.ovasTotales + vistos;
				break;
			}
			case Saga.TIPO_MOVIE: {
				this.serie.peliculasTotales = this.serie.peliculasTotales + cantidad;
				this.serie.peliculasTotales = this.serie.peliculasTotales + vistos;
				break;
			}
			case Saga.TIPO_EXTRA: {
				this.serie.extrasTotales = this.serie.extrasTotales + cantidad;
				this.serie.extrasTotales = this.serie.extrasTotales + vistos;
				break;
			}
		}
	}

	/**
	 * Decrementa los episodios totales de la seria y la saga.
	 */
	private decrementarEpisodio(cantidad: number, vistos: number) {
		this.sagaSeleccionada.episodiosTotales = this.sagaSeleccionada.episodiosTotales - cantidad;
		this.sagaSeleccionada.episodiosVistos = this.sagaSeleccionada.episodiosVistos - vistos;
		switch (this.sagaTipo) {
			case Saga.TIPO_TV: {
				this.serie.episodiosTotales = this.serie.episodiosTotales - cantidad;
				this.serie.episodiosVistos = this.serie.episodiosVistos + vistos;
				break;
			}
			case Saga.TIPO_OVA: {
				this.serie.ovasTotales = this.serie.ovasTotales - cantidad;
				this.serie.ovasTotales = this.serie.ovasTotales + vistos;
				break;
			}
			case Saga.TIPO_MOVIE: {
				this.serie.peliculasTotales = this.serie.peliculasTotales - cantidad;
				this.serie.peliculasTotales = this.serie.peliculasTotales + vistos;
				break;
			}
			case Saga.TIPO_EXTRA: {
				this.serie.extrasTotales = this.serie.extrasTotales - cantidad;
				this.serie.extrasTotales = this.serie.extrasTotales + vistos;
				break;
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
		let siglas = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf('[') + 1, fansubSiglasNombre.indexOf(']'));
		let nombre = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf(' ') + 1, fansubSiglasNombre.length);
		let fansubExistente = Lista.obtenerItem(this.listaFansubsExistentes, 'nombre', nombre);
		if (!fansubExistente) {
			console.log(`[${nombreMetodo}] No existe el fansub.`);
			let fansubNuevo = new Fansub();
			fansubNuevo.siglas = siglas;
			fansubNuevo.nombre = nombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.FANSUB, fansubNuevo).then(() => {
				this.listaFansubsNuevos.push(fansubNuevo);
				this.listaFansubsSeleccionados.push(fansubNuevo);
				console.log(`[${nombreMetodo}] Fansub agregado correctamente.`);
				this.loader.cerrar();
			});
		} else {
			this.listaFansubsSeleccionados.push(fansubExistente);
			console.log(`[${nombreMetodo}] Fansub agregado correctamente.`);
			this.loader.cerrar();
		}
	}

	/**
	 * Elimina un fansub.
	 */
	public eliminarFansub(fansubSiglasNombre): void {
		let nombreMetodo = 'eliminarFansub';
		console.log(`[${nombreMetodo}] Elminando fansub: ${fansubSiglasNombre}...`);
		this.loader.abrir();
		let siglas = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf('[') + 1, fansubSiglasNombre.indexOf(']'));
		let nombre = fansubSiglasNombre.substring(fansubSiglasNombre.indexOf(' ') + 1, fansubSiglasNombre.length);
		let fansubNuevo = Lista.obtenerItem(this.listaFansubsNuevos, 'nombre', nombre);
		if (fansubNuevo) {
			this.rest.eliminarItem(this.environment.REST.TABLAS.FANSUB, 'id', fansubNuevo.id).then(() => {
				this.listaFansubsNuevos.splice(this.listaFansubsNuevos.indexOf(fansubNuevo), 1);
				this.listaFansubsSeleccionados.splice(this.listaFansubsSeleccionados.indexOf(fansubNuevo), 1);
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Fansub eliminado correctamente.`);
			});
		} else {
			let fansubExistente = Lista.obtenerItem(this.listaFansubsExistentes, 'nombre', nombre);
			this.listaFansubsSeleccionados.splice(this.listaFansubsSeleccionados.indexOf(fansubExistente), 1);
			this.loader.cerrar();
			console.log(`[${nombreMetodo}] Fansub eliminado correctamente.`);
		}
	}

	/**
	 * Agrega un audio.
	 */
	public agregarAudio(audioNombre): void {
		let nombreMetodo = 'agregarAudio';
		console.log(`[${nombreMetodo}] Agregando audio: ${audioNombre}...`);
		this.loader.abrir();
		let audioExistente = Lista.obtenerItem(this.listaAudiosExistentes, 'idioma', audioNombre);
		if (!audioExistente) {
			console.log(`[${nombreMetodo}] No existe el audio.`);
			let audioNuevo = new Pais();
			audioNuevo.nombre = audioNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.PAIS, audioNuevo).then(() => {
				this.listaAudiosNuevos.push(audioNuevo);
				this.listaAudiosSeleccionados.push(audioNuevo);
				console.log(`[${nombreMetodo}] Audio agregado correctamente.`);
				this.loader.cerrar();
			});
		} else {
			this.listaAudiosSeleccionados.push(audioExistente);
			console.log(`[${nombreMetodo}] Audio agregado correctamente.`);
			this.loader.cerrar();
		}
	}

	/**
	 * Elimina un audio.
	 */
	public eliminarAudio(audioNombre): void {
		let nombreMetodo = 'eliminarAudio';
		console.log(`[${nombreMetodo}] Elminando audio: ${audioNombre}...`);
		this.loader.abrir();
		let audioNuevo = Lista.obtenerItem(this.listaAudiosNuevos, 'idioma', audioNombre);
		if (audioNuevo) {
			this.rest.eliminarItem(this.environment.REST.TABLAS.PAIS, 'id', audioNuevo.id).then(() => {
				this.listaAudiosNuevos.splice(this.listaAudiosNuevos.indexOf(audioNuevo), 1);
				this.listaAudiosSeleccionados.splice(this.listaAudiosSeleccionados.indexOf(audioNuevo), 1);
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Audio eliminado correctamente.`);
			});
		} else {
			let audioExistente = Lista.obtenerItem(this.listaAudiosExistentes, 'idioma', audioNombre);
			this.listaAudiosSeleccionados.splice(this.listaAudiosSeleccionados.indexOf(audioExistente), 1);
			this.loader.cerrar();
			console.log(`[${nombreMetodo}] Audio eliminado correctamente.`);
		}
	}

	/**
	 * Agrega un subtitulo.
	 */
	public agregarSubtitulo(subtituloNombre): void {
		let nombreMetodo = 'agregarSubtitulo';
		console.log(`[${nombreMetodo}] Agregando subtitulo: ${subtituloNombre}...`);
		this.loader.abrir();
		let subtituloExistente = Lista.obtenerItem(this.listaSubtitulosExistentes, 'idioma', subtituloNombre);
		if (!subtituloExistente) {
			console.log(`[${nombreMetodo}] No existe el subtitulo.`);
			let subtituloNuevo = new Pais();
			subtituloNuevo.nombre = subtituloNombre;
			this.rest.insertarItem(this.environment.REST.TABLAS.PAIS, subtituloNuevo).then(() => {
				this.listaSubtitulosNuevos.push(subtituloNuevo);
				this.listaSubtitulosSeleccionados.push(subtituloNuevo);
				console.log(`[${nombreMetodo}] Subtitulo agregado correctamente.`);
				this.loader.cerrar();
			});
		} else {
			this.listaSubtitulosSeleccionados.push(subtituloExistente);
			console.log(`[${nombreMetodo}] Subtitulo agregado correctamente.`);
			this.loader.cerrar();
		}
	}

	/**
	 * Elimina un subtitulo.
	 */
	public eliminarSubtitulo(subtituloNombre): void {
		let nombreMetodo = 'eliminarSubtitulo';
		console.log(`[${nombreMetodo}] Elminando subtitulo: ${subtituloNombre}...`);
		this.loader.abrir();
		let subtituloNuevo = Lista.obtenerItem(this.listaSubtitulosNuevos, 'idioma', subtituloNombre);
		if (subtituloNuevo) {
			this.rest.eliminarItem(this.environment.REST.TABLAS.PAIS, 'id', subtituloNuevo.id).then(() => {
				this.listaSubtitulosNuevos.splice(this.listaSubtitulosNuevos.indexOf(subtituloNuevo), 1);
				this.listaSubtitulosSeleccionados.splice(this.listaSubtitulosSeleccionados.indexOf(subtituloNuevo), 1);
				this.loader.cerrar();
				console.log(`[${nombreMetodo}] Subtitulo eliminado correctamente.`);
			});
		} else {
			let subtituloExistente = Lista.obtenerItem(this.listaSubtitulosExistentes, 'idioma', subtituloNombre);
			this.listaSubtitulosSeleccionados.splice(this.listaSubtitulosSeleccionados.indexOf(subtituloExistente), 1);
			this.loader.cerrar();
			console.log(`[${nombreMetodo}] Subtitulo eliminado correctamente.`);
		}
	}

	/**
	 * Inicializa la lista de sagas.
	 */
	private inicializarListaSagas(): Promise<any> {
		let nombreMetodo = 'inicializarListaSagas';
		console.log(`[${nombreMetodo}] Obteniendo sagas...`);
		return new Promise<any>((resolve, reject) => {
			this.listaSagas = [];
			this.rest.obtenerSagas(this.serie.id, this.sagaTipo).then((resultado) => {
				this.listaSagas = Lista.ordenar(Saga.arreglo(resultado), 'numero');
				resolve();
			});
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
	public verFormaSaga(): void {
		let nombreMetodo = 'verFormaSaga';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.formaSaga);
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verFormaEpisodio(): void {
		let nombreMetodo = 'verFormaEpisodio';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.formaEpisodio);
	}

	/**
	 * Muestra el valor de la forma.
	 */
	public verFormaEpisodioManual(): void {
		let nombreMetodo = 'verFormaEpisodio';
		console.log(`[${nombreMetodo}] Mostrando la forma...`);
		console.log('Forma: ', this.formaEpisodioManual);
	}
}
