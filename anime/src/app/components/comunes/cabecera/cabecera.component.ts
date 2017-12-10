import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../../../components/comunes/base/base.component';

@Component({
	selector: 'app-cabecera',
	templateUrl: './cabecera.component.html',
	styles: []
})
export class CabeceraComponent extends BaseComponent implements OnInit {

	constructor(
		private injector: Injector
	) {
		super(injector);
	}

	ngOnInit() {
		
	}

    ngAfterViewInit(){
		$('.navbar-minimalize').on('click', (event)=>{
			event.preventDefault();
			$("body").toggleClass("mini-navbar");
			this.SmoothlyMenu();

		});
    }

	private SmoothlyMenu() {
		if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
			$('#side-menu').hide();
			setTimeout(
				()=>{
					$('#side-menu').fadeIn(400);
				}, 200);
		} else if ($('body').hasClass('fixed-sidebar')) {
			$('#side-menu').hide();
			setTimeout(
				()=>{
					$('#side-menu').fadeIn(400);
				}, 100);
		} else {
			$('#side-menu').removeAttr('style');
		}
	}

	public salir():void{
        let nombreMetodo = 'salir';
        console.log(`[${nombreMetodo}] Cerrando sesion...`);
		// this.cognito.cerrarSesion().then((resolved) => {
		// 	this.router.navigate(['/ingreso']);
		// });
	}

}
