import { Component, OnInit, Input } from '@angular/core';
import { Asistente } from '../asistente';
import { isUndefined } from 'util';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() asistenteImpresion: Asistente;
  @Input() nombreAsistente: string;

  constructor(private registroService: RegistroService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    alert(this.nombreAsistente);
	if(isUndefined(this.nombreAsistente)){
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "NOMBRE").subscribe(
        nombre => {
          this.nombreAsistente = nombre.valor;
      });
    }
  }

}
