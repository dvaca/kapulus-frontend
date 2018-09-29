import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAtributoAsistenteComponent } from './control-atributo-asistente.component';

describe('ControlAtributoAsistenteComponent', () => {
  let component: ControlAtributoAsistenteComponent;
  let fixture: ComponentFixture<ControlAtributoAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAtributoAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAtributoAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
