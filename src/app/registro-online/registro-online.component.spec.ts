import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOnlineComponent } from './registro-online.component';

describe('RegistroOnlineComponent', () => {
  let component: RegistroOnlineComponent;
  let fixture: ComponentFixture<RegistroOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
