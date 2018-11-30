import {Injectable } from "@angular/core";
import { Impresora } from "./impresora";

@Injectable()
export class VariablesEvento{
  idevento : number; 
  idZonaRegistro : number; 
  orientacionCertificado : string;
  orientacionEscarapela : string;
  impresoraSeleccionada : Impresora;
  
  constructor(){
  }

  inicializar(): void {
    this.idevento = 5;
    this.idZonaRegistro = 4;
    this.orientacionCertificado = "portrait";
    //this.orientacionEscarapela = "landscape";
    this.orientacionEscarapela = "portrait";
    this.impresoraSeleccionada = new Impresora();
    this.impresoraSeleccionada.nombre = "DYMO LabelWriter 450";
    this.impresoraSeleccionada.ip = "http://1.1.2.2:4001";
  }
}
