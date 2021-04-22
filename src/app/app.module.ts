import { FileUploadModule } from './file-upload/file-upload.module';
import { EventManagerModule } from './event-manager/event-manager.module';
import { NewloginModule} from './newlogin/newlogin.module';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EstadisticasLocalComponent } from './estadisticas-local/estadisticas-local.component';
import { from } from 'rxjs/observable/from';

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
    LoginComponent,
    EstadisticasLocalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxBarcodeModule,
    QRCodeModule,
    AppRoutingModule,
    DataLoaderModule,
    EventManagerModule,
    FileUploadModule,
    NewloginModule
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
