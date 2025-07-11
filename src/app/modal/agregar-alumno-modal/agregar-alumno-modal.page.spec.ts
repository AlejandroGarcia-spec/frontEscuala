import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAlumnoModalPage } from './agregar-alumno-modal.page';

describe('AgregarAlumnoModalPage', () => {
  let component: AgregarAlumnoModalPage;
  let fixture: ComponentFixture<AgregarAlumnoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAlumnoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
