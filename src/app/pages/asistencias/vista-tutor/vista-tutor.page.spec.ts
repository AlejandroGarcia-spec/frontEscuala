import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaTutorPage } from './vista-tutor.page';

describe('VistaTutorPage', () => {
  let component: VistaTutorPage;
  let fixture: ComponentFixture<VistaTutorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaTutorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
