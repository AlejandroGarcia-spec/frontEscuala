import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuPadrePage } from './menu-padre.page';

describe('MenuPadrePage', () => {
  let component: MenuPadrePage;
  let fixture: ComponentFixture<MenuPadrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPadrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
