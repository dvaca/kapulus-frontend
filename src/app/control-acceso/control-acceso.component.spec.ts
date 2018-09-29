import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAccesoComponent } from './control-acceso.component';

describe('ControlAccesoComponent', () => {
  let component: ControlAccesoComponent;
  let fixture: ComponentFixture<ControlAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
