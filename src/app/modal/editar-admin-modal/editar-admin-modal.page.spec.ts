import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAdminModalPage } from './editar-admin-modal.page';

describe('EditarAdminModalPage', () => {
  let component: EditarAdminModalPage;
  let fixture: ComponentFixture<EditarAdminModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAdminModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
