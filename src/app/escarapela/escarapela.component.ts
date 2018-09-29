import { Component, OnInit, Input } from '@angular/core';
import { RegistroService } from '../registro.service';
import { Asistente } from '../asistente';
import { NgxBarcodeComponent } from 'ngx-barcode';

@Component({
  selector: 'app-escarapela',
  templateUrl: './escarapela.component.html',
  styleUrls: ['./escarapela.component.css']
})
export class EscarapelaComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() asistenteImpresion : Asistente;
  
  constructor(private registroService: RegistroService) { }

  ngOnInit() {
  }
}
