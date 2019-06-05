import { Component, OnInit } from '@angular/core';
import { ConfiguracionEvento } from '../configuracionEvento';
import { CampoEvento } from '../camposevento';
import { EstadisticasService } from '../estadisticas.service';
import { Estadistica } from '../estadistica';
import { EstadisticasComponent } from '../estadisticas/estadisticas.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadisticas-local',
  templateUrl: './estadisticas-local.component.html',
  styleUrls: ['./estadisticas-local.component.css']
})
export class EstadisticasLocalComponent implements OnInit {

  camposEvento: CampoEvento[];
  totalAsistentes: number;
  asistentesRegistrados: number;
  asistentesNoRegistrados: number;

  constructor(private route: ActivatedRoute, 
			  private config: ConfiguracionEvento,
              private estadisticasService: EstadisticasService) { }

  ngOnInit() {
    let url = this.route.snapshot.url.toString();
	if(url == 'evento_estadisticas_coosalud'){
      this.cargarEvento(12, 11);
    }
	if(url == 'evento_estadisticas_coosalud_bmanga'){
      this.cargarEvento(14, 13);
    }
	if(url == 'evento_estadisticas_autonomia_medica'){
      this.cargarEvento(15, 14);
    }
	if(url == 'evento_estadisticas_coosalud_medellin'){
      this.cargarEvento(17, 16);
    }
	if(url == 'evento_estadisticas_columnistas'){
      this.cargarEvento(16, 15);
    }
	if(url == 'evento_estadisticas_desayuno'){
      this.cargarEvento(19, 18);
    }
	if(url == 'evento_estadisticas_movilidad'){
      this.cargarEvento(21, 21);
    }	
	if(url == 'evento_estadisticas_contraloria'){
      this.cargarEvento(22, 22);
    }	
	if(url == 'evento_estadisticas_coosalud_bogota'){
      this.cargarEvento(23, 23);
    }
	if(url == 'evento_estadisticas_rio_bogota'){
      this.cargarEvento(24, 24);
    }
    this.cargarCamposEvento();
  }
  
  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }

  cargarEstadisticas(): void{
    var listaEstadisticas : Estadistica[];
    this.estadisticasService.getEstadisticasLocal()
    .subscribe(estadisticas => { 
      listaEstadisticas = estadisticas;
      //Grafica estadisticos generales
      estadisticas.forEach(estadistica => {
        if(estadistica.estadistico == "Total de asistentes"){
          this.totalAsistentes = estadistica.cantidad;
        }
        if(estadistica.estadistico == "Asistentes registrados"){
          this.asistentesRegistrados = estadistica.cantidad;
        }
        if(estadistica.estadistico == "No registrados"){
          this.asistentesNoRegistrados = estadistica.cantidad;
        }
      });
      //Grafica atributos booleanos
      var datos = listaEstadisticas.filter(y => y.atributo == "registrado");
      var categorias = new Array<string>();
      var valores = new Array<number>();
      for(let i=0; i< datos.length; i++){
        categorias.push(datos[i].valor);
        valores.push(datos[i].cantidad);
      }
      EstadisticasComponent.graficarEstadisticas(categorias, valores, "Registrados", "chartRegistrados", "doughnut");
      
      datos = listaEstadisticas.filter(y => y.atributo == "preinscrito");
      categorias = new Array<string>();
      valores = new Array<number>();
      for(let i=0; i< datos.length; i++){
        categorias.push(datos[i].valor);
        valores.push(datos[i].cantidad);
      }
      EstadisticasComponent.graficarEstadisticas(categorias, valores, "Asistentes", "chartAsistentes", "doughnut");

      datos = listaEstadisticas.filter(y => y.atributo == "actualizado");
      categorias = new Array<string>();
      valores = new Array<number>();
      for(let i=0; i< datos.length; i++){
        categorias.push(datos[i].valor);
        valores.push(datos[i].cantidad);
      }
      EstadisticasComponent.graficarEstadisticas(categorias, valores, "Actualizados", "chartActualizados", "doughnut");

      //TimeLine
      let registrados = new Array<number>();
      let escarapelas = new Array<number>();
      let categoriasTimeline = new Array<string|string[]>();
      let valoresTimeline = new Array<Array<number>>();
      let diaAnterior = "";
      let categoria: string|string[];
      datos = listaEstadisticas.filter(y => y.atributo == "timelineRegistrados");
      for(let i=0; i< datos.length; i++){
        if(datos[i].dia != diaAnterior){
          categoria = [datos[i].hora, datos[i].dia];
        }else{
            categoria = datos[i].hora;
        }
        categoriasTimeline.push(categoria);
        registrados.push(datos[i].cantidad);
        diaAnterior = datos[i].dia;
      }
      datos = listaEstadisticas.filter(y => y.atributo == "timelineEscarapelas");
      for(let i=0; i< datos.length; i++){
        escarapelas.push(datos[i].cantidad);
      }
      valoresTimeline = [registrados, escarapelas];
      EstadisticasComponent.graficarTimeLine(categoriasTimeline, valoresTimeline, "Registrados por día", 
        ["Registrados", "Escarapelas"], "chartLineaTiempo", ["bar", "line"]);
    });
  }

  cargarCamposEvento(): void {
    this.config.getCamposEvento().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
      this.cargarEstadisticas();
    });
  }

}
