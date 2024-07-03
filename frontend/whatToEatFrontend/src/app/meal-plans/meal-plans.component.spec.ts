import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPlansComponent } from './meal-plans.component';

describe('MealPlansComponent', () => {
  let component: MealPlansComponent;
  let fixture: ComponentFixture<MealPlansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealPlansComponent]
    });
    fixture = TestBed.createComponent(MealPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
