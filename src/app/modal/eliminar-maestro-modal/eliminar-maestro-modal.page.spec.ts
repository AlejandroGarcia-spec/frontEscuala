import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarMaestroModalPage } from './eliminar-maestro-modal.page';

describe('EliminarMaestroModalPage', () => {
  let component: EliminarMaestroModalPage;
  let fixture: ComponentFixture<EliminarMaestroModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarMaestroModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
