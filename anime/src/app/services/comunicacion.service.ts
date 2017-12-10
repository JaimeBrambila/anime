import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ComunicacionService {

	private notificador = new Subject<any>();
	notifyObservable$ = this.notificador.asObservable();

	constructor() { }

	public notificar(data: any) {
		if (data) {
			this.notificador.next(data);
		}
	}
}