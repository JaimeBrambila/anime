import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from "../../environments/environment";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {

	private static URL_REST = 'http://localhost:3000/api';

	public constructor(
		private http: Http
	) {
		let nombreMetodo = 'constructor';
		console.log(`[${nombreMetodo}] Construyendo servicio...`);
	}

	//********************************************************************************************************************************
	// E S P E C I F I C O S
	//********************************************************************************************************************************

	/**
	 * Regresa todas las series.
	 */
	public obtenerSeries(): Promise<any> {
		let nombreMetodo = 'obtenerSeries';
		let nombreTabla = environment.REST.TABLAS.SERIE;
		console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla ${nombreTabla}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/serie/obtener-series/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrados en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa una serie.
	 */
	public obtenerSeriePorId(id: string): Promise<any> {
		let nombreMetodo = 'obtenerSeriePorId';
		let nombreTabla = environment.REST.TABLAS.SERIE;
		console.log(`[${nombreMetodo}] Obteniendo el item de la tabla ${nombreTabla} donde id = ${id}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/serie/obtener-serie-por-id/${id}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Item encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todas las sagas de una serie del tipo indicado.
	 */
	public obtenerSagas(serieId: string, sagaTipo: string): Promise<any> {
		let nombreMetodo = 'obtenerSagas';
		let nombreTabla = environment.REST.TABLAS.SAGA;
		console.log(`[${nombreMetodo}] Obteniendo items de la tabla ${nombreTabla} donde serieId = ${serieId} y tipo = ${sagaTipo}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/saga/obtener-sagas/${serieId}/${sagaTipo}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrados en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa un episodio.
	 */
	public obtenerEpisodioPorId(id: string): Promise<any> {
		let nombreMetodo = 'obtenerEpisodioPorId';
		let nombreTabla = environment.REST.TABLAS.EPISODIO;
		console.log(`[${nombreMetodo}] Obteniendo el item de la tabla ${nombreTabla} donde id = ${id}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/episodio/obtener-episodio-por-id/${id}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Item encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	//********************************************************************************************************************************
	// G E N E R I C O S
	//********************************************************************************************************************************

	/**
	 * Inserta un item en la tabla indicada.
	 */
	public insertarItem(nombreTabla: string, item: any): Promise<any> {
		let nombreMetodo = 'insertarItem';
		console.log(`[${nombreMetodo}] Insertando item en la tabla ${nombreTabla}...`);
		this.filtrarCaraceresJaponeses(item);
		console.log(`[${nombreMetodo}] Item: `, item);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${environment.REST.URL}/insertar-item/${nombreTabla}/`, JSON.stringify(item), { headers: headers }).toPromise().then((respuesta: Response) => {
				console.log(`[${nombreMetodo}] Item insertado correctamente en la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al insertar el item en la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Inserta un arreglo de items en la tabla indicada.
	 */
	public insertarItems(nombreTabla: string, items: any[]): Promise<any> {
		let nombreMetodo = 'insertarItems';
		console.log(`[${nombreMetodo}] Insertando items en la tabla ${nombreTabla}...`);
		this.filtrarCaraceresJaponeses(items);
		console.log(`[${nombreMetodo}] Items: `, items);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${environment.REST.URL}/insertar-items/${nombreTabla}/`, JSON.stringify(items), { headers: headers }).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items insertados correctamente en la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				let errorBody = JSON.parse(error._body);
				console.error(`[${nombreMetodo}] Error al insertar los items en la tabla ${nombreTabla}: `, errorBody);
				let errorMensaje = "";
				for(let i=0;i<errorBody.errors.length;i++){
					errorMensaje += errorBody.errors[i].message + '<br>';
				}
				reject(errorMensaje);
			});
		});
	}

	/**
	 * Inserta un item en la tabla indicada.
	 */
	public actualizarItem(nombreTabla: string, item: any): Promise<any> {
		let nombreMetodo = 'actualizarItem';
		console.log(`[${nombreMetodo}] Actualizando item en la tabla ${nombreTabla}...`);
		this.filtrarCaraceresJaponeses(item);
		console.log(`[${nombreMetodo}] Item: `, item);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${environment.REST.URL}/actualizar-item/${nombreTabla}/`, JSON.stringify(item), { headers: headers }).toPromise().then((respuesta: Response) => {
				console.log(`[${nombreMetodo}] Item actualizado correctamente en la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al actualizar el item en la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Elimina un item en la tabla indicada.
	 */
	public eliminarItem(nombreTabla: string, campo: string, criterio: any): Promise<any> {
		let nombreMetodo = 'eliminarItem';
		console.log(`[${nombreMetodo}] Eliminando item en la tabla ${nombreTabla} donde "${campo}" = "${criterio}"...`);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${environment.REST.URL}/eliminar-items/${nombreTabla}/${campo}/${criterio}/`, JSON.stringify({}), { headers: headers }).toPromise().then((respuesta: Response) => {
				console.log(`[${nombreMetodo}] Item eliminado correctamente de la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al eliminar el item en la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Elimina un item en la tabla indicada.
	 */
	public eliminarItemsAnd(nombreTabla: string, campo1: string, criterio1: any, campo2: string, criterio2: any): Promise<any> {
		let nombreMetodo = 'eliminarItemsAnd';
		console.log(`[${nombreMetodo}] Eliminando item en la tabla ${nombreTabla} donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}"...`);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${environment.REST.URL}/eliminar-items-and/${nombreTabla}/${campo1}/${criterio1}/${campo2}/${criterio2}/`, JSON.stringify({}), { headers: headers }).toPromise().then((respuesta: Response) => {
				console.log(`[${nombreMetodo}] Item eliminado correctamente de la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al eliminar el item en la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerItemPorId(nombreTabla: string, id: string): Promise<any> {
		let nombreMetodo = 'obtenerItemPorId';
		console.log(`[${nombreMetodo}] Obteniendo el item de la tabla ${nombreTabla} donde id = ${id}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-item-por-id/${nombreTabla}/${id}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Item encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerItemPorIdSimple(nombreTabla: string, id: string): Promise<any> {
		let nombreMetodo = 'obtenerItemPorIdSimple';
		console.log(`[${nombreMetodo}] Obteniendo el item de la tabla ${nombreTabla} donde id = ${id}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-item-por-id-simple/${nombreTabla}/${id}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Item encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerItemsPorCampo(nombreTabla: string, campo: string, criterio: string): Promise<any> {
		let nombreMetodo = 'obtenerItemsPorCampo';
		console.log(`[${nombreMetodo}] Obteniendo los items de la tabla ${nombreTabla} donde ${campo} = ${criterio}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-items-por-campo/${nombreTabla}/${campo}/${criterio}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerItemsAnd(nombreTabla: string, campo1: string, criterio1: string, campo2: string, criterio2: string): Promise<any> {
		let nombreMetodo = 'obtenerItemsAnd';
		console.log(`[${nombreMetodo}] Obteniendo los items de la tabla ${nombreTabla} donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}"...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-items-and/${nombreTabla}/${campo1}/${criterio1}/${campo2}/${criterio2}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrado en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerTodosLosItems(nombreTabla: string): Promise<any> {
		let nombreMetodo = 'obtenerTodosLosItems';
		console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla ${nombreTabla}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-items-todos/${nombreTabla}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrados en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Regresa todos los items de la tabla.
	 */
	public obtenerTodosLosItemsSimple(nombreTabla: string): Promise<any> {
		let nombreMetodo = 'obtenerTodosLosItemsSimple';
		console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla ${nombreTabla}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${environment.REST.URL}/obtener-items-todos-simple/${nombreTabla}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrados en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Sustituye los caracteres especiales del japones.
	 */
	private filtrarCaraceresJaponeses(item: any | any[]) {
		if (item instanceof Array) {
			item.forEach((elemento)=>{
				this.filtrarCaraceresJaponeses(elemento);
			});
		} else {
			let textoFiltrado;
			Object.keys(item).forEach(function (atributo, index) {
				if (typeof (item[atributo]) == 'string') {
					item[atributo] = item[atributo].replace(new RegExp('Ō', 'g'), 'Ou');
					item[atributo] = item[atributo].replace(new RegExp('ō', 'g'), 'ou');
					item[atributo] = item[atributo].replace(new RegExp('Ū', 'g'), 'Uu');
					item[atributo] = item[atributo].replace(new RegExp('ū', 'g'), 'uu');
				}
			})
		}
	}

}
