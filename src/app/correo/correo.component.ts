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

  ngOnChanges(){
	  if(!isUndefined(this.asistente)){
	  this.registroService.getAsistenteImpresion(this.asistente.identificacion).subscribe(
		x => {this.asistenteImpresion = x; 
		  this.asistenteImpresion.atributos.forEach(atr => {
			atr.campo = this.camposEvento.filter(y => y.id == atr.idcampo)[0];
			if(atr.nombre =="PRIMER NOMBRE"){
				this.nombreAsistente = atr.valor;
			}
			if(atr.nombre =="PRIMER APELLIDO"){
				this.apellidoAsistente = atr.valor;
				alert(this.apellidoAsistente);
			}
		  });
		}
	   );
	  }
	if(isUndefined(this.nombreAsistente)){
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE").subscribe(
        nombre => {
          this.nombreAsistente = nombre.valor;
      });
    }
    if(isUndefined(this.apellidoAsistente)){
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO").subscribe(
        apellido => {
          this.apellidoAsistente = apellido.valor;
      });
    }
	alert(this.apellidoAsistente);
  }

}
