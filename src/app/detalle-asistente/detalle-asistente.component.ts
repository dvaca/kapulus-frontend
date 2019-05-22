import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { Asistente } from '../asistente';
import { RegistroService } from '../registro.service';
import { CampoEvento } from '../camposevento';
import { AsistenciaZona } from '../asistenciazona';
import { Operacion, TipoCorreo } from '../enums';
import { VariablesEvento } from '../variablesEvento';
import { Impresion } from '../impresion';
import { ImpresionService } from '../impresion.service';
import { Correo } from '../correo';
import { isUndefined } from 'util';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';  

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
  apellidoAsistente: string;
  identificacion: string;
  public tiposCorreo = TipoCorreo;

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
    this.apellidoAsistente = "";
	if(isUndefined(this.asistente)){
      this.nuevo = true;
    }else{
      if(this.asistente.nuevo){
        this.nuevo = true;
      }else{
        this.nuevo = false;
      }
    }
    if(!this.nuevo && !isUndefined(this.asistente)){
	  this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
		x => {this.asistenteImpresion = x; 
		  this.asistenteImpresion.atributos.forEach(atr => {
			atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
			if(atr.nombre =="PRIMER NOMBRE"){
				this.nombreAsistente = atr.valor;
			}
			if(atr.nombre =="PRIMER APELLIDO"){
				this.apellidoAsistente = atr.valor;
			}
		  });
		}
	   );
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
		  if(registrar){
            this.asistente.registrado = true;
          }
          this.registroService.addAsistente(this.asistente)
          .subscribe(asistente => {this.asistente = asistente;
		    this.nuevo = false;
            asistencia = new AsistenciaZona();
            asistencia.idasistente = this.asistente.id;
            if(registrar){
              asistencia.idoperacion = Operacion.Registro;
            }else{
              asistencia.idoperacion = Operacion.Creacion;
            }
            asistencia.idzona = this.config.idZonaRegistro;
			/*
			var campo = "NOMBRE COMPLETO";
			if(this.config.idevento == 16){
				campo = "NOMBRE COMPLETO";
			}else{
				campo = "PRIMER NOMBRE";	
			}
			*/
            this.registroService.addAsistenciaZona(asistencia)
            .subscribe(asistenciaZona => {
              this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
                x => {this.asistenteImpresion = x; 
                      this.asistenteImpresion.atributos.forEach(atr => {
                        atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
                      });
                      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE").subscribe(
                        nombre => {
                          this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
                            apellido => {
                              this.nombreAsistente = nombre.valor;
                              this.apellidoAsistente = apellido.valor;
                              this.identificacion = this.asistente.identificacion.toString();
                              this.confirmado = true;
                              this.mensajes.push("Sus datos han sido guardados exitosamente!");
                              this.mensajes.push("Recibirá un correo electrónico con la información y el código QR de acceso al evento");
                            }
                          );
                        }
                      );
                    });
            });
          });
        }
      });
    }else{
      this.asistente.actualizado = true;
	  if(registrar){
        this.asistente.registrado = true;
      }
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
					if(atr.nombre =="PRIMER NOMBRE"){
						this.nombreAsistente = atr.valor;
					}
					if(atr.nombre =="PRIMER APELLIDO"){
						this.apellidoAsistente = atr.valor;
					}
				  });
				  this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE").subscribe(
            nombre => {
              this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
                apellido => {
                  this.nombreAsistente = nombre.valor;
                  this.apellidoAsistente = apellido.valor;
					        this.identificacion = this.asistente.identificacion.toString();
                      this.confirmado = true;
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

  enviarCorreo(terminar: boolean, tipoCorreo: TipoCorreo): void{
    var plantilla;
    let correo = new Correo();
    this.terminado = terminar;
    if(this.origen == "online"){
      plantilla = document.getElementById("plantillaCorreoConfirmacion").innerHTML;
	  if(this.config.idevento == 15){
		correo.subject = "Bienvenido a la ceremonia: Premio de Periodismo Regional";
	  }
	  if(this.config.idevento == 16){
		correo.subject = "Bienvenido al conversatorio 'Más en vivo que nunca'";
	  }
    }else{
      if(tipoCorreo == TipoCorreo.Invitacion){
        plantilla = document.getElementById("plantillaCorreoInvitacion").innerHTML;
		if(this.config.idevento == 10){
			correo.subject = "Conozca a los ganadores del Premio de Periodismo Regional Semana - Grupo Argos este 9 de mayo en Medellín.";
		}
		if(this.config.idevento == 14){
			correo.subject = "¿Cómo construir un mejor sistema de salud? Entérese este 31 de mayo en Bucaramanga.";
		}
		if(this.config.idevento == 15){
			correo.subject = "Invitación al foro: LA RESPONSABILIDAD DE LOS ACTORES DEL SISTEMA DE SALUD: AUTONOMÍA MÉDICA, CALIDAD Y AUTORREGULACIÓN";
		}
		if(this.config.idevento == 16){
			correo.subject = " Acompañe a los columnistas de Semana este 26 de mayo";
		}
      }else{
        plantilla = document.getElementById("plantillaCorreoConfirmacion").innerHTML;
		if(this.config.idevento == 10){
			correo.subject = "Bienvenido al Premio de Periodismo Regional - No olvide presentar su código QR de acceso";	
		}
		if(this.config.idevento == 11){
			correo.subject = "Bienvenido al Foro ‘Ciudadanía y participación: El rol de los bolivarenses en La democracia’";	
		}
		if(this.config.idevento == 13){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Barranquilla";	
		}
		if(this.config.idevento == 14){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Bucaramanga";	
		}
		if(this.config.idevento == 16){
			correo.subject = "Bienvenido al conversatorio 'Más en vivo que nunca'";	
		}
      }
      /*
      if(this.config.idevento == 5){
        correo.subject = "Invitación - Congreso de Actualización en Propiedad Horizontal";
      }else{
        correo.subject = "Invitación - Orquídeas & Suculentas & Taller de la Cerveza";
      }
      */
    }
    correo.html = plantilla;
    correo.tipo = tipoCorreo;
    this.registroService.getAsistenteAtributo(this.asistente.identificacion, "EMAIL").subscribe(
      email => {
        correo.email = email.valor;
        this.registroService.enviarCorreo(correo).subscribe(mensaje =>{
          let asistencia = new AsistenciaZona();
          asistencia.idasistente = this.asistente.id;
          if(tipoCorreo == TipoCorreo.Invitacion){
            asistencia.idoperacion = Operacion.CorreoInvitacion;
          }else{
            asistencia.idoperacion = Operacion.CorreoConfirmacion;
          }
          asistencia.idzona = this.config.idZonaRegistro;
          this.registroService.addAsistenciaZona(asistencia)
          .subscribe(asistenciaZona => {});
      });
    });
  }
}
