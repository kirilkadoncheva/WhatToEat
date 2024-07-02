import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListDetailsComponent } from './shopping-list-details.component';

describe('ShoppingListDetailsComponent', () => {
  let component: ShoppingListDetailsComponent;
  let fixture: ComponentFixture<ShoppingListDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListDetailsComponent]
    });
    fixture = TestBed.createComponent(ShoppingListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
