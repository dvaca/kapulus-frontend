import { Component, OnInit, Input } from '@angular/core';
import { Asistente } from '../asistente';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() asistenteImpresion : Asistente;

  constructor() { }

  ngOnInit() {
  }

}
