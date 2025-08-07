import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FamiliaresModalComponent } from './familiares-modal.component';

describe('FamiliaresModalComponent', () => {
  let component: FamiliaresModalComponent;
  let fixture: ComponentFixture<FamiliaresModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FamiliaresModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FamiliaresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
