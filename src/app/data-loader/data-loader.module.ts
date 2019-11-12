import { FileUploadModule } from './../file-upload/file-upload.module';
import { DataLoaderService } from './data-loader.service';
import { DataLoaderComponent} from './data-loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DataLoaderComponent
  ],
  exports: [
  ],
  providers: [
    DataLoaderService
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DataLoaderModule { }