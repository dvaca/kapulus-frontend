import { Component, OnInit } from '@angular/core';
import { ConfiguracionEvento } from './configuracionEvento';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Módulo de Registro';

  constructor(private route: ActivatedRoute, public config: ConfiguracionEvento){

  }
  ngOnInit(): void {
	let url = this.route.snapshot.url.toString();
    if(url == 'registro-online'){
      this.cargarEvento(5, 4);
    }
    if(url == 'registro-plus-superior'){
      this.cargarEvento(7, 6);
    }  
    this.cargarCamposEvento();
  }
  
  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }

  cargarCamposEvento(): void {
    this.config.inicializar();
    this.config.getImpresoras();
  }

}
