import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../../components/comunes/base/base.component';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styles: []
})
export class MenuComponent extends BaseComponent implements OnInit {

    constructor(
		private injector: Injector
	) {
		super(injector);
	}

    ngOnInit() {
        
    }

    ngAfterViewInit() {
        (<any>$('#side-menu')).metisMenu();
    }

    public salir(): void {
        let nombreMetodo = 'salir';
        console.log(`[${nombreMetodo}] Cerrando sesion...`);
        // this.cognito.cerrarSesion().then((resolved) => {
        //     this.router.navigate(['/ingreso']);
        // });
    }

}
