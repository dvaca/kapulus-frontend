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
  }

  ocultar(nuevoAsistente: boolean): void {
    this.popUpNuevo = false;
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
      this.nuevoRegistro = true;
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
