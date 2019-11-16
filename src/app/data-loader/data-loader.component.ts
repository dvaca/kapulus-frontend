import { EventManagerService } from './../event-manager/event-manager.service';
import { DataLoaderService } from './data-loader.service';

import { OnInit, Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { KEvent } from '../event-manager/event-manager.static';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { Type } from '@angular/compiler/src/output/output_ast';
declare var jQuery: any;


@Component({
  selector: 'dataloader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css']
})




export class DataLoaderComponent implements OnInit {
  private backendUrl = environment.URLBack;
  eventId = 0;
  event: KEvent;
  private events: any;
  files: any;
  processResponse: any = {};
  active: number;
  activeColumn: number;
  selectedFile: any;
  settings: any;
  settingsForm: FormGroup;
  mergeColumns: FormArray;
  customColumnName: string;
  message: string;
  messageType: string;
  inProcess: boolean;

  @ViewChild("toastMessage", { read: ElementRef }) toastMessage: ElementRef;


  onClick(index: number) {
    this.active = index;
    this.selectedFile = this.files[index];
  }

  onClickColumn(index: number) {
    this.activeColumn = index;
  }

  constructor(private fb: FormBuilder, private dataLoaderService: DataLoaderService, private router: Router,
    private route: ActivatedRoute, private eventManagerService: EventManagerService) {


  }

  ngOnInit(): void {
    this.inProcess = true;
    this.route.params.subscribe(params => {
      this.eventId = params.eventId;
      console.log(this.eventId);
    });

    this.loadEvent();
    this.loadFiles();

  }

  private loadEvent() {
    this.eventManagerService.getEvent(this.eventId).subscribe(data => {
      this.event = data;
      this.initSettingsForm();
      this.loadSettingsForEdit();
      console.log(this.event);
      this.inProcess = false;
    });
  }

  private loadFiles() {
    this.dataLoaderService.getFiles(this.eventId).subscribe(data => {
      this.files = data;
      this.onClick(0);
      console.log(JSON.stringify(this.events));
    });
  }

  /**Init the settings */
  private initSettingsForm() {
    this.settingsForm = this.fb.group({
      mergeColumns: this.fb.array([this.columns]),
    });

  }


  get columns(): FormGroup {
    return this.fb.group({
      allowedValues: this.fb.array([this.allowedValues]),
      index: '',
      order: '',
      name: '',
      description: '',
      id: '',
      filter: '',
      statistics: ''
    });
  }

  get allowedValues(): FormGroup {
    return this.fb.group({
      name: ''
    });
  }


  addAllowedValue(column) {
    let control = <FormArray>column.get("allowedValues");
    column.value.allowedValues = [];
    control.push(
      this.fb.group({
        name: [''],
      })
    )
  }

  dellAllowedValue(column, index) {
    let control = <FormArray>column.get("allowedValues");
    control.removeAt(index);
  }



  loadSettingsForEdit(): void {
    if (this.event.settings != undefined) {
      this.settings = JSON.parse(this.event.settings);
      this.settingsForm.patchValue(this.settings);
      this.setValidColumns(this.settings);
      this.settingsForm.markAsDirty;

    }
  }


  setValidColumns(processResponse) {
    const mergeColumnsArray = this.settingsForm.get("mergeColumns") as FormArray;
    mergeColumnsArray.removeAt(0);
    processResponse.mergeColumns.map(validColumn => {
      var column = this.fb.group({
        allowedValues: this.fb.array([this.allowedValues]),
        index: '',
        order: '',
        name: '',
        description: '',
        id: '',
        filter: '',
       statistics: ''
      }) ;
      column.patchValue(validColumn);
      //Second Level
      const allowedValuesArray = column.get("allowedValues") as FormArray;
      allowedValuesArray.removeAt(0);
      validColumn.allowedValues.map(allowedValue => {
        var allowed = this.fb.group({
          name: ''
        });
        allowed.patchValue(allowedValue);
        allowedValuesArray.push(allowed);
      });
      mergeColumnsArray.push(column);
    });
  }


  onUploadFile() {
    this.loadFiles();
  }

  processFile(selectedFile) {
    console.debug(JSON.stringify(selectedFile));
    var object = {
      'eventId': selectedFile.event_id, 'storageId': selectedFile.storage_id,
      'extension': selectedFile.extension
    };
    this.dataLoaderService.processFile(object).subscribe(data => {
      selectedFile.processResponse = data.resume;
      this.loadEvent();
      this.showMessage("Archivo Procesado Exitosamente", 'success');
      console.log('ProcessResponse' + JSON.stringify(selectedFile.processResponse));
    });
    this.onClickColumn(0);

  }

  updateEvent() {
    if (this.event != null) {
      this.event.settings = this.selectedFile.processResponse;
      console.log("Event" + this.event);
      this.dataLoaderService.updateEvent(this.event).subscribe(res => {
        console.debug('Update Response:' + res);
      })
    }
  }

  saveFile() {
    console.log("SettingsForm Value" + this.settingsForm.value);
    //fileSettings[this.selectedFile.storage_id] = this.settingsForm.value;
    var settingsColumns = this.settingsForm.value.mergeColumns;
    this.settings.mergeColumns = settingsColumns;
    this.event.settings = this.settings;
    this.dataLoaderService.updateEvent(this.event).subscribe(res => {
      console.debug('Update Response:' + res);
      this.showMessage("Configuración Guardada Exitosamente", 'success');
    })
  }


  toDatabase(selectedFile) {
    var object = { 'storageId': selectedFile.storage_id };
    this.dataLoaderService.toDatabase(object).subscribe(
      result => {
        console.log('Upload Data response:' + JSON.stringify(result));
        this.showMessage("Datos cargados exitosamente", "success");
      },
      (err: string) => {
        this.showMessage("Error al Cargar la base de datos, Valide la configuración e intente nuevamente.",
          "warning");
      });
      this.loadEvent();

  }

  deleteDataLoaded(selectedFile) {
    var object = { 'storageId': selectedFile };
    this.dataLoaderService.deleteDataLoaded(object).subscribe(data => {
      console.log('Delete Data response:' + JSON.stringify(data));
      this.showMessage("Datos eliminados exitosamente.",
        "success");
      this.loadEvent();
    });
  }

  deleteStorage(selectedFile) {
    var object = { 'storageId': selectedFile.storage_id };
    this.dataLoaderService.deleteStorage(object).subscribe(data => {
      console.log('ProcessResponse' + JSON.stringify(data));
      this.settings[selectedFile.storage_id] = null;
      this.event.settings = this.settings;
      this.dataLoaderService.updateEvent(this.event).subscribe(res => {
        console.debug('Update Response:' + res);
      })
      this.loadFiles();
    });
  }

  showMessage(message, type) {
    this.message = message;
    this.messageType = type;
    jQuery('#toast').show();
  }

}
