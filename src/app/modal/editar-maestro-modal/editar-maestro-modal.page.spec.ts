import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarMaestroModalPage } from './editar-maestro-modal.page';

describe('EditarMaestroModalPage', () => {
  let component: EditarMaestroModalPage;
  let fixture: ComponentFixture<EditarMaestroModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarMaestroModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
