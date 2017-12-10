import { Component, OnInit, Injector, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../../../components/comunes/base/base.component';

@Component({
    selector: 'app-ingreso',
    templateUrl: './ingreso.component.html',
    styles: []
})
export class IngresoComponent extends BaseComponent implements OnInit, AfterViewInit {

    public nombreAplicacion: string;
    public version: string;
    public usuario: string;
    public contrasena: string;
    public error: String;
    public recordarIngreso: boolean = false;

    constructor(
        private injector: Injector
    ) {
        super(injector);
        this.nombreAplicacion = this.environment.APP.NOMBRE;
        this.version = this.environment.APP.VERSION;
    }

    ngOnInit() {
        // this.cognito.recordarSesion().then((isValid: boolean) => {
        //     if (isValid) {
        //         this.router.navigateByUrl("/app/panel-control");
        //     }
        // });
    }

    ngAfterViewInit() {
        $('#recordarCheck').iCheck({
            checkboxClass: 'icheckbox_square-green'
        });
        $('#recordarCheck').on('ifChanged', (event) => {
            this.recordarIngreso = (<HTMLInputElement>event.target).checked;
        });
    }

    public ingresar(): void {
        let nombreMetodo = 'ingresar';
        console.log(`[${nombreMetodo}] Iniciando sesion...`);
        // window.localStorage.setItem("recordarIngreso", "false");
        // this.error = "";
        // if (this.usuario && this.contrasena) {
        //     this.cognito.iniciarSesion(this.recordarIngreso,this.usuario, this.contrasena, {
        //         onSuccess: (session) => {
        //             console.log(`[${nombreMetodo}] Sesion iniciada con exito`);
        //             this.router.navigateByUrl("/app/panel-control");
        //         },
        //         onFailure: (err) => {
        //             console.log(`[${nombreMetodo}] Error al iniciar sesion: ${err}`);
        //             this.error = err.message;
        //         }
        //     });
        // }
    }

}
