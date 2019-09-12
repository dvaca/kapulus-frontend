import { Component, OnInit, Input } from '@angular/core';
import { Asistente } from '../asistente';
import { ConfiguracionEvento } from '../configuracionEvento';
import * as jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';  
import { ActivatedRoute } from '@angular/router';
import { RegistroService } from '../registro.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {
  @Input() asistente: Asistente;
  @Input() asistenteImpresion : Asistente;
  origen: string;
  nombreAsistente: string;
  apellidoAsistente: string;
  problemas: string[];

  constructor(private registroService: RegistroService, private route: ActivatedRoute, private config: ConfiguracionEvento) { }

  ngOnInit() {
    let url = this.route.snapshot.url.toString();  
	if(url == 'callcenter_estadisticas_copnia'){
      this.cargarEvento(33, 33);
    }
    this.route.queryParams.subscribe(parametro =>{
      this.origen = parametro["origen"];
    });
    this.problemas = [];
    this.buscarAsistente();
  }
  
  cargarEvento(idevento: number, idzona: number): void {
    this.config.cargarEvento(idevento, idzona);
  }

  buscarAsistente() {
    this.registroService.getAsistenteControlAcceso(this.origen)
    .subscribe(asistente =>{this.asistente = asistente;
      if(isUndefined(this.asistente.identificacion)){
        this.problemas.push("La cédula " + this.origen + " no fue encontrada dentro de los asistentes al evento");
        return;
      }
      if(this.asistente.registrado == false){
        this.problemas.push("La cédula " + this.origen + " no fue encontrada como registrada en el evento");
        return;
      }
      this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER NOMBRE")
        .subscribe(nombre => {
          this.nombreAsistente = nombre.valor;
          this.registroService.getAsistenteAtributo(this.asistente.identificacion, "PRIMER APELLIDO")
          .subscribe(apellido => {
            this.apellidoAsistente = apellido.valor;
          });
        });
      });
  }

  imprimirCertificado(){
    var pdf = new jsPDF();
    try{
    //var fondo = fs.readFileSync('../assets/resources/LogoLegis.png');
    /*
    doc.text('Hello world!', 10, 10);
    doc.save('a4.pdf');
    */
    var source = document.getElementById("formCertificadoImprimir");//.innerHTML;
    html2canvas(source).then(canvas => {  
      // Few necessary setting options  
      //var imgWidth = 208;   
      var imgWidth = 600;   
      //var pageHeight = 295;    
      var pageHeight = 300;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      const contentDataURL = canvas.toDataURL('image/png');   
      //pdf = new jsPDF('l', 'mm', 'letter'); // A4 size page of PDF  
      pdf = new jsPDF('l', 'px', 'letter'); // A4 size page of PDF  
      var position = 20;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);  
      pdf.output("dataurlnewwindow");
      pdf.save('Certificado de Asistencia.pdf');
    });  
    /*this.registroService.cargarFondo(source)
    .subscribe(fondo => {
      alert(source);
      pdf.fromHTML(
          source,
          15,
          15,
          {
            'width': 180//,'elementHandlers': elementHandler
          });
          alert("1");
      pdf.addImage(fondo, 'PNG', 0, 0, 300, 400); 
      alert("2");
      pdf.output("dataurlnewwindow");
      alert("3");
      pdf.save('Certificado de Asistencia.pdf');
      alert("4");
    });
    */
  }catch(error){
    alert(error);
  }
  }

}
