import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarTutorModalPage } from './agregar-tutor-modal.page';

describe('AgregarTutorModalPage', () => {
  let component: AgregarTutorModalPage;
  let fixture: ComponentFixture<AgregarTutorModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTutorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
