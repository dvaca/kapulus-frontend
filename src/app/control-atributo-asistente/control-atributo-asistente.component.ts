import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { TipoCampo } from '../enums';

@Component({
  selector: 'app-control-atributo-asistente',
  templateUrl: './control-atributo-asistente.component.html',
  styleUrls: ['./control-atributo-asistente.component.css']
})
export class ControlAtributoAsistenteComponent implements OnInit, OnChanges {
  @Input() atributo: AtributoAsistente;
  @Input() camposEvento: CampoEvento[];
  private campo: CampoEvento;
  private tipoCampo: TipoCampo;

  constructor() { }

  ngOnInit() {
    this.cargarCampo();
  }

  ngOnChanges() {
    this.cargarCampo();
  }

  cargarCampo(): void {
    this.campo = this.camposEvento.filter(x => x.id == this.atributo.idcampo)[0];
  }

}
