import { FileUploadComponent } from './../file-upload/file-upload.component';
import { FileUploadModule } from './../file-upload/file-upload.module';
import { EventManagerService } from './event-manager.service';
import { EventManagerComponent} from './event-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EventManagerComponent    
  ],
  exports: [
  ],
  providers: [
    EventManagerService
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class EventManagerModule { }