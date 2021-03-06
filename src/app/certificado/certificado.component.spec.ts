import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoComponent } from './certificado.component';

describe('CertificadoComponent', () => {
  let component: CertificadoComponent;
  let fixture: ComponentFixture<CertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
