import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ControlAccesoComponent } from './control-acceso/control-acceso.component';
import { RegistroOnlineComponent } from './registro-online/registro-online.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro-online', pathMatch: 'full' },
  { path: 'registro', component: BuscadorComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'control-acceso', component: ControlAccesoComponent },
  { path: 'registro-online', component: RegistroOnlineComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
