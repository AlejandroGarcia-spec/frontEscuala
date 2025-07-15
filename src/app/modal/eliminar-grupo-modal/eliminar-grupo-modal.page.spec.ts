import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarGrupoModalPage } from './eliminar-grupo-modal.page';

describe('EliminarGrupoModalPage', () => {
  let component: EliminarGrupoModalPage;
  let fixture: ComponentFixture<EliminarGrupoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarGrupoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
