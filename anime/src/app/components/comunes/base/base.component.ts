import { Component, Injector, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment as enviromentService, environment } from "../../../../environments/environment";
import { Router, ActivatedRoute } from '@angular/router';
import { Loader, Swal } from '../../../services/general.service';
import { ConfiguracionSistema } from "../../../model/configuracion-sistema";
import { Configuracion } from "../../../model/configuracion";
import { RestService } from "../../../services/rest.service";

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styles: []
})
export class BaseComponent {

    private loaderService: Loader;
    private routerService: Router;
    private rutaService: ActivatedRoute;
    private cambiosService: ChangeDetectorRef;
    private swalService: Swal;
    private configuracionSistemaService: ConfiguracionSistema;
    private configuracionService: Configuracion;
    private restService: RestService;

    protected desarrolloVerMenuService: boolean;

    constructor(
        injector: Injector
    ) {
        this.loaderService = injector.get(Loader);
        this.routerService = injector.get(Router);
        this.rutaService = injector.get(ActivatedRoute);
        this.cambiosService = injector.get(ChangeDetectorRef);
        this.swalService = injector.get(Swal);
        this.restService = injector.get(RestService);
    }

    /**
     * Carga la configuracion.
     */
    public cargarConfiguracion(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            this.rest.obtenerTodosLosItems(environment.REST.TABLAS.CONFIGURACION).then((resultado) => {
                if(resultado.length>0){
                    this.configuracionService = new Configuracion(resultado[0]);
                    resolve(true);
                } else {
                    this.configuracionService = new Configuracion();
                    resolve(false);
                }
            });
        });
    }

    /**
     * Carga la configuracion del sistema.
     */
    public cargarConfiguracionSistema(): Promise<boolean> {
        return new Promise<any>((resolve, reject) => {
            this.rest.obtenerTodosLosItems(environment.REST.TABLAS.CONFIGURACION_SISTEMA).then((resultado) => {
                if(resultado.length>0){
                    this.configuracionSistemaService = new ConfiguracionSistema(resultado[0]);
                    resolve(true);
                } else {
                    this.configuracionSistemaService = new ConfiguracionSistema();
                    resolve(false);
                }
            });
        });
    }

    /**
     * Regresa la configuracion.
     */
    get configuracion() {
        if (this.configuracionService != null && this.configuracionService != undefined) {
            return this.configuracionService;
        } else {
            setTimeout(() => {
                this.configuracion;
            });
        }
    }

    /**
     * Regresa la configuracion del sistema.
     */
    get configuracionSistema() {
        if (this.configuracionSistemaService != null && this.configuracionSistemaService != undefined) {
            return this.configuracionSistemaService;
        } else {
            setTimeout(() => {
                this.configuracionSistema;
            });
        }
    }

    /**
     * Regresa una instancia de la clase Loader.
     */
    get rest() {
        if (this.restService != null && this.restService != undefined) {
            return this.restService;
        } else {
            setTimeout(() => {
                this.rest;
            });
        }
    }

    /**
     * Regresa una instancia de la clase Loader.
     */
    get loader() {
        if (this.loaderService != null && this.loaderService != undefined) {
            return this.loaderService;
        } else {
            setTimeout(() => {
                this.loader;
            });
        }
    }

    /**
     * Regresa una instancia de la clase Router.
     */
    get router() {
        if (this.routerService != null && this.routerService != undefined) {
            return this.routerService;
        } else {
            setTimeout(() => {
                this.router;
            });
        }
    }

    /**
     * Regresa una instancia de la clase ActivatedRoute.
     */
    get ruta() {
        if (this.rutaService != null && this.rutaService != undefined) {
            return this.rutaService;
        } else {
            setTimeout(() => {
                this.ruta;
            });
        }
    }

    /**
     * Regresa una instancia de la clase ChangeDetectorRef.
     */
    get cambios() {
        if (this.cambiosService != null && this.cambiosService != undefined) {
            return this.cambiosService;
        } else {
            setTimeout(() => {
                this.cambios;
            });
        }
    }

    /**
     * Regresa una instancia de la clase Swal.
     */
    get swal() {
        if (this.swalService != null && this.swalService != undefined) {
            return this.swalService;
        } else {
            setTimeout(() => {
                this.swal;
            });
        }
    }

    /**
     * Regresa los enviroment de la aplicacion.
     */
    get environment() {
        if (enviromentService != null && enviromentService != undefined) {
            return enviromentService;
        } else {
            setTimeout(() => {
                this.environment;
            });
        }
    }

    /**
     * Indica si se puede ver el menu de desarrollo.
     */
    get desarrolloVerMenu() {
        if (this.desarrolloVerMenuService != null && this.desarrolloVerMenuService != undefined) {
            return this.desarrolloVerMenuService;
        } else {
            setTimeout(() => {
                this.desarrolloVerMenuService;
            });
        }
    }

    /**
     * Inicializa un selector (Toggle).
     */
    protected inicializarSelector(selectorJQ: string, valor: Boolean | FormControl, funcion?: Function) {
        const nombreMetodo = 'inicializarSelector';
        console.log(`[${nombreMetodo}] Inicializando el selector ${selectorJQ}...`);
        if ($(selectorJQ)) {
            let valorBooleano;
            if (valor instanceof FormControl) {
                valorBooleano = valor.value;
            } else {
                valorBooleano = valor;
            }
            if (valorBooleano) {
                (<any>$(selectorJQ)).bootstrapToggle('on');
            } else {
                (<any>$(selectorJQ)).bootstrapToggle('off');
            }
            $(selectorJQ).change((evento) => {
                if ((<any>evento.target).checked) {
                    if (valor instanceof FormControl) {
                        valor.setValue(true);
                    } else {
                        valor = true;
                    }
                } else {
                    if (valor instanceof FormControl) {
                        valor.setValue(false);
                    } else {
                        valor = false;
                    }
                }
                if (funcion) {
                    if (valor instanceof FormControl) {
                        valorBooleano = valor.value;
                    } else {
                        valorBooleano = valor;
                    }
                    funcion(valorBooleano)
                }
                this.cambios.detectChanges();
            });
        }
    }

}