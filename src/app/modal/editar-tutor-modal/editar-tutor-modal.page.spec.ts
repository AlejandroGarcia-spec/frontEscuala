import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTutorModalPage } from './editar-tutor-modal.page';

describe('EditarTutorModalPage', () => {
  let component: EditarTutorModalPage;
  let fixture: ComponentFixture<EditarTutorModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTutorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
