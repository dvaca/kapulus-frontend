import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Asistente } from '../asistente';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { ConfiguracionEvento } from '../configuracionEvento';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro-online',
  templateUrl: './registro-online.component.html',
  styleUrls: ['./registro-online.component.css']
})
export class RegistroOnlineComponent implements OnInit {
  nuevoAsistente: Asistente;
  camposEvento: CampoEvento[];
  mensajes: string[];
  errores: string[];
  nuevo: boolean;

  constructor(private registroService: RegistroService, private config: ConfiguracionEvento) { }

  ngOnInit() {
    this.cargarCamposEvento();
	this.nuevo = true;
  }

  cargarCamposEvento(): void {
    this.config.getCamposEventoWeb().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
    });
  }

  crearRegistro(criterio: string): void{
	this.nuevo = true;
    this.mensajes = [];
    this.errores = [];
	this.nuevoAsistente = new Asistente();
    criterio = criterio.trim();
    if (!criterio) { 
      this.errores.push("Debe ingresar un número");
    }
    if(isNaN(parseInt(criterio)) || parseInt(criterio).toString() != criterio){
      this.errores.push("Debe ingresar un número");
    }
    this.registroService.getAsistenteControlAcceso(parseInt(criterio))
    .subscribe(asistente =>{
      if(isUndefined(asistente.identificacion)){
        this.errores.push("La cédula ingresada no fue encontrada");
        this.nuevo = true;
      }else{
        this.nuevo = false;
        this.mensajes.push("El asistente " + asistente.identificacion + " fue encontrado en nuestra base de datos");
      }
      if(asistente.registrado){
        this.errores.push("El asistente ya se encuentra registrado");
      }
      if(this.nuevo){
        this.nuevoAsistente = new Asistente();
        this.nuevoAsistente.identificacion = parseInt(criterio);
        this.nuevoAsistente.registrado = false;
        this.nuevoAsistente.preinscrito = false;
        this.nuevoAsistente.atributos = new Array<AtributoAsistente>();
        this.camposEvento.forEach(campoEvento => {
          var atributo = new AtributoAsistente();  
          atributo.idcampo = campoEvento.id;
          atributo.nombre = campoEvento.nombre;
          this.nuevoAsistente.atributos.push(atributo); 
        });
      }
      else{
        this.nuevoAsistente = asistente;
      }
    });  
  }
}
