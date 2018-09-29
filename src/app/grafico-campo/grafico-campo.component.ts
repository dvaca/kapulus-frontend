import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CampoEvento } from '../camposevento';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { EstadisticasService } from '../estadisticas.service';

@Component({
  selector: 'app-grafico-campo',
  templateUrl: './grafico-campo.component.html',
  styleUrls: ['./grafico-campo.component.css']
})
export class GraficoCampoComponent implements OnInit, OnChanges {

  @Input() campo: CampoEvento;
  private altura: number;
  
  constructor(private estadisticasService: EstadisticasService) { }

  ngOnInit() {
  }

  ngOnChanges() {  
    this.graficarCampo();
  }

  graficarCampo():void{
    this.estadisticasService.getEstadisticasCampos(this.campo)
    .subscribe(estadisticas =>{
      var datos = estadisticas;
      var categorias = new Array<string>();
      var valores = new Array<number>();
      var titulo = this.campo.nombre.charAt(0).toLocaleUpperCase() + this.campo.nombre.slice(1);
      this.altura = datos.length > 10 ? datos.length*20 : 300;

      var tipoGrafico = datos.length > 3 ? datos.length > 10 ? "horizontalBar": "bar": "doughnut";

      for(let i=0; i< datos.length && i<15; i++){
        categorias.push(datos[i].valor);
        valores.push(datos[i].cuenta);
      }
      EstadisticasComponent.graficarEstadisticas(categorias, valores, titulo, "chart_campo_" + this.campo.nombre, tipoGrafico);
    });
  }
}
