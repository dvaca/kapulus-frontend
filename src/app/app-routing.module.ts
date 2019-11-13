import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponent } from './buscador/buscador.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ControlAccesoComponent } from './control-acceso/control-acceso.component';
import { RegistroOnlineComponent } from './registro-online/registro-online.component';
import { LoginComponent } from './login/login.component';
import { EstadisticasLocalComponent } from './estadisticas-local/estadisticas-local.component';
import { CertificadoComponent } from './certificado/certificado.component';

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
  { path: 'callcenter_registro_coosalud_cali', component: BuscadorComponent },
  { path: 'callcenter_registro_movilidad', component: BuscadorComponent },
  { path: 'callcenter_registro_contraloria', component: BuscadorComponent },
  { path: 'callcenter_registro_coosalud_bogota', component: BuscadorComponent },
  { path: 'callcenter_registro_rio_bogota', component: BuscadorComponent },
  { path: 'callcenter_registro_oracle', component: BuscadorComponent },
  { path: 'callcenter_registro_ied', component: BuscadorComponent },
  { path: 'callcenter_registro_prosegur', component: BuscadorComponent },
  { path: 'callcenter_registro_seloquecomo', component: BuscadorComponent },
  { path: 'callcenter_registro_copnia', component: BuscadorComponent },
  { path: 'callcenter_registro_juegos', component: BuscadorComponent },
  { path: 'callcenter_registro_sostenibilidad', component: BuscadorComponent },
  { path: 'callcenter_registro_feoracle', component: BuscadorComponent },
  { path: 'callcenter_registro_feoracle2', component: BuscadorComponent },
  { path: 'callcenter_registro_planeacion_policia', component: BuscadorComponent },
  { path: 'callcenter_registro_cannabis', component: BuscadorComponent },
  { path: 'callcenter_registro_antinarcoticos', component: BuscadorComponent },
  { path: 'callcenter_registro_qlik', component: BuscadorComponent },
  { path: 'callcenter_registro_seguridad_inteligente', component: BuscadorComponent },
  { path: 'callcenter_registro_no_repeticion', component: BuscadorComponent },
  { path: 'callcenter_registro_democracia', component: BuscadorComponent },
  { path: 'callcenter_registro_educacion_ambiental', component: BuscadorComponent },
  { path: 'callcenter_registro_colombia_rural', component: BuscadorComponent },
  { path: 'callcenter_registro_arkadia', component: BuscadorComponent },
  { path: 'callcenter_registro_diabetes', component: BuscadorComponent },
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
  { path: 'callcenter_estadisticas_coosalud_cali', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_movilidad', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_contraloria', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_coosalud_bogota', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_rio_bogota', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_oracle', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_ied', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_prosegur', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_seloquecomo', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_copnia', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_juegos', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_sostenibilidad', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_feoracle', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_feoracle2', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_planeacion_policia', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_cannabis', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_antinarcoticos', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_qlik', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_seguridad_inteligente', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_no_repeticion', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_democracia', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_educacion_ambiental', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_colombia_rural', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_arkadia', component: EstadisticasComponent },
  { path: 'callcenter_estadisticas_diabetes', component: EstadisticasComponent },
  { path: 'control-acceso', component: ControlAccesoComponent },
  { path: 'registro-online', component: RegistroOnlineComponent },
  { path: 'registro-plus-superior', component: RegistroOnlineComponent },
  { path: 'registro-foros-semana', component: RegistroOnlineComponent },
  { path: 'registro-coosalud-bucaramanga', component: RegistroOnlineComponent },
  { path: 'registro-foro-columnistas', component: RegistroOnlineComponent },
  { path: 'registro-autonomia-medica', component: RegistroOnlineComponent },
  { path: 'registro-foro-mujeres', component: RegistroOnlineComponent },
  { path: 'registro-coosalud-cali', component: RegistroOnlineComponent },
  { path: 'registro-coosalud-bogota', component: RegistroOnlineComponent },
  { path: 'registro-rio-bogota', component: RegistroOnlineComponent },
  { path: 'registro-prosegur', component: RegistroOnlineComponent },
  { path: 'evento_estadisticas_semana', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_bmanga', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_medellin', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_columnistas', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_desayuno', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_movilidad', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_contraloria', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_bogota', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_rio_bogota', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_autonomia_medica', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_coosalud_cali', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_mujeres', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_digital_now', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_defensoria', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_ied', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_seloquecomo', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_bvc', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_usaid', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_juegos', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_sostenibilidad', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_copnia', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_feoracle', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_cima', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_bvc_cali', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_planeacion_policia', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_cannabis', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_democracia', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_seguridad_inteligente', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_educacion_ambiental', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_colombia_rural', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_diabetes', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_policia', component: EstadisticasLocalComponent },
  { path: 'evento_estadisticas_nutricion', component: EstadisticasLocalComponent },
  { path: 'certificado_asistencia_copnia', component: CertificadoComponent }
]

@NgModule({
  exports: [RouterModule],
  imports: [ RouterModule.forRoot(routes)]
})

export class AppRoutingModule { }
