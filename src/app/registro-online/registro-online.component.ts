import { Component, OnInit } from '@angular/core';
import { isUndefined } from 'util';
import { Asistente } from '../asistente';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { ConfiguracionEvento } from '../configuracionEvento';
import { RegistroService } from '../registro.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro-online',
  templateUrl: './registro-online.component.html',
  styleUrls: ['./registro-online.component.css']
})
export class RegistroOnlineComponent implements OnInit {
  nuevoAsistente: Asistente;
  camposEvento: CampoEvento[];
  mensajes: string[];
  errores: string[];
  nuevo: boolean;

  constructor(private route: ActivatedRoute,
    private registroService: RegistroService, 
    public config: ConfiguracionEvento) { }

  ngOnInit() {
	let url = this.route.snapshot.url.toString();
    if(url == 'registro-online'){
      this.cargarEvento(5, 4);
    }
    if(url == 'registro-plus-superior'){
      this.cargarEvento(7, 6);
    }
	if(url == 'registro-foros-semana'){
      this.cargarEvento(10, 9);
    }
	if(url == 'registro-coosalud-bucaramanga'){
      this.cargarEvento(14, 13);
    }
	if(url == 'registro-autonomia-medica'){
      this.cargarEvento(15, 14);
    }
	if(url == 'registro-foro-columnistas'){
      this.cargarEvento(16, 15);
    }
	if(url == 'registro-foro-mujeres'){
      this.cargarEvento(18, 17);
    }
	if(url == 'registro-coosalud-cali'){
      this.cargarEvento(20, 20);
    }
	if(url == 'registro-coosalud-bogota'){
      this.cargarEvento(23, 23);
    }
	if(url == 'registro-rio-bogota'){
      this.cargarEvento(24, 24);
    }
	if(url == 'registro-prosegur'){
      this.cargarEvento(29, 29);
    }
    this.cargarCamposEvento();
	this.nuevo = true;
  }

  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }
  
  cargarCamposEvento(): void {
    this.config.getCamposEventoWeb().subscribe(camposEvento => {
      this.camposEvento = camposEvento;
    });
  }

  crearRegistro(criterio: string): void{
	this.nuevo = true;
    this.mensajes = [];
    this.errores = [];
	this.nuevoAsistente = new Asistente();
	this.nuevoAsistente.nuevo = true;
    criterio = criterio.trim();
    if (!criterio) { 
      this.errores.push("Debe ingresar un número");
	  return;
    }
    if(isNaN(parseInt(criterio)) || parseInt(criterio).toString() != criterio){
      this.errores.push("Debe ingresar un número");
	  return;
    }
    this.registroService.getAsistenteOnline(parseInt(criterio))
    .subscribe(asistente =>{
      if(isUndefined(asistente.identificacion)){
		//Para eventos abiertos no se debe mostrar
        //this.errores.push("La cédula ingresada no fue encontrada");
        this.nuevo = true;
      }else{
        this.nuevo = false;
        this.mensajes.push("El asistente " + asistente.identificacion + " fue encontrado en nuestra base de datos");
      }
      if(asistente.registrado){
        this.errores.push("El asistente ya se encuentra registrado");
		return;
      }
      if(this.nuevo){
        this.nuevoAsistente = new Asistente();
        this.nuevoAsistente.identificacion = parseInt(criterio);
        this.nuevoAsistente.registrado = false;
        this.nuevoAsistente.preinscrito = false;
		this.nuevoAsistente.nuevo = true;
        this.nuevoAsistente.atributos = new Array<AtributoAsistente>();
        this.camposEvento.forEach(campoEvento => {
          var atributo = new AtributoAsistente();  
          atributo.idcampo = campoEvento.id;
          atributo.nombre = campoEvento.nombre;
          this.nuevoAsistente.atributos.push(atributo); 
        });
      }
      else{
        this.nuevoAsistente = asistente;
		this.nuevoAsistente.nuevo = false;
      }
	  if(this.config.variables.idevento == 16){
		if(this.nuevo){
			
		}else{
			document.getElementById("openModalButton").click();	
		}
	  }else{
		document.getElementById("openModalButton").click();
	  }
    });  
  }
}
