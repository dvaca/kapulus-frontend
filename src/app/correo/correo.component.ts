import { Component, OnInit, Input } from '@angular/core';
import { Asistente } from '../asistente';
import { isUndefined } from 'util';
import { RegistroService } from '../registro.service';
import { VariablesEvento } from '../variablesEvento';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() nombreAsistente: string;
  @Input() apellidoAsistente: string;
  @Input() identificacion: string;

  constructor(private registroService: RegistroService, public variables: VariablesEvento) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!isUndefined(this.asistente)) {
      this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
        x => {
          if (x.atributos != undefined) {
            x.atributos.forEach(atr => {
              if (atr.nombre == "PRIMER NOMBRE") {
                this.nombreAsistente = atr.valor;
              }
              if (atr.nombre == "PRIMER APELLIDO") {
                this.apellidoAsistente = atr.valor;
              }
            });
          }
        }
      );
    }
    if (isUndefined(this.nombreAsistente)) {
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE COMPLETO").subscribe(
        nombre => {
          this.nombreAsistente = nombre.valor;
        });
    }
    if (isUndefined(this.apellidoAsistente)) {
		/*
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
        apellido => {
          this.apellidoAsistente = apellido.valor;
        });
		*/
    }
  }

}
