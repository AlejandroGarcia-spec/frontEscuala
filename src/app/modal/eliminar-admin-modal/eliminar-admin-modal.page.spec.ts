import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarAdminModalPage } from './eliminar-admin-modal.page';

describe('EliminarAdminModalPage', () => {
  let component: EliminarAdminModalPage;
  let fixture: ComponentFixture<EliminarAdminModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAdminModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
