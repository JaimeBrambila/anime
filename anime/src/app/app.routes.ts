import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccesoGuard } from './clases/acceso.guard';

import { ConfiguracionAdministradorSistemaComponent } from './components/configuracion/configuracion-administrador-sistema.component';
import { ConfiguracionAdministradorComponent } from './components/configuracion/configuracion-administrador.component';
import { ContenedorComponent } from './components/comunes/contenedor/contenedor.component';
import { EpisodioEdicionComponent } from './components/episodio/episodio-edicion.component';
import { IngresoComponent } from './components/comunes/ingreso/ingreso.component';
import { PanelControlComponent } from './components/panel-control/panel-control.component';
import { SerieControlComponent } from './components/serie/serie-control.component';
import { SerieEdicionComponent } from './components/serie/serie-edicion.component';

const routes: Routes = [
	{ path: 'ingreso', component: IngresoComponent },
	{
		path: 'app',
		canActivate : [AccesoGuard],
		component: ContenedorComponent,
		children: [
			{ path: 'panel-control', component: PanelControlComponent },
			{ path: 'configuracion/sistema', component: ConfiguracionAdministradorComponent },
			{ path: 'configuracion/avanzada', component: ConfiguracionAdministradorSistemaComponent },
			{ path: 'series/historico', component: SerieControlComponent },
			{ path: 'series/nueva', component: SerieEdicionComponent },
			{ path: 'series/editar/:id', component: SerieEdicionComponent },
			{ path: 'series/editar-episodio/:id/:serieId', component: EpisodioEdicionComponent },
		]
	},
	{ path: '', redirectTo: 'app/panel-control', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutes { }
