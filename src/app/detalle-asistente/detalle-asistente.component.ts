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
    this.asistente = new Asistente();
    if(!this.nuevo && !isUndefined(this.asistente)){
	  this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
		x => {this.asistenteImpresion = x; 
		  this.asistenteImpresion.atributos.forEach(atr => {
			atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
			//if(atr.nombre =="PRIMER NOMBRE"){
				
			if(atr.nombre =="NOMBRE COMPLETO"){
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
		  this.asistente.online = (this.origen == "online");
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
                      //this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE").subscribe(
					  this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE COMPLETO").subscribe(
                        nombre => {
                          //this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
                            //apellido => {
                              this.nombreAsistente = nombre.valor;
                              //this.apellidoAsistente = apellido.valor;
                              this.identificacion = this.asistente.identificacion.toString();
                              this.confirmado = true;
                              this.mensajes.push("Sus datos han sido guardados exitosamente!");
                              this.mensajes.push("Recibirá un correo electrónico con la información y el código QR de acceso al evento");
                            //}
                          //);
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
				  //this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE").subscribe(
				  this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE COMPLETO").subscribe(
            nombre => {
              //this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
                //apellido => {
                  this.nombreAsistente = nombre.valor;
                  //this.apellidoAsistente = apellido.valor;
					        this.identificacion = this.asistente.identificacion.toString();
                      this.confirmado = true;
                    //});    
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
	  if(this.config.idevento == 18){
		correo.subject = "Bienvenido al foro 'Mujeres Colombianas: Mujeres que inspiran'";
	  }
	  if(this.config.idevento == 20){
		correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Cali";	
	  }
	  if(this.config.idevento == 23){
		correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Bogotá";
	  }
	  if(this.config.idevento == 24){
		correo.subject = "Bienvenido al foro 'RENACER DEL RIO BOGOTÁ: UN ESFUERZO DE TODOS'";
	  }
	  if(this.config.idevento == 29){
		correo.subject = "Bienvenido al encuentro: Prosegur Soluciones Integrales";
	  }
	  if(this.config.idevento == 55){
		correo.subject = "Confirmación Almuerzo Aliados CredibanCo 2019";
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
		if(this.config.idevento == 18){
			correo.subject = "Invitación | Foro 'Mujeres colombianas: mujeres que inspiran' en Bogotá el 19 de junio";
		}
		if(this.config.idevento == 20){
			correo.subject = "Participe en la conferencia 'Sector salud: retos y perspectivas después de la Ley de Punto Final' en la ciudad de Cali.";
		}
		if(this.config.idevento == 23){
			correo.subject = "Invitación a la rendición de cuentas Coosalud Bogotá";
		}
		if(this.config.idevento == 24){
			correo.subject = "Invitación | Foro 'Renacer del río Bogotá: un esfuerzo de todos' este 27 de junio en Bogotá";
		}
		if(this.config.idevento == 29){
			correo.subject = "Invitación | Encuentro 'Prosegur Soluciones Integrales (PSI)' próximo 12 de agosto.";
		}
		if(this.config.idevento == 33){
			correo.subject = "Certificado de asistencia al evento 'II Congreso Internacional de Ética Profesional en Ingeniería - COPNIA'";
		}
		if(this.config.idevento == 42){
			correo.subject = "Asista al 'II Congreso Internacional Antidrogas' este 23 y 24 de octubre";
		}
		if(this.config.idevento == 44){
			correo.subject = "Asista al foro Bogotá: 'SEGURIDAD INTELIGENTE'";
		}
		if(this.config.idevento == 45){
			correo.subject = "Asista al foro 'La verdad para la no repetición: diálogo desde un enfoque étnico'";
		}
		if(this.config.idevento == 47){
			correo.subject = "Asista al foro 'Educación Ambiental como herramienta de desarrollo sostenible'";
		}
		if(this.config.idevento == 49){
			correo.subject = "Inauguración Arkadia Centro Comercial: Confirma tu asistencia";
		}
		if(this.config.idevento == 55){
			correo.subject = "Invitación Almuerzo Aliados CredibanCo 2019";
		}
      }else{
        plantilla = document.getElementById("plantillaCorreoConfirmacion").innerHTML;
		if(this.config.idevento == 10){
			correo.subject = "Bienvenido al Premio de Periodismo Regional - No olvide presentar su código QR de acceso";	
		}
		if(this.config.idevento == 11){
			correo.subject = "Bienvenido al Foro ‘Ciudadanía y participación: El rol de los bolivarenses en La democracia’";	
		}
		if(this.config.idevento == 12){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Cartagena";	
		}
		if(this.config.idevento == 13){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Barranquilla";	
		}
		if(this.config.idevento == 14){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Bucaramanga";	
		}
		if(this.config.idevento == 15){
			correo.subject = "Bienvenido al foro ‘LA RESPONSABILIDAD DE LOS ACTORES DEL SISTEMA DE SALUD: AUTONOMÍA MÉDICA, CALIDAD Y AUTORREGULACIÓN’";	
		}
		if(this.config.idevento == 16){
			correo.subject = "Bienvenido al conversatorio 'Más en vivo que nunca'";	
		}
		if(this.config.idevento == 17){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Medellín";	
		}
		if(this.config.idevento == 18){
		    correo.subject = "Bienvenido al foro 'Mujeres Colombianas: Mujeres que inspiran'";
		}
		if(this.config.idevento == 20){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Cali";	
		}
		if(this.config.idevento == 21){
		    correo.subject = "Bienvenido al foro: ‘Movilidad 2050: Bogotá a la altura de sus proyecciones’";
		}
		if(this.config.idevento == 22){
		    correo.subject = "Bienvenido al foro: 'Hacia un nuevo modelo de control fiscal en Colombia'";
		}
		if(this.config.idevento == 23){
			correo.subject = "Bienvenido al la rendición de cuentas - Coosalud Bogotá";
		}
		if(this.config.idevento == 24){
			correo.subject = "Bienvenido al foro 'RENACER DEL RIO BOGOTÁ: UN ESFUERZO DE TODOS'";
		}
		if(this.config.idevento == 25){
			correo.subject = "Bienvenido a la fiesta! | FEORACLE";
		}
		if(this.config.idevento == 29){
			correo.subject = "Bienvenido al encuentro: Prosegur Soluciones Integrales";
		}
		if(this.config.idevento == 30){
			correo.subject = "Bienvenido al evento: Sé lo que como";
		}
		if(this.config.idevento == 33){
			correo.subject = "Bienvenido al evento: II Congreso Internacional de Ética Profesional en Ingeniería - COPNIA";
		}
		if(this.config.idevento == 34){
			correo.subject = "Bienvenido al foro: 'Juegos de Suerte y Azar'";
		}
		if(this.config.idevento == 35){
			correo.subject = "Bienvenido a la 3ra Cumbre de Sostenibilidad 'Bicentenario una mirada de transformación y sostenibilidad'";
		}
		if(this.config.idevento == 36){
			correo.subject = "Bienvenido a la fiesta! | FEORACLE";
		}
		if(this.config.idevento == 39){
			correo.subject = "Código para ingreso Evento 5 de septiembre | FEORACLE";
		}
		if(this.config.idevento == 40){
			correo.subject = "Bienvenido al XVII encuentro de jefes de planeación  | POLICÍA NACIONAL";
		}
		if(this.config.idevento == 41){
			correo.subject = "Bienvenido al foro 'DISCUSIONES ÉTICAS EN TORNO AL CANNABIS MEDICINAL";
		}
		if(this.config.idevento == 43){
			correo.subject = "Bienvenido al Qlik Analytics Day Colombia";
		}
		if(this.config.idevento == 44){
			correo.subject = "Bienvenido al Foro: 'Bogotá: Seguridad Inteligente'";
		}
		if(this.config.idevento == 46){
			correo.subject = "Bienvenido al Foro 'Democracia a prueba: participación política, violencia y elecciones'.";
		}
		if(this.config.idevento == 47){
			correo.subject = "Bienvenido al Foro: Educación Ambiental como herramienta de desarrollo sostenible";
		}
		if(this.config.idevento == 48){
			correo.subject = "Bienvenido a la primera Gran Cumbre Colombia Rural";
		}
		if(this.config.idevento == 50){
			correo.subject = "Bienvenido al CONVERSATORIO 'TENDENCIAS EN EL CUIDADO DE LA DIABETES: HACIA UN ESTILO DE VIDA PLENO Y LIBRE'";
		}
		if(this.config.idevento == 54){
			correo.subject = "Bienvenido al foro 'TRATAMIENTO DE AGUA Y SANEAMIENTO BÁSICO: UNA NECESIDAD DE PAIS'";
		}
		if(this.config.idevento == 55){
			correo.subject = "Confirmación Almuerzo Aliados CredibanCo 2019";
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
		if(terminar){
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
		}else{
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
		}
    });
  }
}
