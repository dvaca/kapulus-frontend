import {Injectable } from "@angular/core";
import { RegistroService } from "./registro.service";
import { ImpresionService } from "./impresion.service";
import { VariablesEvento } from "./variablesEvento";
import { CampoEvento } from "./camposevento";
import { Observable, operators } from "rxjs";
import { Zona } from "./zona";
import { Impresora } from "./impresora";

@Injectable()
export class ConfiguracionEvento{
  public static camposEvento: CampoEvento[];
  public static zonas: Zona[];
  public static impresoras: Impresora[];
  
  constructor(public variables: VariablesEvento, private registroService: RegistroService, private impresionService: ImpresionService){
  }

  inicializar(): void {
    this.variables.inicializar();
  }

  getCamposEvento(): Observable<CampoEvento[]>{
    if (ConfiguracionEvento.camposEvento == null){
      var x = this.registroService.getCamposEvento(); 
      x.subscribe(x => ConfiguracionEvento.camposEvento = x);
      return x;
    }else{
      return Observable.of(ConfiguracionEvento.camposEvento);
    }
  }

  getZonas(): Observable<Zona[]>{
    if (ConfiguracionEvento.zonas == null){
      var x = this.registroService.getZonas(); 
      x.subscribe(x => ConfiguracionEvento.zonas = x);
      return x;
    }else{
      return Observable.of(ConfiguracionEvento.zonas);
    }
  }
  
  getImpresoras(): Observable<Impresora[]>{
    if (ConfiguracionEvento.impresoras == null){
      ConfiguracionEvento.impresoras = [];
      this.registroService.getImpresoras().subscribe( lista =>{
        lista.forEach(i => {
          this.impresionService.getListaImpresoras(i.ip).subscribe(
            x => {
              x.forEach(impresora =>{
                impresora.ip = i.ip;
                ConfiguracionEvento.impresoras.push(impresora);
              }); 
            });  
        });
      });
      return Observable.of(ConfiguracionEvento.impresoras);
    }else{
      return Observable.of(ConfiguracionEvento.impresoras);
    }
  }
}
