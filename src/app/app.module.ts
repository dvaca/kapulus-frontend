import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { NgxBarcodeModule, NgxBarcodeComponent } from 'ngx-barcode';
import { QRCodeModule} from 'angular2-qrcode';

import { AppComponent } from './app.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { RegistroService } from './registro.service';
import { DetalleAsistenteComponent } from './detalle-asistente/detalle-asistente.component';
import { EscarapelaComponent } from './escarapela/escarapela.component';
import { ControlAtributoAsistenteComponent } from './control-atributo-asistente/control-atributo-asistente.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { AppRoutingModule } from './app-routing.module';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ConfiguracionEvento } from './configuracionEvento';
import { VariablesEvento } from './variablesEvento';
import { GraficoCampoComponent } from './grafico-campo/grafico-campo.component';
import { ControlAccesoComponent } from './control-acceso/control-acceso.component';
import { EstadisticasService } from './estadisticas.service';
import { ImpresionService } from './impresion.service';
import { RegistroOnlineComponent } from './registro-online/registro-online.component';
import { CorreoComponent } from './correo/correo.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscadorComponent,
    DetalleAsistenteComponent,
    EscarapelaComponent,
    ControlAtributoAsistenteComponent,
    CertificadoComponent,
    EstadisticasComponent,
    GraficoCampoComponent,
    ControlAccesoComponent,
    RegistroOnlineComponent,
    CorreoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxBarcodeModule,
    QRCodeModule,
    AppRoutingModule
  ],
  providers: [
    RegistroService,
    EstadisticasService,
    ImpresionService,
    ConfiguracionEvento,
    VariablesEvento
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
