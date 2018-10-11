import { Component, OnInit, Input } from '@angular/core';
import { Asistente } from '../asistente';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() asistenteImpresion: Asistente;
  @Input() nombreAsistente: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
  }

}
