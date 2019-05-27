import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ControlAccesoComponent } from './control-acceso/control-acceso.component';
import { RegistroOnlineComponent } from './registro-online/registro-online.component';
import { LoginComponent } from './login/login.component';
import { EstadisticasLocalComponent } from './estadisticas-local/estadisticas-local.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro-online', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'callcenter_token_9B0I4J8R2T', component: BuscadorComponent },
  { path: 'callcenter_token_6J2N4P6Q3K', component: BuscadorComponent },
  { path: 'callcenter_token_3N8P3H6V1L', component: BuscadorComponent },
  { path: 'callcenter_registro_cerveza', component: BuscadorComponent },
  { path: 'callcenter_registro_orquideas', component: BuscadorComponent },
  { path: 'callcenter_registro_semana', component: BuscadorComponent },
  { path: 'callcenter_registro_cartagena', component: BuscadorComponent },
  { path: 'callcenter_registro_coosalud', component: BuscadorComponent },
  { path: 'callcenter_registro_coosalud_bquilla', component: BuscadorComponent },
  { path: 'callcenter_registro_coosalud_bmanga', component: BuscadorComponent },
  { path: 'callcenter_registro_autonomia_medica', component: BuscadorComponent },
  { path: 'callcenter_registro_columnistas', component: BuscadorComponent },
  { path: 'callcenter_registro_coosalud_medellin', component: BuscadorComponent },
  { path: 'callcenter_registro_mujeres', component: BuscadorComponent },
  { path: 'callcenter_token_7D5H3N9Y4F', component: EstadisticasComponent },
  { path: 'callcenter_token_4B5O2S8Z0L', component: EstadisticasComponent },
  { path: 'callcenter_token_1T9Y7X1M9A', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_cerveza', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_orquideas', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_semana', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_cartagena', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_coosalud', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_coosalud_bquilla', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_coosalud_bmanga', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_autonomia_medica', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_columnistas', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_coosalud_medellin', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_mujeres', component: EstadisticasComponent },
  { path: 'control-acceso', component: ControlAccesoComponent },
  { path: 'registro-online', component: RegistroOnlineComponent },
  { path: 'registro-plus-superior', component: RegistroOnlineComponent },
  { path: 'registro-foros-semana', component: RegistroOnlineComponent },
  { path: 'registro-coosalud-bucaramanga', component: RegistroOnlineComponent },
  { path: 'registro-foro-columnistas', component: RegistroOnlineComponent },
  { path: 'registro-autonomia-medica', component: RegistroOnlineComponent },
  { path: 'registro-foro-mujeres', component: RegistroOnlineComponent },
  { path: 'evento_estadisticas_semana', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_bmanga', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_medellin', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_columnistas', component: EstadisticasLocalComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
