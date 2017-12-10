import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {

	private static URL_REST = 'http://localhost:3000/api/';

	public constructor(
		private http: Http
	) {
		let nombreMetodo = 'constructor';
		console.log(`[${nombreMetodo}] Construyendo servicio...`);
	}

	/**
	 * Inserta un item en la tabla indicada.
	 */
	public insertarItem(nombreTabla: string, item: any): Promise<any> {
		let nombreMetodo = 'insertarItem';
		console.log(`[${nombreMetodo}] Insertando item en la tabla ${nombreTabla}...`);
		console.log(`[${nombreMetodo}] Item: `, item);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${RestService.URL_REST}insertar-item/${nombreTabla}/`, JSON.stringify(item), { headers: headers }).toPromise().then((respuesta: Response) => {
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
		console.log(`[${nombreMetodo}] Items: `, items);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${RestService.URL_REST}insertar-items/${nombreTabla}/`, JSON.stringify(items), { headers: headers }).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items insertados correctamente en la tabla ${nombreTabla}.`);
				resolve();
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al insertar el item en la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

	/**
	 * Inserta un item en la tabla indicada.
	 */
	public actualizarItem(nombreTabla: string, item: any): Promise<any> {
		let nombreMetodo = 'actualizarItem';
		console.log(`[${nombreMetodo}] Actualizando item en la tabla ${nombreTabla}...`);
		console.log(`[${nombreMetodo}] Item: `, item);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${RestService.URL_REST}actualizar-item/${nombreTabla}/`, JSON.stringify(item), { headers: headers }).toPromise().then((respuesta: Response) => {
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
			this.http.put(`${RestService.URL_REST}eliminar-item/${nombreTabla}/${campo}/${criterio}/`, JSON.stringify({}), { headers: headers }).toPromise().then((respuesta: Response) => {
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
	public eliminarAnd(nombreTabla: string, campo1: string, criterio1: any, campo2: string, criterio2: any): Promise<any> {
		let nombreMetodo = 'eliminarAnd';
		console.log(`[${nombreMetodo}] Eliminando item en la tabla ${nombreTabla} donde "${campo1}" = "${criterio1}" y "${campo2}" = "${criterio2}"...`);
		return new Promise<any>((resolve, reject) => {
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			this.http.put(`${RestService.URL_REST}eliminar-and/${nombreTabla}/${campo1}/${criterio1}/${campo2}/${criterio2}/`, JSON.stringify({}), { headers: headers }).toPromise().then((respuesta: Response) => {
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
	public obtenerItem(nombreTabla: string, id: string): Promise<any> {
		let nombreMetodo = 'obtenerTodosLosItems';
		console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla ${nombreTabla}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${RestService.URL_REST}${nombreTabla}/${id}`).toPromise().then((respuesta) => {
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
	public obtenerTodosLosItems(nombreTabla: string): Promise<any> {
		let nombreMetodo = 'obtenerTodosLosItems';
		console.log(`[${nombreMetodo}] Obteniendo todos los items de la tabla ${nombreTabla}...`);
		return new Promise<any>((resolve, reject) => {
			this.http.get(`${RestService.URL_REST}${nombreTabla}/`).toPromise().then((respuesta) => {
				console.log(`[${nombreMetodo}] Items encontrados en  la tabla ${nombreTabla}: `, respuesta.json());
				resolve(respuesta.json());
			}).catch((error) => {
				console.error(`[${nombreMetodo}] Error al obtener los items de la tabla ${nombreTabla}: `, error);
				reject();
			});
		});
	}

}
