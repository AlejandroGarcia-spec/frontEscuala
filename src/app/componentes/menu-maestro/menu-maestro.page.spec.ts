import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMaestroPage } from './menu-maestro.page';

describe('MenuMaestroPage', () => {
  let component: MenuMaestroPage;
  let fixture: ComponentFixture<MenuMaestroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMaestroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
