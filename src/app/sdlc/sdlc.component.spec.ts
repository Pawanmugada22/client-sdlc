/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SdlcComponent } from './sdlc.component';

describe('SdlcComponent', () => {
  let component: SdlcComponent;
  let fixture: ComponentFixture<SdlcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdlcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdlcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
