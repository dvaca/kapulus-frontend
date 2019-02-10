import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { TipoCampo, TipoDato } from '../enums';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-control-atributo-asistente',
  templateUrl: './control-atributo-asistente.component.html',
  styleUrls: ['./control-atributo-asistente.component.css'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ControlAtributoAsistenteComponent implements OnInit, OnChanges {
  @Input() atributo: AtributoAsistente;
  @Input() camposEvento: CampoEvento[];
  public campo: CampoEvento;
  public tipoCampo: TipoCampo;
  private tiposCampo = TipoCampo;
  private tiposDato = TipoDato;

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
