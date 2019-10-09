import { Component, OnInit} from '@angular/core';
import { Asistente } from '../asistente';
import { RegistroService } from '../registro.service';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { ConfiguracionEvento } from '../configuracionEvento';
import { Impresora } from '../impresora';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  asistentes: Asistente[];
  selectedAsistente: Asistente;
  camposEvento: CampoEvento[];
  popUpNuevo: boolean;
  nuevoRegistro: boolean;
  criterioBusqueda: string;
  impresoras: Impresora[];
  impresoraSeleccionada: Impresora;

  constructor( private route: ActivatedRoute, 
    private registroService: RegistroService, 
    private config: ConfiguracionEvento) { 
  }

  ngOnInit() {
	let url = this.route.snapshot.url.toString();
    if(url == 'callcenter_token_9B0I4J8R2T'){
      this.cargarEvento(5, 4);
    }
    if(url == 'callcenter_token_6J2N4P6Q3K'){
      this.cargarEvento(6, 5);
    }
	if(url == 'callcenter_token_3N8P3H6V1L'){
      this.cargarEvento(7, 6);
    }
	if(url == 'callcenter_registro_cerveza'){
      this.cargarEvento(8, 7);
    }
	if(url == 'callcenter_registro_orquideas'){
      this.cargarEvento(9, 8);
    }
	if(url == 'callcenter_registro_semana'){
      this.cargarEvento(10, 9);
    }
	if(url == 'callcenter_registro_cartagena'){
      this.cargarEvento(11, 10);
    }
	if(url == 'callcenter_registro_coosalud'){
      this.cargarEvento(12, 11);
    }
	if(url == 'callcenter_registro_coosalud_bquilla'){
      this.cargarEvento(13, 12);
    }
	if(url == 'callcenter_registro_coosalud_bmanga'){
      this.cargarEvento(14, 13);
    }
	if(url == 'callcenter_registro_autonomia_medica'){
      this.cargarEvento(15, 14);
    }
	if(url == 'callcenter_registro_columnistas'){
      this.cargarEvento(16, 15);
    }
	if(url == 'callcenter_registro_coosalud_medellin'){
      this.cargarEvento(17, 16);
    }
	if(url == 'callcenter_registro_mujeres'){
      this.cargarEvento(18, 17);
    }
	if(url == 'callcenter_registro_coosalud_cali'){
      this.cargarEvento(20, 20);
    }
	if(url == 'callcenter_registro_movilidad'){
      this.cargarEvento(21, 21);
    }
	if(url == 'callcenter_registro_contraloria'){
      this.cargarEvento(22, 22);
    }
	if(url == 'callcenter_registro_coosalud_bogota'){
      this.cargarEvento(23, 23);
    }
	if(url == 'callcenter_registro_rio_bogota'){
      this.cargarEvento(24, 24);
    }
	if(url == 'callcenter_registro_oracle'){
      this.cargarEvento(25, 25);
    }
	if(url == 'callcenter_registro_ied'){
      this.cargarEvento(28, 28);
    }
	if(url == 'callcenter_registro_prosegur'){
      this.cargarEvento(29, 29);
    }
	if(url == 'callcenter_registro_seloquecomo'){
      this.cargarEvento(30, 30);
    }
	if(url == 'callcenter_registro_copnia'){
      this.cargarEvento(33, 33);
    }
	if(url == 'callcenter_registro_juegos'){
      this.cargarEvento(34, 34);
    }
	if(url == 'callcenter_registro_sostenibilidad'){
      this.cargarEvento(35, 35);
    }
	if(url == 'callcenter_registro_feoracle'){
      this.cargarEvento(36, 36);
    }
	if(url == 'callcenter_registro_feoracle2'){
      this.cargarEvento(39, 39);
    }
	if(url == 'callcenter_registro_planeacion_policia'){
      this.cargarEvento(40, 40);
    }
	if(url == 'callcenter_registro_cannabis'){
      this.cargarEvento(41, 41);
    }
	if(url == 'callcenter_registro_antinarcoticos'){
      this.cargarEvento(42, 42);
    }
	if(url == 'callcenter_registro_qlik'){
      this.cargarEvento(43, 43);
    }
    this.cargarCamposEvento();
    this.cargarImpresoras();
    this.buscarAsistente("");
    this.asistentes = new Array<Asistente>();
  }

  buscarAsistente(criterio: string): void {
    criterio = criterio.trim();
    this.criterioBusqueda = criterio;
    if (!criterio) { 
      this.popUpNuevo = false;
      return; 
    }
    //this.asistentes = this.registroService.getAsistentesMock(criterio);
    this.registroService.getAsistentes(criterio)
    .subscribe(asistentes =>{this.asistentes = asistentes;
      if(this.asistentes.length == 0){
        this.popUpNuevo = true;
        var modalNuevo = document.getElementById("botonCrear");
        modalNuevo.focus();
      }else{
        this.popUpNuevo = false;
      }});
  }

  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }
  
  cargarCamposEvento(): void {
    this.config.getCamposEvento().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
    });
  }

  cargarImpresoras(): void {
    this.config.getImpresoras().subscribe(x => this.impresoras = x);
  }

  onSelect(asistente: Asistente): void {
    this.selectedAsistente = asistente;
    this.nuevoRegistro = false;
	this.selectedAsistente.nuevo = false;
  }

  ocultar(nuevoAsistente: boolean): void {
    this.popUpNuevo = false;
	this.nuevoRegistro = false;
    if(nuevoAsistente){
      this.selectedAsistente = new Asistente();
      this.selectedAsistente.registrado = false;
      this.selectedAsistente.preinscrito = false;
      this.selectedAsistente.atributos = new Array<AtributoAsistente>();
      this.camposEvento.forEach(campoEvento => {
        var atributo = new AtributoAsistente();  
        atributo.idcampo = campoEvento.id;
        atributo.nombre = campoEvento.nombre;
        this.selectedAsistente.atributos.push(atributo); 
      });
      
      if(! isNaN(parseInt(this.criterioBusqueda))){
        this.selectedAsistente.identificacion = parseInt(this.criterioBusqueda);
      }
      this.selectedAsistente.nuevo = true;
    }else{
      this.selectedAsistente.nuevo = false;
    }
  }

  crearRegistro(): void {
    this.criterioBusqueda="";
    this.ocultar(true);
  }
  
  seleccionarImpresora(): void {
    this.config.variables.impresoraSeleccionada = this.impresoraSeleccionada;
  }
}
