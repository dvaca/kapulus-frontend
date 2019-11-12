import { EventManagerService } from './event-manager.service';
import { OnInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { KEvent } from './event-manager.static';




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

  constructor(private eventManagerService: EventManagerService, private fb: FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadEvents();

    this.eventManagerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      eventDate: ['', Validators.required]
    });
  }

  loadEvents() {
    this.eventManagerService.getEvents().subscribe(data => {
      this.events = data;
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
        this.router.navigate(['/search', { eventId: event.id, zone:zones.id }]);
      }
    });

  }

  onSubmitEvent() {
    this.eventRequest = this.eventManagerForm.value;
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
        console.log(result);
        this.loadEvents();
      },
        error => {
          console.log(error);
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