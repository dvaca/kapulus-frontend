import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ControlAccesoComponent } from './control-acceso/control-acceso.component';
import { RegistroOnlineComponent } from './registro-online/registro-online.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro-online', pathMatch: 'full' },
  { path: 'callcenter_token_9B0I4J8R2T', component: BuscadorComponent },
  { path: 'callcenter_token_6J2N4P6Q3K', component: BuscadorComponent },
  { path: 'callcenter_token_3N8P3H6V1L', component: BuscadorComponent },
  { path: 'callcenter_token_7D5H3N9Y4F', component: EstadisticasComponent },
  { path: 'callcenter_token_4B5O2S8Z0L', component: EstadisticasComponent },
  { path: 'callcenter_token_1T9Y7X1M9A', component: EstadisticasComponent },
  { path: 'control-acceso', component: ControlAccesoComponent },
  { path: 'registro-online', component: RegistroOnlineComponent },
  { path: 'registro-plus-superior', component: RegistroOnlineComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
