import { Component, OnInit, OnChanges, Input, ComponentFactory } from '@angular/core';
import { Location } from '@angular/common';
import { Asistente } from '../asistente';
import { RegistroService } from '../registro.service';
import { CampoEvento } from '../camposevento';
import { AsistenciaZona } from '../asistenciazona';
import { Operacion } from '../enums';
import { ConfiguracionEvento } from '../configuracionEvento';
import { VariablesEvento } from '../variablesEvento';
import { Impresion } from '../impresion';
import { ImpresionService } from '../impresion.service';

@Component({
  selector: 'app-detalle-asistente',
  templateUrl: './detalle-asistente.component.html',
  styleUrls: ['./detalle-asistente.component.css']
})
export class DetalleAsistenteComponent implements OnInit, OnChanges {
  @Input() asistente: Asistente;
  asistenteImpresion: Asistente;
  @Input() camposEvento: CampoEvento[];
  @Input() nuevo: boolean;
  guardado: boolean;
  existe: boolean;

  constructor(private registroService: RegistroService, private impresionService: ImpresionService, private config: VariablesEvento) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.guardado = false;
    this.existe = false;
    if(!this.nuevo){
      let asistencia = new AsistenciaZona();
      asistencia.idasistente = this.asistente.id;
      asistencia.idoperacion = Operacion.Busqueda;
      asistencia.idzona = this.config.idZonaRegistro;
      this.registroService.addAsistenciaZona(asistencia)
      .subscribe(asistenciaZona => {});
    }
  }

  guardarAsistente(registrar: boolean): void {
    let asistencia: AsistenciaZona;
    let asistenteExistente: Asistente;
    this.existe = false;
    if(registrar){
      this.asistente.registrado = true;
    }
    //this.registroService.guardarAsistenteMock(this.asistente);
    if(this.nuevo){
      this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
        x => {asistenteExistente = x; 
          if(x.id == null){
            this.existe = false;
          }else{
            this.existe = true;
          }
        if(this.existe == false ){
          this.registroService.addAsistente(this.asistente)
          .subscribe(asistente => {this.asistente = asistente;
            asistencia = new AsistenciaZona();
            asistencia.idasistente = this.asistente.id;
            if(registrar){
              asistencia.idoperacion = Operacion.Registro;
            }else{
              asistencia.idoperacion = Operacion.Creacion;
            }
            asistencia.idzona = this.config.idZonaRegistro;
            this.registroService.addAsistenciaZona(asistencia)
            .subscribe(asistenciaZona => {
              this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
                x => {this.asistenteImpresion = x; 
                      this.asistenteImpresion.atributos.forEach(atr => {
                        atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
                      });
                    });
            });
          });
        }
      });
    }else{
      this.asistente.actualizado = true;
      this.registroService.updAsistente(this.asistente)
      .subscribe(asistente => {this.asistente = asistente;
        asistencia = new AsistenciaZona();
        asistencia.idasistente = this.asistente.id;
        if(registrar){
          asistencia.idoperacion = Operacion.Registro;
        }else{
          asistencia.idoperacion = Operacion.Actualizacion;
        }
        asistencia.idzona = this.config.idZonaRegistro;
        this.registroService.addAsistenciaZona(asistencia)
        .subscribe(asistenciaZona => {
          this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
            x => {this.asistenteImpresion = x; 
                  this.asistenteImpresion.atributos.forEach(atr => {
                  atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
                });
            });
        });
      });
    } 
    this.guardado = true;
  }

  imprimirBrowser(documento: string): void {
    var asistencia = new AsistenciaZona();
    asistencia.idasistente = this.asistente.id;
    if(documento == "formEscarapela"){
      asistencia.idoperacion = Operacion.ImpresionEscarapela;
    }else{
      asistencia.idoperacion = Operacion.ImpresionCertificado;
    }
    asistencia.idzona = this.config.idZonaRegistro;
    this.registroService.addAsistenciaZona(asistencia)
    .subscribe(asistenciaZona => {
      this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
        x => {this.asistenteImpresion = x; 
              
              var w = window.open();
              var printContents = document.getElementById(documento).innerHTML;
              var header = document.head.innerHTML;
              if(documento == "formEscarapela"){
                header = header.replace("landscape", this.config.orientacionEscarapela);
              }else{
                header = header.replace("landscape", this.config.orientacionCertificado);
              }
              
              w.document.body.innerHTML = printContents;
              w.document.head.innerHTML = header;
              w.print();
              w.close();
            });
      });
  }

  imprimirServicioDymo(){
    try{
      var asistencia = new AsistenciaZona();
      asistencia.idasistente = this.asistente.id;
      asistencia.idoperacion = Operacion.ImpresionEscarapela;
      asistencia.idzona = this.config.idZonaRegistro;
      this.registroService.addAsistenciaZona(asistencia)
      .subscribe(asistenciaZona => {
        this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
          x => {this.asistenteImpresion = x; 
            let impresion = new Impresion();
            impresion.atributos = [];
            this.asistenteImpresion.atributos.forEach(atr => {
              atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
              impresion.atributos.push(atr);
            });
            impresion.nombreImpresora = this.config.impresoraSeleccionada.nombre;
            impresion.identificacion = this.asistenteImpresion.identificacion;
            this.impresionService.imprimir(impresion).subscribe(x => {});
        });
      });
    }catch(error){
      alert(error);
    }
  }
}
