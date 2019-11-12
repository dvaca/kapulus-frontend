import { FileUploadService } from './file-upload.service';
import { FileUploadComponent } from './file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  exports: [
    FileUploadComponent,
  ],
  providers: [
    FileUploadService
  ],
  imports: [
    CommonModule
  ]
})
export class FileUploadModule { }
