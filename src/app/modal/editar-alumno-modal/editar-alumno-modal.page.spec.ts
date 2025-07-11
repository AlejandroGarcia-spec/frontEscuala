import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAlumnoModalPage } from './editar-alumno-modal.page';

describe('EditarAlumnoModalPage', () => {
  let component: EditarAlumnoModalPage;
  let fixture: ComponentFixture<EditarAlumnoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAlumnoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
