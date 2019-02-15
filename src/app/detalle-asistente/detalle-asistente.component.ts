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
import { Correo } from '../correo';

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
  @Input() origen: string;
  @Input() mensajes: string[];
  @Input() errores: string[];
  guardado: boolean;
  existe: boolean;
  habeasDataAceptado: boolean;
  confirmado: boolean;
  terminado: boolean;
  nombreAsistente: string;

  constructor(private registroService: RegistroService, private impresionService: ImpresionService, private config: VariablesEvento) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.guardado = false;
    this.habeasDataAceptado = false;
    this.confirmado = false;
	this.terminado = false;
    this.existe = false;
    this.nombreAsistente = "";
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
            this.errores.push("Lo sentimos. El asistente " + this.asistente.identificacion + " ya fue registrado previamente");
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
						alert("a");
					alert(this.asistenteImpresion.atributos);
					alert(this.asistenteImpresion.atributos.length);
                      this.asistenteImpresion.atributos.forEach(atr => {
                        atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
                      });
                      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE").subscribe(
                        nombre => {
							alert("1");
							alert(nombre.valor);
                          this.nombreAsistente = nombre.valor;
                          this.confirmado = true;
                          this.mensajes.push("Sus datos han sido guardados exitosamente!");
                          this.mensajes.push("Recibirá un correo electrónico con la información y el código QR de acceso al evento");
                        }
                      );
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
					alert("b");
					alert(this.asistenteImpresion.atributos);
					alert(this.asistenteImpresion.atributos.length);
                  this.asistenteImpresion.atributos.forEach(atr => {
                  atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
				  this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE").subscribe(
                    nombre => {
						alert("2");
						alert(nombre.valor);
                      this.nombreAsistente = nombre.valor;
                  });
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

  aceptarHabeasData(){
    this.habeasDataAceptado = true;
  }

  enviarCorreo(terminar: boolean): void{
    var plantilla;
    let correo = new Correo();
    this.terminado = terminar;
    if(this.origen == "online"){
      plantilla = document.getElementById("plantillaCorreoConfirmacion").innerHTML;
      correo.subject = "Confirmación de Registro - Congreso de Actualización en Propiedad Horizontal";
    }else{
      plantilla = document.getElementById("plantillaCorreoInvitacion").innerHTML;
      correo.subject = "Invitación - Congreso de Actualización en Propiedad Horizontal";
    }
    correo.html = plantilla;
    this.registroService.getAsistenteAtributo(this.asistente.identificacion, "EMAIL").subscribe(
      email => {
        correo.email = email.valor;
        this.registroService.enviarCorreo(correo).subscribe(mensaje =>{
          let asistencia = new AsistenciaZona();
          asistencia.idasistente = this.asistente.id;
          asistencia.idoperacion = Operacion.Correo;
          asistencia.idzona = this.config.idZonaRegistro;
          this.registroService.addAsistenciaZona(asistencia)
          .subscribe(asistenciaZona => {});
      });
    });
  }
}
