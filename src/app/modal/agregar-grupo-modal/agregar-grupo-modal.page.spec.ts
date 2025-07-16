import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarGrupoModalPage } from './agregar-grupo-modal.page';

describe('AgregarGrupoModalPage', () => {
  let component: AgregarGrupoModalPage;
  let fixture: ComponentFixture<AgregarGrupoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGrupoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
