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
	if(url == 'evento_estadisticas_coosalud_cali'){
      this.cargarEvento(20, 20);
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
	if(url == 'evento_estadisticas_mujeres'){
      this.cargarEvento(18, 17);
    }
	if(url == 'evento_estadisticas_digital_now'){
      this.cargarEvento(26, 26);
    }
	if(url == 'evento_estadisticas_defensoria'){
      this.cargarEvento(27, 27);
    }
	if(url == 'evento_estadisticas_ied'){
      this.cargarEvento(28, 28);
    }
	if(url == 'evento_estadisticas_seloquecomo'){
      this.cargarEvento(30, 30);
    }
	if(url == 'evento_estadisticas_bvc'){
      this.cargarEvento(31, 31);
    }
	if(url == 'evento_estadisticas_usaid'){
      this.cargarEvento(32, 32);
    }
	if(url == 'evento_estadisticas_copnia'){
      this.cargarEvento(33, 33);
    }  
	if(url == 'evento_estadisticas_juegos'){
      this.cargarEvento(34, 34);
    }
    if(url == 'evento_estadisticas_sostenibilidad'){
      this.cargarEvento(35, 35);
    }
	if(url == 'evento_estadisticas_feoracle'){
      this.cargarEvento(36, 36);
    }
	if(url == 'evento_estadisticas_cima'){
      this.cargarEvento(37, 37);
    }	
	if(url == 'evento_estadisticas_bvc_cali'){
      this.cargarEvento(38, 38);
    }	
	if(url == 'evento_estadisticas_planeacion_policia'){
      this.cargarEvento(40, 40);
    }	
	if(url == 'evento_estadisticas_cannabis'){
      this.cargarEvento(41, 41);
    }
	if(url == 'evento_estadisticas_seguridad_inteligente'){
      this.cargarEvento(44, 44);
    }	
	if(url == 'evento_estadisticas_democracia'){
      this.cargarEvento(46, 46);
    }
	if(url == 'evento_estadisticas_educacion_ambiental'){
      this.cargarEvento(47, 47);
    }
	if(url == 'evento_estadisticas_colombia_rural'){
      this.cargarEvento(48, 48);
    }
	if(url == 'evento_estadisticas_diabetes'){
      this.cargarEvento(50, 50);
    }
	if(url == 'evento_estadisticas_policia'){
      this.cargarEvento(51, 51);
    }	
	if(url == 'evento_estadisticas_nutricion'){
      this.cargarEvento(52, 52);
    }
	if(url == 'evento_estadisticas_ptar'){
      this.cargarEvento(54, 54);
    }
	if(url == 'evento_estadisticas_energetico'){
      this.cargarEvento(56, 56);
    }
    if(url == 'evento_estadisticas_region_central'){
      this.cargarEvento(63, 63);
    }
    if(url == 'evento_estadisticas_defender'){
      this.cargarEvento(66, 66);
    }
    if(url == 'evento_estadisticas_arte_bolivar'){
      this.cargarEvento(68, 69);
    }
    if(url == 'evento_estadisticas_investigar'){
      this.cargarEvento(72, 73);
    }
    if(url == 'evento_estadisticas_canal_digital'){
      this.cargarEvento(73, 74);
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
