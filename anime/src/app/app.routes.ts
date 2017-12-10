import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccesoGuard } from './clases/acceso.guard';

import { ConfiguracionAdministradorSistemaComponent } from './components/configuracion/configuracion-administrador-sistema.component';
import { ConfiguracionAdministradorComponent } from './components/configuracion/configuracion-administrador.component';
import { ContenedorComponent } from './components/comunes/contenedor/contenedor.component';
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
			// { path: 'usuarios/historico', component: UsuarioControlComponent },
			// { path: 'usuarios/nuevo', component: UsuarioEdicionComponent },
			// { path: 'usuarios/editar/:username', component: UsuarioEdicionComponent },
			// { path: 'ventas/historico', component: VentaControlComponent },
			// { path: 'ventas/nueva', component: VentaEdicionComponent },
			// { path: 'ventas/convertir/:id', component: VentaEdicionComponent },
			// { path: 'ventas/editar/:id', component: VentaEdicionComponent },
			// { path: 'ventas/ver/:id', component: VentaVistaComponent },
			// { path: 'ventas/recargar/:idCliente/:idTarjeta', component: VentaEdicionComponent },
			// { path: 'cotizaciones/historico', component: VentaControlComponent },
			// { path: 'cotizaciones/nueva', component: VentaEdicionComponent },
			// { path: 'cotizaciones/ver/:id', component: VentaVistaComponent },
			// { path: 'tarjeta-sim/historico', component: TarjetaSimControlComponent },
			// { path: 'tarjeta-sim/activar/:id', component: TarjetaSimActivacionComponent },
			// { path: 'tarjeta-sim/ver/:id', component: TarjetaSimVistaComponent },
			{ path: 'series/historico', component: SerieControlComponent },
			{ path: 'series/nueva', component: SerieEdicionComponent },
			{ path: 'series/editar/:id', component: SerieEdicionComponent },
		]
	},
	{ path: '', redirectTo: 'app/panel-control', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutes { }
