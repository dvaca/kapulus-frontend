import { EventManagerService } from './event-manager.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { KEvent } from './event-manager.static';
import { enableDebugTools } from '@angular/platform-browser';




@Component({
  selector: 'event-manager',
  templateUrl: './event-manager.component.html',
  styleUrls: ['./event-manager.component.css']
})


export class EventManagerComponent implements OnInit {
  eventRequest: KEvent;
  eventManagerForm: FormGroup;
  createEventResult: any;
  events: any;
  private backendUrl = environment.URLBack;
  message: string;
  messageType: string;
  rol = 'user';

  constructor(private eventManagerService: EventManagerService, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rol = params.rol;
      console.log(this.rol);
    });
    this.loadEvents();

    this.eventManagerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: ['', Validators.required],
      status: ['enabled']
    });
  }

  loadEvents() {
    this.eventManagerService.getEvents().subscribe(data => {
      this.events = data.filter(event=>event.status=='enabled' || this.rol=="admin");
    });
  }

  goToDetails(event) {
    console.debug('GoToDeails');
    this.router.navigate(['/dataLoader', { eventId: event.id }]);
  }

  goToSearch(event) {
    this.eventManagerService.getZoneByEvent(event.id).subscribe(data => {
      let zones = data;
      if (zones != undefined) {
        console.log("GoToSearch Zones" + JSON.stringify(zones));
        this.router.navigate(['/search', { eventId: event.id, zone: zones.id }]);
      }
    });

  }

  onSubmitEvent() {
    this.eventRequest = this.eventManagerForm.value;
    this.eventRequest.status="enabled";
    console.log('Payment Request' + JSON.stringify(this.eventRequest));
    console.debug(this.eventRequest);
    this.eventManagerService.createEvent(this.eventRequest)
      .subscribe(result => {
        this.createEventResult = result;
        this.loadEvents();
      },
        error => {
          this.createEventResult = error;
        });


  }

  deleteEvent(eventId) {
    this.eventManagerService.deleteEvent(eventId)
      .subscribe(result => {
        if (result == undefined) {
          this.messageType = "danger";
          this.message = "No fue posible eliminar el evento. Valida que no existan datos asociados."
        }
        console.log(result);

      },
        error => {
          console.log('Error en:' + error);
        });
    this.loadEvents();
  }

  disableEvent(event) {
    event.status = "disabled";
    this.eventManagerService.updateEvent(event)
      .subscribe(result => {
        this.loadEvents();
      },
        error => {
          this.createEventResult = error;
        });
  }

  enableEvent(event) {
    event.status = "enabled";
    this.eventManagerService.updateEvent(event)
      .subscribe(result => {
        this.loadEvents();
      },
        error => {
          this.createEventResult = error;
        });
  }


  selectedFile: ImageSnippet;

  // processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   reader.addEventListener('load', (event: any) => {

  //     this.selectedFile = new ImageSnippet(event.target.result, file);

  //     this.imageService.uploadImage(this.selectedFile.file).subscribe(
  //       (res) => {

  //       },
  //       (err) => {

  //       })
  //   });

  //   reader.readAsDataURL(file);
  // }

}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}