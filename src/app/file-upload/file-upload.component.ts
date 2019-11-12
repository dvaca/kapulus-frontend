import { FileUploadService } from './file-upload.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public imagePath;
  imgURL: any;
  public message: string;
  
  constructor(private fileUploadService: FileUploadService) { }

  @Input() eventId:number;
  @Input() showPreview:Boolean;
  @Input() sizeLimit='200 KB';
  @Output() onUpload = new EventEmitter<boolean>();
  uploaded = false;


  ngOnInit() {
  }

  selectedFile: UploadFile;

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    console.log("success");
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
    console.log("Error");
  }

  /**
   * Send the file to file server
   * @param imageInput 
   */
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new UploadFile(event.target.result, file);
      this.selectedFile.pending = true;
      this.fileUploadService.uploadFile(this.selectedFile.file, this.eventId).subscribe(
        (res) => {
          this.onSuccess();
          this.notify(true);
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  /**
   * Read local the image for previsualization
   * @see input values for file-upload component
   * @param files 
   */
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  notify(uploaded: boolean){
    this.onUpload.emit(uploaded);
    this.uploaded = true;
  }
}



class UploadFile {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}
