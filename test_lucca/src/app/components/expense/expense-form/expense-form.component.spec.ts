import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseFormComponent } from './expense-form.component';
import { ExpenseNature } from 'src/app/models/expenseNature';

describe('ExpenseFormComponent', () => {
  let component: ExpenseFormComponent;
  let fixture: ComponentFixture<ExpenseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseFormComponent);
    component = fixture.componentInstance;
    component.expense = {
      // Provide the input property here
      nature: ExpenseNature.Trip, // You can set the relevant properties here
      comment: '',
      amount: 100,
      purchasedOn: '2023-08-25',
      distance: 300,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update expense properties based on nature when saving changes', () => {
    component.expense = {
      nature: ExpenseNature.Restaurant,
      comment: '',
      amount: 50,
      purchasedOn: '2023-08-25',
      invites: 4,
      distance: 3,
    };

    component.saveChanges();

    expect(component.expense.distance).toBeUndefined();
  });

  it('should emit the updated expense when saving changes', () => {
    const mockExpense = {
      nature: ExpenseNature.Trip,
      comment: '',
      amount: 100,
      purchasedOn: '2023-08-25',
      distance: 500,
    };
    spyOn(component.saveChangesEvent, 'emit');

    component.expense = { ...mockExpense };
    component.saveChanges();

    expect(component.saveChangesEvent.emit).toHaveBeenCalledWith(mockExpense);
  });

  it('should disable save button when form is invalid', () => {
    component.expense = {
      nature: ExpenseNature.Restaurant,
      comment: '',
      amount: 0,
      purchasedOn: '',
      invites: 2,
    };

    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('.save-button');
    expect(saveButton.disabled).toBe(true);
  });

  it('should enable save button when form is valid', () => {
    component.expense = {
      nature: ExpenseNature.Trip,
      comment: '',
      amount: 100,
      purchasedOn: '2023-08-25',
      distance: 300,
    };

    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('.save-button');
    expect(saveButton.disabled).toBe(false);
  });

  it('should update expense property when input changes', () => {
    const inputValue = '5';
    const inputField = 'distance';

    const inputElement = fixture.nativeElement.querySelector(
      `[data-testid="${inputField}-input"]` // Using data-testid for selection
    );
    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.expense[inputField]).toBe(parseInt(inputValue, 10));
  });

  it('should not find invites input when type trip', () => {
    const inputField = 'invites';

    const inputElement = fixture.nativeElement.querySelector(
      `[data-testid="${inputField}-input"]` // Using data-testid for selection
    );

    expect(inputElement).toBe(null);
  });

  it('should set expense.nature when changing nature', () => {
    const newNature = ExpenseNature.Restaurant;
    component.changeNature(newNature);
    expect(component.expense.nature).toBe(newNature);
  });

  it('should correctly determine if the form is valid for restaurant', () => {
    component.expense = {
      nature: ExpenseNature.Restaurant,
      comment: '',
      amount: 50,
      purchasedOn: '2023-08-25',
      invites: 4,
    };
    expect(component.isFormValid()).toBe(true);
  });

  it('should correctly determine if the form is valid for trip', () => {
    component.expense = {
      nature: ExpenseNature.Trip,
      comment: '',
      amount: 100,
      purchasedOn: '2023-08-25',
      distance: 300,
    };
    expect(component.isFormValid()).toBe(true);
  });

  it('should update expense property when input changes', () => {
    const inputValue = '5';
    const inputField = 'distance';

    const inputElement = fixture.nativeElement.querySelector(
      `[data-testid="${inputField}-input"]` // Using data-testid for selection
    );
    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.expense[inputField]).toBe(parseInt(inputValue, 10));
  });

  it('should not find invites input when type trip', () => {
    const inputField = 'invites';

    const inputElement = fixture.nativeElement.querySelector(
      `[data-testid="${inputField}-input"]` // Using data-testid for selection
    );

    expect(inputElement).toBe(null);
  });

  it('should set expense.nature when changing nature', () => {
    const newNature = ExpenseNature.Restaurant;
    component.changeNature(newNature);
    expect(component.expense.nature).toBe(newNature);
  });

  it('should correctly determine if the form is valid for restaurant', () => {
    component.expense = {
      nature: ExpenseNature.Restaurant,
      comment: '',
      amount: 50,
      purchasedOn: '2023-08-25',
      invites: 4,
    };
    expect(component.isFormValid()).toBe(true);
  });

  it('should correctly determine if the form is valid for trip', () => {
    component.expense = {
      nature: ExpenseNature.Trip,
      comment: '',
      amount: 100,
      purchasedOn: '2023-08-25',
      distance: 300,
    };
    expect(component.isFormValid()).toBe(true);
  });

  it('should update expense.distance property when input changes', () => {
    const inputValue = '500';
    const inputField = 'distance';

    component.changeNature(ExpenseNature.Trip); // Change nature to Trip
    fixture.detectChanges();

    const inputElement = fixture.nativeElement.querySelector(
      `[data-testid="${inputField}-input"]`
    );
    inputElement.value = inputValue;
    inputElement.dispatchEvent(new Event('input'));

    expect(component.expense.distance).toBe(parseInt(inputValue, 10));
  });
});
