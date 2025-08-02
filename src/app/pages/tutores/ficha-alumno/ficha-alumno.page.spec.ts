import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FichaAlumnoPage } from './ficha-alumno.page';

describe('FichaAlumnoPage', () => {
  let component: FichaAlumnoPage;
  let fixture: ComponentFixture<FichaAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
