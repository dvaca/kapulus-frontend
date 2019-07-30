import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../registro.service';
import { Asistente } from '../asistente';
import { Zona } from '../zona';
import { ConfiguracionEvento } from '../configuracionEvento';
import { isUndefined } from 'util';
import { AsistenciaZona } from '../asistenciazona';
import { Operacion } from '../enums';
import { EstadisticasService } from '../estadisticas.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-control-acceso',
  templateUrl: './control-acceso.component.html',
  styleUrls: ['./control-acceso.component.css']
})
export class ControlAccesoComponent implements OnInit {
  
  asistente: Asistente;
  problemas: string[];
  alertas: string[];
  mensajes: string[];
  zonaActual: Zona;
  zonas: Zona[];
  nombreAsistente: String;
  totalIngresos: number;
  totalActualZona: number;
  totalRegalos: number;

  constructor(private registroService: RegistroService, private estadisticasService: EstadisticasService, private config: ConfiguracionEvento) { }

  ngOnInit() {
    this.cargarZonas();
  }

  registrarAcceso(criterio: string): void {
    this.problemas = [];
    this.alertas = [];
    this.mensajes = [];
    this.buscarAsistente(criterio);
  }

  buscarAsistente(criterio: string): void{
    criterio = criterio.trim();
    if (!criterio) { 
      return; 
    }
    if(isNaN(parseInt(criterio)) || parseInt(criterio).toString() != criterio){
      this.problemas.push("Debe ingresar un número");
      return;
    }
    if(isUndefined(this.zonaActual)){
      this.problemas.push("Debe seleccionar una zona");
      return;
    }
    //this.registroService.getAsistenteControlAcceso(parseInt(criterio))
	this.registroService.getAsistenteControlAcceso(criterio)
    .subscribe(asistente =>{this.asistente = asistente;
      if(isUndefined(this.asistente.identificacion)){
        this.problemas.push("La cédula ingresada no fue encontrada");
        return;
      }
      //this.registroService.getAsistenteAtributo(parseInt(criterio), "NOMBRE")
	  this.registroService.getAsistenteAtributo(criterio, "NOMBRE")
      .subscribe(nombre => {
        this.nombreAsistente = nombre.valor;
        if(!this.asistente.registrado && this.zonaActual.id != this.config.variables.idZonaRegistro){
          this.problemas.push("El asistente no se encuentra registrado");
          return;
        }else{
          let restricciones = [];
          if(this.zonaActual.restriccioneszona.length > 0){
            restricciones = this.zonaActual.restriccioneszona.filter(x => x.idzona == this.zonaActual.id);
          }
          if(this.zonaActual.validaentrada == true && this.zonaActual.validasalida == false){
            if(restricciones.length > 0){
              // Si tiene una restriccion en una zona de entrada se asume que es restrictiva
              let atributo = this.asistente.atributos.filter(x => x.idcampo == restricciones[0].idcampo)[0];
              if(restricciones[0].valorespermitidos.indexOf(atributo.valor)<0){
                this.problemas.push("El asistente no puede ingresar a la zona " + this.zonaActual.nombre);
                return;
              }
            }
            let asistencia = new AsistenciaZona();
            asistencia.idasistente = this.asistente.id;
            asistencia.idoperacion = Operacion.Entrada;
            asistencia.idzona = this.zonaActual.id;
            this.registroService.getUltimaAsistenciaZona(asistencia)
            .subscribe(ultimaAsistencia => { 
              if(!isUndefined(ultimaAsistencia.idoperacion)){
                if(ultimaAsistencia.idoperacion == Operacion.Entrada){
                  this.alertas.push("El asistente ya ingresó a la zona " + this.zonaActual.nombre);
                  return;
                }
              }
              this.registroService.addAsistenciaZona(asistencia)
              .subscribe(asistenteActualizada => {
                this.mensajes.push("Bienvenido a " + this.zonaActual.nombre);
                this.actualizarEstadisticas();
              });
            });
          }
          if(this.zonaActual.validasalida == true && this.zonaActual.validaentrada == true){
            //Si valida salida es porque valida entrada y salida
            let asistencia = new AsistenciaZona();
            asistencia.idasistente = this.asistente.id;
            asistencia.idoperacion = Operacion.Salida;
            asistencia.idzona = this.zonaActual.id;
            this.registroService.getUltimaAsistenciaZona(asistencia)
            .subscribe(ultimaAsistencia => { 
              if(!isUndefined(ultimaAsistencia.idoperacion)){
                if(ultimaAsistencia.idoperacion == Operacion.Salida){
                  asistencia.idoperacion = Operacion.Entrada;
                }
              }
              else{
                asistencia.idoperacion = Operacion.Entrada;
              }
              if(asistencia.idoperacion == Operacion.Entrada){
                if(restricciones.length > 0){
                  // Si tiene una restriccion en una zona de entrada se asume que es restrictiva
                  let atributo = this.asistente.atributos.filter(x => x.idcampo == restricciones[0].idcampo)[0];
                  if(restricciones[0].valorespermitidos.indexOf(atributo.valor)<0){
                    this.problemas.push("El asistente no puede ingresar a la zona " + this.zonaActual.nombre);
                    return;
                  }
                }
              }
              this.registroService.addAsistenciaZona(asistencia)
              .subscribe(asistenteActualizada => {
                if(asistencia.idoperacion == Operacion.Entrada){
                  this.mensajes.push("Bienvenido a " + this.zonaActual.nombre);
                }else{
                  this.mensajes.push("Gracias por visitar " + this.zonaActual.nombre);
                }
                this.actualizarEstadisticas();
              });
            });            
          }
          if(this.zonaActual.entregaregalo == true){
            let valorEntrega: string;
            if(restricciones.length > 0){
              let atributo = this.asistente.atributos.filter(x => x.idcampo == restricciones[0].idcampo)[0];
              if(restricciones[0].restrictivo == true){
                if(restricciones[0].valorespermitidos.indexOf(atributo.valor)<0){
                  this.problemas.push("El asistente no puede recibir obsequio en " + this.zonaActual.nombre);
                  return;
                }else{
                  valorEntrega = atributo.valor;
                }
              }else{
                valorEntrega = atributo.valor;
              }
            }
            let asistencia = new AsistenciaZona();
            asistencia.idasistente = this.asistente.id;
            asistencia.idoperacion = Operacion.Entrega;
            asistencia.idzona = this.zonaActual.id;
            this.registroService.getUltimaAsistenciaZona(asistencia)
            .subscribe(ultimaAsistencia => { 
              if(!isUndefined(ultimaAsistencia.idoperacion)){
                if(ultimaAsistencia.idoperacion == Operacion.Entrega){
                  if(isUndefined(valorEntrega)){
                    this.alertas.push("El asistente registra entrega en la zona " + this.zonaActual.nombre);
                  }else{
                    this.alertas.push("El asistente ya recibió " + valorEntrega + " en la zona " + this.zonaActual.nombre);
                  }
                  return;
                }
              }
              this.registroService.addAsistenciaZona(asistencia)
              .subscribe(asistenteActualizada => {
                if(isUndefined(valorEntrega)){
                  this.mensajes.push("Entrega satisfactoria en " + this.zonaActual.nombre);
                }else{
                  this.mensajes.push("Entregado "+ valorEntrega + " satisfactoriamente en " + this.zonaActual.nombre);
                }
                this.actualizarEstadisticas();
              });
            });
          }
          if(this.zonaActual.id == this.config.variables.idZonaRegistro){
            if(this.asistente.registrado){
              this.problemas.push("El asistente ya se encuentra registrado");
            }else{
              this.registrar();
              this.mensajes.push("El asistente fue registrado exitósamente");
            }
          }
        }
      });
    });
  }

  actualizarEstadisticas(): void {
    this.estadisticasService.getEstadisticasOperacion()
    .subscribe(estadisticas => { 
      if(this.zonaActual.validaentrada == true || this.zonaActual.validasalida == true){
        let datos = estadisticas.filter(x => x.idoperacion == Operacion.Entrada && x.idzona == this.zonaActual.id);
        let entradas = datos[0].cuenta;
        this.totalIngresos = datos[0].cuentadistintos;
        if(this.zonaActual.validasalida){
          datos = estadisticas.filter(x => x.idoperacion == Operacion.Salida && x.idzona == this.zonaActual.id);
          this.totalActualZona = entradas - datos[0].cuenta;
        }
      }
      if(this.zonaActual.entregaregalo == true){
        let datos = estadisticas.filter(x => x.idoperacion == Operacion.Entrega && x.idzona == this.zonaActual.id);
        this.totalRegalos = datos[0].cuentadistintos;
      }
    });
  }

  cargarZonas(): void {
    this.config.getZonas().subscribe(zonas => {
      this.zonas = zonas;
    });
  }

  registrar(): void {
    let asistencia: AsistenciaZona;
    this.asistente.registrado = true;
    this.asistente.actualizado = true;
    this.registroService.updAsistente(this.asistente)
    .subscribe(asistente => {this.asistente = asistente;
      asistencia = new AsistenciaZona();
      asistencia.idasistente = this.asistente.id;
      asistencia.idoperacion = Operacion.Registro;
      asistencia.idzona = this.config.variables.idZonaRegistro;
      this.registroService.addAsistenciaZona(asistencia)
      .subscribe(asistenciaZona => {
      });
    });
  } 

}
