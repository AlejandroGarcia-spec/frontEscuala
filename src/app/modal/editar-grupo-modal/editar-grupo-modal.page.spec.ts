import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarGrupoModalPage } from './editar-grupo-modal.page';

describe('EditarGrupoModalPage', () => {
  let component: EditarGrupoModalPage;
  let fixture: ComponentFixture<EditarGrupoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGrupoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
