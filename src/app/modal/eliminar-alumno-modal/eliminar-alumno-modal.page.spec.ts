import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarAlumnoModalPage } from './eliminar-alumno-modal.page';

describe('EliminarAlumnoModalPage', () => {
  let component: EliminarAlumnoModalPage;
  let fixture: ComponentFixture<EliminarAlumnoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAlumnoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
