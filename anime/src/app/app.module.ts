import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutes } from './app.routes';
import { TORAErrorHandler } from './clases/toraerror-handler'
import { AccesoGuard } from './clases/acceso.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RlTagInputModule } from 'angular2-tag-input';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { StarRatingModule } from 'angular-star-rating';
import { SelectModule } from 'angular2-select';
import 'moment/locale/es';

// Servicios
import { InicializacionService } from "./services/inicializacion.service";
import { Loader, Swal } from "./services/general.service";
import { RestService } from "./services/rest.service";
import { PDFService } from "./services/pdf.service";
import { PDFVentaService } from "./services/pdf-venta.service";
import { CorreoService } from "./services/correo.service";
import { CorreoEnvioService } from "./services/correo-envio.service";
import { ComunicacionService } from "./services/comunicacion.service";

// Pipes
import { CalificacionPipe } from "./pipes/calificacion-pipe";

// Componentes
import { AppComponent } from './app.component';
import { BaseComponent } from './components/comunes/base/base.component';
import { CabeceraComponent } from './components/comunes/cabecera/cabecera.component';
import { ConfiguracionAdministradorSistemaComponent } from './components/configuracion/configuracion-administrador-sistema.component';
import { ConfiguracionAdministradorComponent } from './components/configuracion/configuracion-administrador.component';
import { ContenedorComponent } from './components/comunes/contenedor/contenedor.component';
import { IngresoComponent } from './components/comunes/ingreso/ingreso.component';
import { MenuComponent } from './components/comunes/menu/menu.component';
import { PanelControlComponent } from './components/panel-control/panel-control.component';
import { PiePaginaComponent } from './components/comunes/pie-pagina/pie-pagina.component';
import { SerieControlComponent } from './components/serie/serie-control.component';
import { SerieEdicionComponent } from './components/serie/serie-edicion.component';
import { SerieEdicionInformacionComponent } from './components/serie/serie-edicion-informacion.component';
import { SerieEdicionEpisodiosComponent } from './components/serie/serie-edicion-episodios.component';
import { SerieEdicionPortadaComponent } from './components/serie/serie-edicion-portada.component';
import { EpisodioEdicionComponent } from './components/episodio/episodio-edicion.component';
import { EpisodioEdicionInformacionComponent } from './components/episodio/episodio-edicion-informacion.component';

@NgModule({
	declarations: [
		AppComponent,
		CalificacionPipe,
		BaseComponent,
		CabeceraComponent,
		ConfiguracionAdministradorSistemaComponent,
		ConfiguracionAdministradorComponent,
		ContenedorComponent,
		EpisodioEdicionComponent,
		EpisodioEdicionInformacionComponent,
		IngresoComponent,
		MenuComponent,
		PanelControlComponent,
		PiePaginaComponent,
		SerieControlComponent,
		SerieEdicionComponent,
		SerieEdicionInformacionComponent,
		SerieEdicionEpisodiosComponent,
		SerieEdicionPortadaComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutes,
		RlTagInputModule,
		NgDatepickerModule,
		DateTimePickerModule,
		SelectModule,
		StarRatingModule.forRoot()
	],
	providers: [
		{
			provide: ErrorHandler,
			useClass: TORAErrorHandler
		},
		{
			provide: LOCALE_ID,
			useValue: "es-MX"
		},
		InicializacionService,
		Loader,
		Swal,
		RestService,
		AccesoGuard,
		PDFService,
		PDFVentaService,
		CorreoService,
		CorreoEnvioService,
		CalificacionPipe,
		ComunicacionService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
