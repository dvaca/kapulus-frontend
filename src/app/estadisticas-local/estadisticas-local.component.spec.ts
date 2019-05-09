import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasLocalComponent } from './estadisticas-local.component';

describe('EstadisticasLocalComponent', () => {
  let component: EstadisticasLocalComponent;
  let fixture: ComponentFixture<EstadisticasLocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasLocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
