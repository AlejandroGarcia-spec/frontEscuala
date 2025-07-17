import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PadresHomePage } from './padres-home.page';

describe('PadresHomePage', () => {
  let component: PadresHomePage;
  let fixture: ComponentFixture<PadresHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PadresHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
