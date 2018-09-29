import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscarapelaComponent } from './escarapela.component';

describe('EscarapelaComponent', () => {
  let component: EscarapelaComponent;
  let fixture: ComponentFixture<EscarapelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscarapelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscarapelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
