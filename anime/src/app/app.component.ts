import { Component,  } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	constructor(
		private titulo: Title,
	) {
		let nombre = environment.APP.NOMBRE;
		this.titulo.setTitle(`${nombre} | WebApp`);
	}
}
