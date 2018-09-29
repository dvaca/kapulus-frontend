import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAsistenteComponent } from './detalle-asistente.component';

describe('DetalleAsistenteComponent', () => {
  let component: DetalleAsistenteComponent;
  let fixture: ComponentFixture<DetalleAsistenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAsistenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
