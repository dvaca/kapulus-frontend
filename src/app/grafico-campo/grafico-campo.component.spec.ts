import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCampoComponent } from './grafico-campo.component';

describe('GraficoCampoComponent', () => {
  let component: GraficoCampoComponent;
  let fixture: ComponentFixture<GraficoCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
