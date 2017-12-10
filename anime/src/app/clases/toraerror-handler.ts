import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Swal, Loader } from '../services/general.service';
import { ConfiguracionSistema } from '../model/configuracion-sistema';
import { environment } from '../../environments/environment';

@Injectable()
export class TORAErrorHandler implements ErrorHandler {

    private router: Router;
    private ruta: ActivatedRoute;
    private swal = new Swal();
    private loader = new Loader();
    private configuracionSistema: ConfiguracionSistema;

    public constructor(
        injector: Injector
    ) {
        setTimeout(() => {
            this.router = injector.get(Router);
        });
    }

    public handleError(error: any): void {
        console.log('Error: ', error);
        // this.dynamo.obtenerItemUnicoPorEntidad(environment.TABLAS.CONFIGURACION, ConfiguracionSysAdmin.ENTIDAD).then((data) => {
        //     this.configuracionSysAdminService = new ConfiguracionSysAdmin(data);
        //     console.log('Error: ', error);
        //     if (!window['TORALog']) {
        //         window['TORALog'] = [];
        //     }
        //     window['TORALog'].push(error);
        //     this.swal.alerta("Excepción", "¡Ocurrio una Excepción el equipo de soporte ya fue informado!");
        //     if (this.configuracionSysAdminService.desarrollo.redireccionarExcepcion) {
        //         this.loader.cerrar();
        //         this.router.navigateByUrl('/ingreso');
        //         window.location.reload();
        //     }
        // });
    }
}
