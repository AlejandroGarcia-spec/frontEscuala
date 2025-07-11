import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMaestroModalPage } from './agregar-maestro-modal.page';

describe('AgregarMaestroModalPage', () => {
  let component: AgregarMaestroModalPage;
  let fixture: ComponentFixture<AgregarMaestroModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMaestroModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
