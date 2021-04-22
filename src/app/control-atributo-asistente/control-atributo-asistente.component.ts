import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AtributoAsistente } from '../atributosasistente';
import { CampoEvento } from '../camposevento';
import { TipoCampo, TipoDato } from '../enums';
import { ControlContainer, NgForm } from '@angular/forms';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-control-atributo-asistente',
  templateUrl: './control-atributo-asistente.component.html',
  styleUrls: ['./control-atributo-asistente.component.css']
  /*,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]*/
})
export class ControlAtributoAsistenteComponent implements OnInit, OnChanges {
  @Input() atributo: AtributoAsistente;
  @Input() camposEvento: CampoEvento[];
  @Input() validar: boolean;
  @Input() atributosForm: FormGroup;
  camposEventoForm;
  
  public campo: CampoEvento;
  public tipoCampo: TipoCampo;
  public tiposCampo = TipoCampo;
  public tiposDato = TipoDato;

  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cargarCampo();
    this.loadValidator();
    this.onChanges();
  }

  loadValidator(){
    //this.camposEventoForm = this.atributosForm.get('camposEvento');
    console.log('Atributo'+JSON.stringify(this.atributo));
    console.log(this.camposEvento);


    this.camposEvento.map(campo=>{
      this.atributosForm.addControl(campo.nombre,new FormControl('', []));

      var control = this.atributosForm.get(campo.nombre);
      if( campo.obligatorio==true){
        control.setValidators([Validators.required]);
      }
      if( campo.tipodato == this.tiposDato.Correo){
        control.setValidators([Validators.email]);
      }
      if(campo.nombre == this.campo.nombre){
      control.setValue(this.atributo.valor);
      }
    });
    
  }

  ngOnChanges() {
    this.cargarCampo();
  }

  cargarCampo(): void {
    this.campo = this.camposEvento.filter(x => x.id == this.atributo.idcampo)[0];
  }

  onChanges(): void {

}

}
