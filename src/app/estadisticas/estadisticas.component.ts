import { Component, OnInit } from '@angular/core';
import { Asistente } from '../asistente';
import { RegistroService } from '../registro.service';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Chart, ChartConfiguration } from 'chart.js';
import { ConfiguracionEvento } from '../configuracionEvento';
import { CampoEvento } from '../camposevento';
import { EstadisticasService } from '../estadisticas.service';
import { Zona } from '../zona';
import { ConteoZonaOperacion } from '../conteoZonaOperacion';
import { Operacion } from '../enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  camposEvento: CampoEvento[];
  camposEstadisticas: CampoEvento[];
  totalAsistentes: number;
  asistentesRegistrados: number;
  asistentesNoRegistrados: number;
  certificadosEntregados: number;
  zonaSeleccionada: Zona;
  zonas: Zona[];
  conteoZonaOperacion: ConteoZonaOperacion[];

  constructor(private route: ActivatedRoute, 
    private registroService: RegistroService, 
    private estadisticasService: EstadisticasService,
    private config: ConfiguracionEvento) { }

  ngOnInit() {
	let url = this.route.snapshot.url.toString();
    if(url == 'callcenter_token_7D5H3N9Y4F'){
      this.cargarEvento(5, 4);
    }
    if(url == 'callcenter_token_4B5O2S8Z0L'){
      this.cargarEvento(6, 5);
    }
	if(url == 'callcenter_token_1T9Y7X1M9A'){
      this.cargarEvento(7, 6);
    }
	if(url == 'callcenter_estadisticas_cerveza'){
      this.cargarEvento(8, 7);
    }
	if(url == 'callcenter_estadisticas_orquideas'){
      this.cargarEvento(9, 8);
    }
	if(url == 'callcenter_estadisticas_semana'){
      this.cargarEvento(10, 9);
    }
	if(url == 'callcenter_estadisticas_cartagena'){
      this.cargarEvento(11, 10);
    }
	if(url == 'callcenter_estadisticas_coosalud'){
      this.cargarEvento(12, 11);
    }
	if(url == 'callcenter_estadisticas_coosalud_bquilla'){
      this.cargarEvento(13, 12);
    }
	if(url == 'callcenter_estadisticas_coosalud_bmanga'){
      this.cargarEvento(14, 13);
    }
	if(url == 'callcenter_estadisticas_autonomia_medica'){
      this.cargarEvento(15, 14);
    }
	if(url == 'callcenter_estadisticas_columnistas'){
      this.cargarEvento(16, 15);
    }
	if(url == 'callcenter_estadisticas_coosalud_medellin'){
      this.cargarEvento(17, 16);
    }
	if(url == 'callcenter_estadisticas_mujeres'){
      this.cargarEvento(18, 17);
    }
	if(url == 'callcenter_estadisticas_coosalud_cali'){
      this.cargarEvento(20, 20);
    }
	if(url == 'callcenter_estadisticas_movilidad'){
      this.cargarEvento(21, 21);
    }
	if(url == 'callcenter_estadisticas_contraloria'){
      this.cargarEvento(22, 22);
    }
	if(url == 'callcenter_estadisticas_coosalud_bogota'){
      this.cargarEvento(23, 23);
    }
	if(url == 'callcenter_estadisticas_rio_bogota'){
      this.cargarEvento(24, 24);
    }
	if(url == 'callcenter_estadisticas_oracle'){
      this.cargarEvento(25, 25);
    }
	if(url == 'callcenter_estadisticas_ied'){
      this.cargarEvento(28, 28);
    }
	if(url == 'callcenter_estadisticas_prosegur'){
      this.cargarEvento(29, 29);
    }
	if(url == 'callcenter_estadisticas_seloquecomo'){
      this.cargarEvento(30, 30);
    }
	if(url == 'callcenter_estadisticas_copnia'){
      this.cargarEvento(33, 33);
    }
	if(url == 'callcenter_estadisticas_juegos'){
      this.cargarEvento(34, 34);
    }
	if(url == 'callcenter_estadisticas_sostenibilidad'){
      this.cargarEvento(35, 35);
    }
	if(url == 'callcenter_estadisticas_feoracle'){
      this.cargarEvento(36, 36);
    }
	if(url == 'callcenter_estadisticas_feoracle2'){
      this.cargarEvento(39, 39);
    }
	if(url == 'callcenter_estadisticas_planeacion_policia'){
      this.cargarEvento(40, 40);
    }
    this.cargarZonas();
    this.cargarCamposEvento();
  }

  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }
  
  cargarCamposEvento(): void {
    this.config.getCamposEvento().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
      this.cargarEstadisticas();
    });
  }

  cargarZonas(): void {
    this.config.getZonas().subscribe(zonas => {
      this.zonas = zonas;
    });
  }

  exportar(): void{
    try{ 
      var asistentesExcel: Asistente[];
      var registros = new Array<Array<any>>();
      var titulos : Array<String>;
      titulos = ["Identificación","Registrado","Preinscrito","Actualizado","Registro Online",
      "Fecha Creación", "Hora Creación", "Fecha Invitación","Hora Invitación", "Fecha Ingreso Online","Hora Ingreso Online"];
      this.registroService.getAsistentes("")
      .subscribe(asistentes =>{asistentesExcel = asistentes;
          for(var i=0;i<asistentesExcel.length;i++){
            var linea = new Array();
            linea.push(asistentesExcel[i].identificacion);
            linea.push(asistentesExcel[i].registrado?"SI":"NO");
            linea.push(asistentesExcel[i].preinscrito?"SI":"NO");
            linea.push(asistentesExcel[i].actualizado?"SI":"NO");
			linea.push(asistentesExcel[i].online?"SI":"NO");
			if(asistentesExcel[i].fechacreacion == null){
              linea.push("");
              linea.push("");
            }else{
              linea.push(asistentesExcel[i].fechacreacion.split("T")[0]);
              linea.push(asistentesExcel[i].fechacreacion.split("T")[1].split("Z")[0]);
            }
            if(asistentesExcel[i].fechainvitacion == null){
              linea.push("");
              linea.push("");
            }else{
              linea.push(asistentesExcel[i].fechainvitacion.split("T")[0]);
              linea.push(asistentesExcel[i].fechainvitacion.split("T")[1].split("Z")[0]);
            }
			if(asistentesExcel[i].fechaingresoonline == null){
              linea.push("");
              linea.push("");
            }else{
              linea.push(asistentesExcel[i].fechaingresoonline.split("T")[0]);
              linea.push(asistentesExcel[i].fechaingresoonline.split("T")[1].split("Z")[0]);
            }
            for(var j=0;j<asistentesExcel[i].atributos.length;j++){
              if(asistentesExcel[i].atributos[j].valor == null){
                linea.push("");        
              }else{
                linea.push(asistentesExcel[i].atributos[j].valor);        
              }
              if(i == 0){
                titulos.push(asistentesExcel[i].atributos[j].nombre);
              }
            } 
            registros.push(linea);
          }
          var options = { 
            fieldSeparator: ',',
            showLabels: true, 
            headers: titulos,
            showTitle: true,
            title: "Registro de Asistentes"
          };
          new Angular2Csv(registros, 'Registro de Asistentes', options);
        });
    }catch(error){
      alert(error);
    }
  }

  cargarEstadisticas(): void{
    //Registrados
    this.estadisticasService.getEstadisticasRegistrados()
      .subscribe(estadisticas =>{var datos = estadisticas;
        var categorias = new Array<string>();
        var valores = new Array<number>();
        this.totalAsistentes = 0;

        for(let i=0; i< datos.length; i++){
          categorias.push(datos[i].registrado ? "Registrado" : "No Registrado");
          if(datos[i].registrado){
            this.asistentesRegistrados= datos[i].cuenta;
          }else{
            this.asistentesNoRegistrados= datos[i].cuenta;
          }
          this.totalAsistentes += parseInt(datos[i].cuenta);
          valores.push(datos[i].cuenta);
        }
        EstadisticasComponent.graficarEstadisticas(categorias, valores, "Registrados", "chartRegistrados", "doughnut");
      });
    //Asistentes
    this.estadisticasService.getEstadisticasAsistentes()
      .subscribe(estadisticas =>{var datos = estadisticas;
        var categorias = new Array<string>();
        var valores = new Array<number>();

        for(let i=0; i< datos.length; i++){
          categorias.push(datos[i].preinscrito ? "Preinscritos" : "Nuevos");
          valores.push(datos[i].cuenta);
        }
        EstadisticasComponent.graficarEstadisticas(categorias, valores, "Asistentes", "chartAsistentes", "doughnut");
      });
    //Actualizados
    this.estadisticasService.getEstadisticasActualizados()
      .subscribe(estadisticas =>{var datos = estadisticas;
        var categorias = new Array<string>();
        var valores = new Array<number>();

        for(let i=0; i< datos.length; i++){
          categorias.push(datos[i].actualizado ? "Actualizados" : "No Actualizados");
          valores.push(datos[i].cuenta);
        }
        EstadisticasComponent.graficarEstadisticas(categorias, valores, "Actualizados", "chartActualizados", "doughnut");
      });
    //TimeLine Registrados
    this.estadisticasService.getTimeLineRegistrados()
      .subscribe(estadisticas =>{var datos = estadisticas;
        let categorias = new Array<string|string[]>();
        let valores = new Array<Array<number>>();
        let registrados = new Array<number>();
        let escarapelas = new Array<number>();
        let certificados = new Array<number>();
        let diaAnterior = "";
        let categoria: string|string[];
        for(let i=0; i< datos.length; i++){
          if(datos[i].dia != diaAnterior){
            categoria = [datos[i].hora, datos[i].dia];
          }else{
              categoria = datos[i].hora;
          }
          categorias.push(categoria);
          registrados.push(datos[i].registrados);
          escarapelas.push(datos[i].escarapelas);
          certificados.push(datos[i].certificados);
          diaAnterior = datos[i].dia;
        }
        valores = [registrados, escarapelas, certificados];
        EstadisticasComponent.graficarTimeLine(categorias, valores, "Registrados por día", 
          ["Registrados", "Escarapelas", "Certificados"], "chartLineaTiempo", ["bar", "line", "line"]);
      });
    //Certificados
    this.estadisticasService.getEstadisticasCertificados()
      .subscribe(estadisticas =>{var datos = estadisticas;
        var categorias = new Array<string>();
        var valores = new Array<number>();

        for(let i=0; i< datos.length; i++){
          this.certificadosEntregados = datos[i].cuenta;
        }
      });
    //Operaciones por zona
    this.actualizarOperacionesZonas();

    //Campos marcados para estadisticas
    this.camposEstadisticas = this.camposEvento.filter(campo => campo.estadisticas == true);
    //TimeLine Zonas
    this.zonas.forEach(zona => {
      if(zona.validaentrada == true || zona.validasalida == true || zona.entregaregalo == true){
        this.actualizarTimeLineZonas(zona);
      }
    });
  }

  actualizarTimeLineZonas(zona: Zona): void{
    this.estadisticasService.getTimeLineZonas(zona)
    .subscribe(estadisticas =>{var datos = estadisticas;
      this.zonaSeleccionada = zona;
      let categorias = new Array<string|string[]>();
      let valores = new Array<Array<number>>();
      let entradas = new Array<number>();
      let actuales = new Array<number>();
      let entregas = new Array<number>();
      let diaAnterior = "";
      let categoria: string|string[];
      let labels: string[];
      for(let i=0; i< datos.length; i++){
        if(datos[i].dia != diaAnterior){
          categoria = [datos[i].hora, datos[i].dia];
        }else{
            categoria = datos[i].hora;
        }
        categorias.push(categoria);
        entradas.push(datos[i].entradasdistintos);
        let resta = datos[i].entradas - datos[i].salidas; 
        actuales.push(resta);
        entregas.push(datos[i].entregasdistintos);
        diaAnterior = datos[i].dia;
      }

      if(this.zonaSeleccionada.validaentrada == true){
        if(this.zonaSeleccionada.validasalida == true){
          valores = [entradas, actuales];
          labels = ["Entradas", "Actuales"];
        }else{
          valores = [entradas];
          labels = ["Entradas"];
        }
      }
      if(this.zonaSeleccionada.entregaregalo == true){
        valores = [entregas];
        labels = ["Entregas"];
      }
      
      EstadisticasComponent.graficarTimeLine(categorias, valores, "Asistencia por Zona", 
        labels, "chartLineaTiempoZonas" + this.zonaSeleccionada.id.toString(), ["bar", "bar", "bar"]);
    });
  }

  actualizarOperacionesZonas(): void {
    this.conteoZonaOperacion = new Array<ConteoZonaOperacion>();
    this.estadisticasService.getEstadisticasOperacion()
    .subscribe(estadisticas => { 
      this.zonas.forEach(zonaActual => {
        let conteo = new ConteoZonaOperacion();
        conteo.zona = zonaActual;
        if(zonaActual.validaentrada == true || zonaActual.validasalida == true){
          let datos = estadisticas.filter(x => x.idoperacion == Operacion.Entrada && x.idzona == zonaActual.id);
          let entradas = datos[0].cuenta;
          conteo.totalIngresos = datos[0].cuentadistintos;
          if(zonaActual.validasalida){
            datos = estadisticas.filter(x => x.idoperacion == Operacion.Salida && x.idzona == zonaActual.id);
            conteo.totalActualZona = entradas - datos[0].cuenta;
          }
          this.conteoZonaOperacion.push(conteo);
        }
        if(zonaActual.entregaregalo == true){
          let datos = estadisticas.filter(x => x.idoperacion == Operacion.Entrega && x.idzona == zonaActual.id);
          conteo = new ConteoZonaOperacion();
          conteo.zona = zonaActual;
          conteo.totalEntregas = datos[0].cuentadistintos;
          this.conteoZonaOperacion.push(conteo);
        }
      });
    });
  }
  
  public static graficarEstadisticas(categorias: Array<string | string[]>, valores: Array<number>, titulo: string, canvas: string, tipoGrafico: string): void{
    try{
      let options: ChartConfiguration;
      options = {};
      options.type = tipoGrafico;
      options.data = {
          labels: categorias,
          datasets: [{
              label: titulo,
              data: valores,
              backgroundColor: [
                  'rgba(95, 230, 103, 0.6)',
                  'rgba(245, 98, 103, 0.6)',
                  'rgba(54, 162, 235, 0,6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(5, 198, 103, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
              ],
              borderColor: [
                  'rgba(95, 230, 103, 1)',
                  'rgba(245, 98, 103, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(5, 198, 103, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      };
      options.options = {
        responsive : false,
        title: {
          display: true,
          text: titulo,
          fontSize: 16
        },
        circumference: 1.2 * Math.PI,
        rotation: -1.1 * Math.PI        
      };
      let myChart = new Chart(canvas, options);
    }catch(error){
      alert(error);
    }
  }

  public static graficarTimeLine(
    categorias: Array<string | string[]>, 
    valores: Array<Array<number>>, 
    titulo: string, 
    series: string[], 
    canvas: string, 
    tipoGrafico: string[]): void{
    try{
      let options: ChartConfiguration;
      let i: number;
            
      let backgroundColors = [
        'rgba(95, 230, 103, 0.6)',
        'rgba(245, 98, 103, 0.6)',
        'rgba(54, 162, 235, 0,6)'
      ];
      let borderColors = [
        'rgba(95, 230, 103, 1)',
        'rgba(245, 98, 103, 1)',
        'rgba(54, 162, 235, 1)'
      ];
      options = {};
      options.type = "bar";
      options.data = {
          labels: categorias,
          datasets: []
      };
      for(i=0; i<valores.length; i++){
        let dataset = {
          label: series[i],
          data: valores[i],
          type: tipoGrafico[i],
          borderColor: borderColors[i],
          backgroundColor: backgroundColors[i],
          borderWidth: 1
        }
        options.data.datasets.push(dataset);
      }
      
      options.options = {
        responsive : false,
        title: {
          display: true,
          text: titulo,
          fontSize: 16
        }
      };
      let myChart = new Chart(canvas, options);
    }catch(error){
      alert(error);
    }
  }
}
