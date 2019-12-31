import { EventManagerService } from './../event-manager/event-manager.service';
import { DataLoaderService } from './data-loader.service';
import { OnInit, Component, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { KEvent } from '../event-manager/event-manager.static';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
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
  files: any = [];
  processResponse: any = {};
  active: number = 0;
  activeColumn: number;
  selectedFile: any;
  settings: any;
  settingsForm: FormGroup = new FormGroup({});
  mergeColumns: FormArray;
  customColumnName: string;
  message: string;
  messageType: string;
  inProcess: boolean;
  loadingData: boolean = false;
  fileOptionsAvailable = { "process": false, "load": false, "deleteData": false, "deleteFile": false };

  @ViewChild("toastMessage", { read: ElementRef }) toastMessage: ElementRef;


  onClick(index: number) {
    this.active = index;
    this.selectedFile = this.files[index];
    this.navManager();
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
    this.onClick(0);

  }



  private loadEvent() {
    this.eventManagerService.getEvent(this.eventId).subscribe(data => {
      this.event = data;
      this.initSettingsForm();
      this.loadSettingsForEdit();
      console.log(JSON.stringify(this.event));
      this.inProcess = false;
      this.onChanges();
      this.navManager();
    });
  }

  private loadFiles() {
    this.dataLoaderService.getFiles(this.eventId).subscribe(data => {
      this.files = data;
      this.onClick(0);
      console.log(JSON.stringify(this.events));
    });
    this.navManager();
  }

  /**Init the settings */
  private initSettingsForm() {
    this.settingsForm = this.fb.group({
      mergeColumns: this.fb.array([this.columns]),
    });

  }


  get columns(): FormGroup {
    return this.fb.group({
      allowedValues: this.fb.array([]),
      index: '',
      order: '',
      name: '',
      description: '',
      id: '',
      filter: '',
      statistics: '',
      required: false,
    });
  }

  get allowedValues(): FormGroup {
    return this.fb.group([]);
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
    if (this.event.settings != undefined && this.event.settings != "") {
      this.settings = JSON.parse(this.event.settings);
      this.settingsForm.patchValue(this.settings);
      this.setValidColumns(this.settings);
      this.settingsForm.markAsDirty;

    }
  }

  onChanges(): void {
    this.settingsForm.valueChanges.subscribe(val => {
      this.saveFile();
    });
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
        statistics: '',
        required: false
      });
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
      this.showMessage("Archivo Procesado Exitosamente", 'success');
      console.log('ProcessResponse' + JSON.stringify(selectedFile.processResponse));
      this.loadEvent();
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

  updateEventFields() {
    this.dataLoaderService.updateEventFields(this.event).subscribe(
      res => {
        this.showMessage("La configuración del evento fue actualizada exitosamente.", "success");
        this.settingsForm.markAsPristine();
      },
      (err: any) => {
        this.showMessage("Error al actualizar la configuración del evento", "warning");
        this.settingsForm.markAsPristine();
      }
    );
  }

  saveFile() {
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
    this.loadingData = true;
    this.dataLoaderService.toDatabase(object).subscribe(
      result => {
        console.log('Upload Data response:' + JSON.stringify(result));
        this.showMessage(result.message + " Registros Exitosos:" + result.success +
          " Registros Fallidos:" + result.errors, "success");
        this.loadEvent();
        this.loadingData = false;
      },
      (err: any) => {
        var message = "Error al Cargar la base de datos, Valide la configuración e intente nuevamente. ";
        if (err.error != undefined) {
          message = message.concat(err.error.message);
          this.loadingData = false;
        }
        this.showMessage(message, "warning");
        this.loadEvent();
        this.onClick(0);

      });


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
      //this.settings[selectedFile.storage_id] = null;
      this.event.settings = '';
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

  navManager() {
    this.fileOptionsAvailable.process = false;
    this.fileOptionsAvailable.load = false;
    this.fileOptionsAvailable.deleteData = false;
    this.fileOptionsAvailable.deleteFile = false;
    if (this.selectedFile != undefined) {
      if (this.settings != undefined) {
        var settingsFile = this.settings[this.selectedFile.storage_id];
        if (settingsFile != undefined) {
          if (settingsFile.status != undefined) {
            if (settingsFile.status == 'Procesado') {
              this.fileOptionsAvailable.load = true;
              this.fileOptionsAvailable.deleteFile = true;
            }
            else if (settingsFile.status == 'Datos Cargados') {
              this.fileOptionsAvailable.deleteData = true;
            }
          }
        }
        else {
          this.fileOptionsAvailable.process = true;
        }
      }
      else {
        this.fileOptionsAvailable.process = true;
        this.fileOptionsAvailable.deleteFile = true;
      }
    }
  }

}
