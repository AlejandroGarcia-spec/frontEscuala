import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarAdminModalPage } from './agregar-admin-modal.page';

describe('AgregarAdminModalPage', () => {
  let component: AgregarAdminModalPage;
  let fixture: ComponentFixture<AgregarAdminModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarAdminModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
