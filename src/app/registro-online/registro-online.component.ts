import { Component, OnInit } from '@angular/core';
import { Asistente } from '../asistente';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { ConfiguracionEvento } from '../configuracionEvento';

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

  constructor(private config: ConfiguracionEvento) { }

  ngOnInit() {
    this.cargarCamposEvento();
  }

  cargarCamposEvento(): void {
    this.config.getCamposEvento().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
    });
  }

  crearRegistro(): void{
    this.nuevoAsistente = new Asistente();
    this.nuevoAsistente.registrado = false;
    this.nuevoAsistente.preinscrito = false;
    this.nuevoAsistente.atributos = new Array<AtributoAsistente>();
    this.camposEvento.forEach(campoEvento => {
      var atributo = new AtributoAsistente();  
      atributo.idcampo = campoEvento.id;
      atributo.nombre = campoEvento.nombre;
      this.nuevoAsistente.atributos.push(atributo); 
    });
    this.mensajes = [];
    this.errores = [];
  }
}
