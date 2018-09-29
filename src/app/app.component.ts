import { Component, OnInit } from '@angular/core';
import { ConfiguracionEvento } from './configuracionEvento';
import { Impresora } from './impresora';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Módulo de Registro';

  constructor(public config: ConfiguracionEvento){

  }
  ngOnInit(): void {
    this.cargarCamposEvento();
  }

  cargarCamposEvento(): void {
    this.config.inicializar();
    this.config.getImpresoras();
  }

}
