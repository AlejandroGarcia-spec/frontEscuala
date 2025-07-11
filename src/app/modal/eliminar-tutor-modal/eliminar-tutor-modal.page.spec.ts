import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarTutorModalPage } from './eliminar-tutor-modal.page';

describe('EliminarTutorModalPage', () => {
  let component: EliminarTutorModalPage;
  let fixture: ComponentFixture<EliminarTutorModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTutorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
